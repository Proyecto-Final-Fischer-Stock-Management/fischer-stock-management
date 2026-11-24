import assert from "node:assert/strict";
import { test, mock } from "node:test";
import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Estas pruebas reemplazan Prisma por funciones de prueba: no tocan la base real.
process.env.JWT_SECRET = "solo-para-pruebas-admin";
const unexpected = () => { throw new Error("Operación de base no simulada"); };
const prisma = {
  users: { findMany: unexpected, findUnique: unexpected, create: unexpected, update: unexpected, delete: unexpected },
  product: { findMany: unexpected, findUnique: unexpected, create: unexpected, update: unexpected, delete: unexpected },
};
mock.module("../prisma/prisma.js", { defaultExport: prisma });
const { default: app } = await import("../src/app.js");

const authorization = `Bearer ${jwt.sign({ id: 1, role: "Administrator" }, process.env.JWT_SECRET)}`;
const user = { id: 2, complete_name: "Juana María Perez", email: "juana@example.test", role: "Stockman" };
const fields = {
  fischerCode: "616302", easySap: "001288445", sodimacSku: "0036217836",
  carrefourEan: "9102363", anonimaCodInt: "1278351", hipertehuelcheCode: "008976232", name: "Tarugo",
};
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==", "base64");

function productRequest(method, data = fields) {
  let operation = request(app)[method]("/administrator/stock/product").set("Authorization", authorization);
  for (const [name, value] of Object.entries(data)) operation = operation.field(name, value);
  return operation;
}

test("las rutas de administración requieren una sesión de administrador", async () => {
  assert.equal((await request(app).get("/administrator/stock/products")).status, 401);
  const stockman = jwt.sign({ id: 2, role: "Stockman" }, process.env.JWT_SECRET);
  assert.equal((await request(app).get("/administrator/stock/products").set("Authorization", `Bearer ${stockman}`)).status, 403);
});

test("el listado de cuentas devuelve los emails y excluye la propia cuenta", async (t) => {
  t.mock.method(prisma.users, "findMany", async (query) => {
    assert.equal(query.where.NOT.id, 1);
    assert.equal(query.select.email, true);
    assert.equal(query.select.password, undefined);
    return [user];
  });
  const response = await request(app).get("/administrator/accounts/users/1").set("Authorization", authorization);
  assert.equal(response.status, 200);
  assert.deepEqual(response.body.users, [user]);
});

test("crear usuario guarda el nombre completo y un hash de la contraseña", async (t) => {
  t.mock.method(prisma.users, "create", async ({ data }) => {
    assert.equal(data.complete_name, "Juana María Perez");
    assert.equal(data.role, "Stockman");
    assert.notEqual(data.password, "secreto123");
    assert.equal(await bcrypt.compare("secreto123", data.password), true);
    return { id: 2 };
  });
  const response = await request(app).post("/administrator/accounts/user").set("Authorization", authorization)
    .send({ completeName: " Juana María Perez ", email: "juana@example.test", role: "Stockman", password: "secreto123" });
  assert.equal(response.status, 201);
});

test("modificar usuario sin contraseña conserva la contraseña anterior", async (t) => {
  t.mock.method(prisma.users, "update", async ({ where, data }) => {
    assert.equal(where.id, 2);
    assert.equal(data.password, undefined);
    assert.equal(data.role, "Administrator");
    return user;
  });
  const response = await request(app).put("/administrator/accounts/user").set("Authorization", authorization)
    .send({ id: 2, completeName: user.complete_name, email: user.email, role: "Administrator" });
  assert.equal(response.status, 200);
});

test("modificar usuario con nueva contraseña también la guarda como hash", async (t) => {
  t.mock.method(prisma.users, "update", async ({ data }) => {
    assert.equal(await bcrypt.compare("otraClave123", data.password), true);
    return user;
  });
  const response = await request(app).put("/administrator/accounts/user").set("Authorization", authorization)
    .send({ id: 2, completeName: user.complete_name, email: user.email, role: user.role, password: "otraClave123" });
  assert.equal(response.status, 200);
});

test("un rol desconocido se rechaza antes de escribir", async () => {
  const response = await request(app).post("/administrator/accounts/user").set("Authorization", authorization)
    .send({ completeName: user.complete_name, email: user.email, role: "admin", password: "secreto123" });
  assert.equal(response.status, 400);
});

