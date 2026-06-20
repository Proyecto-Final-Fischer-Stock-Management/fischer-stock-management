import bcrypt from "bcrypt";
import { CreateUser, DeleteUser } from "./administratorRepository.js";

export async function CreationProcess(completeName, email, role, password) {
  if (!completeName || !email || !role || !password) {
    throw new Error("Required fields incompleted");
  }

  const hashedpassword = bcrypt.hashSync(password, 7);

  await CreateUser(completeName, email, role, hashedpassword);

  return "User successfully created";
}

export async function DeletionProcess(id) {
  await DeleteUser(id);
  return "User successfully deleted";
}
