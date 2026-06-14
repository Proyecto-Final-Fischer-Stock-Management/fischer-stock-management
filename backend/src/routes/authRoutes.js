import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expireTokenTime from "../config/jwt.js";
import prisma from "../../prisma/prisma.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email: email, // variable a agregar en el front
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const passwordIsCorrect = bcrypt.compareSync(password, user.password);

    if (!passwordIsCorrect) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: expireTokenTime,
    });

    return res.status(200).send({
      token,
      user: {
        id: user.id,
        completeName: user.complete_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

export default router;
