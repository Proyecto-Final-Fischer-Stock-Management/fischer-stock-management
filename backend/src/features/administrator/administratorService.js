import bcrypt from "bcrypt";
import * as repository from "./administratorRepository.js";

function requestError(message, status = 400) {
  return Object.assign(new Error(message), { status });
}

function parseCode(value, label) {
  const number = Number(value);
  if (!/^\d+$/.test(String(value)) || !Number.isInteger(number) || number < 1 || number > 2147483647) {
    throw requestError(`${label} debe ser un número entero entre 1 y 2147483647.`);
  }
  return number;
}

function validateUser(completeName, email, role, password, creating) {
  if (typeof completeName !== "string" || !completeName.trim() || typeof email !== "string" || !email.trim() || !role) {
    throw requestError("Completá nombre, email y rol.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw requestError("Ingresá un email válido.");
  }
  if (!["Administrator", "Stockman"].includes(role)) {
    throw requestError("Seleccioná un rol válido.");
  }
  if ((creating || password) && (typeof password !== "string" || password.length < 6 || Buffer.byteLength(password, "utf8") > 72)) {
    throw requestError("La contraseña debe tener al menos 6 caracteres y no superar 72 bytes.");
  }
}

function validateProduct(product) {
  if ([product.name, product.easySap, product.sodimacSku, product.hipertehuelcheCode].some((value) => typeof value !== "string" || !value.trim())) {
    throw requestError("Completá el nombre y todos los códigos del producto.");
  }
  return {
    ...product,
    name: product.name.trim(),
    easySap: product.easySap.trim(),
    sodimacSku: product.sodimacSku.trim(),
    hipertehuelcheCode: product.hipertehuelcheCode.trim(),
    fischerCode: parseCode(product.fischerCode, "El código Fischer"),
    carrefourEan: parseCode(product.carrefourEan, "El EAN de Carrefour"),
    anonimaCodInt: parseCode(product.anonimaCodInt, "El código de La Anónima"),
  };
}

export async function UGettingOneProcess(id) {
  const user = await repository.GetAnUser(parseCode(id, "El identificador del usuario"));
  if (!user) throw requestError("No se encontró el usuario.", 404);
  return user;
}

export function UGettingAllProcess(id) {
  return repository.GetAllUsers(parseCode(id, "El identificador del administrador"));
}

export async function UCreationProcess(completeName, email, role, password) {
  validateUser(completeName, email, role, password, true);
  const hashedPassword = await bcrypt.hash(password, 12);
  await repository.CreateUser(completeName.trim(), email.trim(), role, hashedPassword);
  return "Usuario creado correctamente.";
}

export async function UModificationProcess(id, completeName, email, role, password) {
  validateUser(completeName, email, role, password, false);
  const data = { complete_name: completeName.trim(), email: email.trim(), role };
  // Si el campo queda vacío, conservamos la contraseña que ya tenía.
  if (password) data.password = await bcrypt.hash(password, 12);
  await repository.UpdateUser(parseCode(id, "El identificador del usuario"), data);
  return "Usuario modificado correctamente.";
}

export async function UDeletionProcess(id) {
  try {
    await repository.DeleteUser(parseCode(id, "El identificador del usuario"));
  } catch (error) {
    if (error.code === "P2003") throw requestError("Este usuario tiene registros asociados y no se puede eliminar.", 409);
    throw error;
  }
  return "Usuario eliminado correctamente.";
}

export function PGettingAllProcess() {
  return repository.GetAllProducts();
}

export async function PGettingOneProcess(fischerCode) {
  const product = await repository.GetOneProduct(parseCode(fischerCode, "El código Fischer"));
  if (!product) throw requestError("No se encontró el producto.", 404);
  return product;
}

export async function PCreationProcess(product) {
  const data = validateProduct(product);
  if (!data.productPicture) throw requestError("Seleccioná una foto del producto.");
  await repository.CreateProduct(data);
  return "Producto creado correctamente.";
}

export async function PModificationProcess(product) {
  await repository.UpdateProduct(validateProduct(product));
  return "Producto modificado correctamente.";
}

export async function PDeletionProcess(fischerCode) {
  await repository.DeleteProduct(parseCode(fischerCode, "El código Fischer"));
  return "Producto eliminado correctamente.";
}