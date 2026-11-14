import bcrypt from "bcrypt";
import * as repository from "./administratorRepository.js";

export async function UGettingOneProcess(id) {
  const information = await repository.GetAnUser(id);
  return information;
}

export async function UGettingAllProcess(id) {
  const parsedId = parseInt(id);
  const information = await repository.GetAllUsers(parsedId);
  return information;
}

export async function UCreationProcess(completeName, email, role, password) {
  if (!completeName || !email || !role || !password) {
    throw new Error("Required fields incompleted");
  }

  const hashedpassword = bcrypt.hashSync(password, 12);

  await repository.CreateUser(completeName, email, role, hashedpassword);

  return "User successfully created";
}

export async function UDeletionProcess(id) {
  await repository.DeleteUser(id);
  return "User successfully deleted";
}

export async function PGettingAllProcess() {
  const information = await repository.GetAllProducts();
  return information;
}

export async function PGettingOneProcess(fischerCode) {
  const information = await repository.GetOneProduct(fischerCode);
  return information;
}

export async function PCreationProcess(product) {
  if (!product) {
    throw new Error("Required fields are incompleted");
  }
  await repository.CreateProduct(product);
  return "Product successfully created";
}

export async function PDeletionProcess(fischerCode) {
  await repository.DeleteProduct(fischerCode);
  return "Product successfully deleted";
}
