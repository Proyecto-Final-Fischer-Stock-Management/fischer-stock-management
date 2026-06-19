import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findByEmail } from "./authRepository.js";
import { expireTokenTime } from "../../config/jwt.js";

export async function login(email, password) {
  if (!email || !password) {
    throw new Error("Required fields are incompleted");
  }

  const user = await findByEmail(email);

  if (!user) {
    throw new Error("Invalid user or password");
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    throw new Error("Invalid user or password");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: expireTokenTime,
    },
  );

  return {
    token,
    user: {
      id: user.id,
      completeName: user.complete_name,
      email: user.email,
      role: user.role,
    },
  };
}
