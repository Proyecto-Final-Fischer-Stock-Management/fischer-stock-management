import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prisma";

const router = Router();

router.get("/dashboard/stats", (req, res) => {});
router.get("/dashboard/visits", (req, res) => {});

router.get("/stock/product", (req, res) => {});
router.post("/stock/product", (req, res) => {});
// router.put("/stock/product", (req, res) => {});
router.delete("/stock/product", (req, res) => {});

router.get("/accounts/users", async (req, res) => {
  try {
    const user = await prisma.users.findMany({
      where: {
        NOT: {
          id: user.id,
        },
      },
    });
    return res.status(200).send({
      user: {
        id: user.id,
        completeName: user.complete_name,
        email: user.email,
        role: user.role,
        password: user.password,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

router.post("/accounts/user", async (req, res) => {
  const { completeName, email, role, password } = req.body;

  const hashedpassword = bcrypt.hashSync(password, 24);

  try {
    const user = await prisma.create({
      data: {
        complete_name: completeName,
        email: email,
        role: role,
        password: hashedpassword,
      },
    });
    return res.status(201).send({ message: "User successfully created" });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// router.put("/accounts/user", (req, res) => {});

router.delete("/accounts/user/:id", async (req, res) => {});

// router.get("/notifications/emails", (req, res) => {});
// router.get("/notifications/emails/:emailId", (req, res) => {});
// router.delete("/notifications/emails/:emailId", (req, res) => {});

export default router;
