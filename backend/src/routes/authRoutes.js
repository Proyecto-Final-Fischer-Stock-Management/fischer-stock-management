import { Router } from "express";
import prisma from "../../prisma/prisma.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { completeName, password } = req.body;

    const userName = await prisma.users.findUnique({
      where: {
        complete_name: completeName, // variable a agregar en el front
      },
    });

    if (!userName) {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {}
});

router.get("/me", (req, res) => {});

export default router;
