import prisma from "../../../prisma/prisma.js";

const userFields = { id: true, complete_name: true, email: true, role: true };

export function GetAnUser(id) {
  return prisma.users.findUnique({ where: { id }, select: userFields });
}

export function GetAllUsers(id) {
  return prisma.users.findMany({
    where: { NOT: { id } },
    select: userFields,
    orderBy: { complete_name: "asc" },
  });
}

export function CreateUser(completeName, email, role, hashedPassword) {
  return prisma.users.create({
    data: { complete_name: completeName, email, role, password: hashedPassword },
  });
}

export function UpdateUser(id, data) {
  return prisma.users.update({ where: { id }, data });
}

export function DeleteUser(id) {
  return prisma.users.delete({ where: { id } });
}

export function GetAllProducts() {
  return prisma.product.findMany({
    select: { fischer_code: true, name: true },
    orderBy: { name: "asc" },
  });
}

export function GetOneProduct(fischerCode) {
  return prisma.product.findUnique({ where: { fischer_code: fischerCode } });
}

// Traducimos los nombres que recibe la API a los nombres de la base.
function productData(product) {
  const data = {
    name: product.name,
    easy_sap: product.easySap,
    sodimac_sku: product.sodimacSku,
    carrefour_ean: product.carrefourEan,
    anonima_codint: product.anonimaCodInt,
    hipertehuelche_code: product.hipertehuelcheCode,
  };
  if (product.productPicture) {
    data.product_picture = product.productPicture;
    data.product_picture_type = product.productPictureType;
  }
  return data;
}

export function CreateProduct(product) {
  return prisma.product.create({
    data: { fischer_code: product.fischerCode, ...productData(product) },
  });
}

export function UpdateProduct(product) {
  return prisma.product.update({
    where: { fischer_code: product.fischerCode },
    data: productData(product),
  });
}

export function DeleteProduct(fischerCode) {
  return prisma.product.delete({ where: { fischer_code: fischerCode } });
}