test("la eliminación de usuario usa un id numérico y no permite eliminarse a sí mismo", async (t) => {
  t.mock.method(prisma.users, "delete", async ({ where }) => {
    assert.equal(where.id, 2);
    return user;
  });
  const self = await request(app).delete("/administrator/accounts/user").set("Authorization", authorization).send({ id: 1 });
  assert.equal(self.status, 400);
  const response = await request(app).delete("/administrator/accounts/user").set("Authorization", authorization).send({ id: "2" });
  assert.equal(response.status, 200);
});

test("crear producto usa multipart, traduce los campos y conserva ceros de códigos de texto", async (t) => {
  t.mock.method(prisma.product, "create", async ({ data }) => {
    assert.equal(data.fischer_code, 616302);
    assert.equal(data.easy_sap, "001288445");
    assert.equal(data.sodimac_sku, "0036217836");
    assert.equal(data.carrefour_ean, 9102363);
    assert.equal(data.product_picture_type, "image/png");
    assert.deepEqual(data.product_picture, png);
    return data;
  });
  const response = await productRequest("post").field("productPictureType", "tipo-falso").attach("productPicture", png, { filename: "producto.png", contentType: "image/png" });
  assert.equal(response.status, 201);
});

test("consultar un producto convierte el código de la ruta y no devuelve bytes en JSON", async (t) => {
  t.mock.method(prisma.product, "findUnique", async ({ where }) => {
    assert.equal(where.fischer_code, 616302);
    return { fischer_code: 616302, name: "Tarugo", product_picture: png, product_picture_type: "image/png" };
  });
  const response = await request(app).get("/administrator/stock/product/616302").set("Authorization", authorization);
  assert.equal(response.status, 200);
  assert.equal(response.body.info.name, "Tarugo");
  assert.equal(response.body.info.product_picture, undefined);
});

test("modificar producto sin nueva imagen conserva la anterior y no cambia su código", async (t) => {
  t.mock.method(prisma.product, "update", async ({ where, data }) => {
    assert.equal(where.fischer_code, 616302);
    assert.equal(data.fischer_code, undefined);
    assert.equal(data.product_picture, undefined);
    assert.equal(data.name, "Tarugo modificado");
    return data;
  });
  const response = await productRequest("put", { ...fields, name: "Tarugo modificado" });
  assert.equal(response.status, 200);
});

test("modificar producto permite reemplazar su imagen", async (t) => {
  t.mock.method(prisma.product, "update", async ({ data }) => {
    assert.deepEqual(data.product_picture, png);
    assert.equal(data.product_picture_type, "image/png");
    return data;
  });
  const response = await productRequest("put").attach("productPicture", png, { filename: "nueva.png", contentType: "image/png" });
  assert.equal(response.status, 200);
});

test("crear producto rechaza foto ausente, código no numérico y códigos fuera del rango de la base", async () => {
  assert.equal((await productRequest("post")).status, 400);
  assert.equal((await productRequest("put", { ...fields, fischerCode: "FISCHER-001" })).status, 400);
  assert.equal((await productRequest("put", { ...fields, carrefourEan: "9999999999999" })).status, 400);
});

test("un producto inexistente devuelve 404", async (t) => {
  t.mock.method(prisma.product, "findUnique", async () => null);
  const response = await request(app).get("/administrator/stock/product/616302").set("Authorization", authorization);
  assert.equal(response.status, 404);
});

test("la imagen autenticada se devuelve como archivo binario", async (t) => {
  t.mock.method(prisma.product, "findUnique", async () => ({ product_picture: new Uint8Array(png), product_picture_type: "image/png" }));
  const response = await request(app).get("/administrator/stock/product/616302/image").set("Authorization", authorization);
  assert.equal(response.status, 200);
  assert.match(response.headers["content-type"], /image\/png/);
  assert.deepEqual(response.body, png);
});

test("eliminar producto usa el código Fischer y confirma la operación", async (t) => {
  t.mock.method(prisma.product, "delete", async ({ where }) => {
    assert.equal(where.fischer_code, 616302);
    return { fischer_code: 616302 };
  });
  const response = await request(app).delete("/administrator/stock/product").set("Authorization", authorization).send({ fischerCode: "616302" });
  assert.equal(response.status, 202);
});

test("un email duplicado devuelve conflicto", async (t) => {
  t.mock.method(prisma.users, "update", async () => { throw Object.assign(new Error("duplicado"), { code: "P2002" }); });
  const response = await request(app).put("/administrator/accounts/user").set("Authorization", authorization)
    .send({ id: 2, completeName: user.complete_name, email: user.email, role: user.role });
  assert.equal(response.status, 409);
});