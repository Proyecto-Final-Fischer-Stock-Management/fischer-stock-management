import bcrypt from "bcrypt";
import {
  GetAnUser,
  GetAllUsers,
  CreateUser,
  DeleteUser,
} from "./administratorRepository.js";

export async function UGettingOneProcess(id) {
  const information = await GetAnUser(id);
  return information;
}

export async function UGettingAllProcess(id) {
  const parsedId = parseInt(id);
  const information = await GetAllUsers(parsedId);
  return information;
}

export async function UCreationProcess(completeName, email, role, password) {
  if (!completeName || !email || !role || !password) {
    throw new Error("Required fields incompleted");
  }

  const hashedpassword = bcrypt.hashSync(password, 7);

  await CreateUser(completeName, email, role, hashedpassword);

  return "User successfully created";
}

export async function UDeletionProcess(id) {
  await DeleteUser(id);
  return "User successfully deleted";
}
