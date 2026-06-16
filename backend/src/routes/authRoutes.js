import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expireTokenTime from "../config/jwt.js";
import prisma from "../../prisma/prisma.js";

const router = Router();

// Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: {
        email: email, // variable a agregar en el front
      },
    });

    if (!user) {
      return res.status(400).send({ message: "Invalid user or password" });
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      return res.status(400).send({ message: "Invalid user or password" });
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
