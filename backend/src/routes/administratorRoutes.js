import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prisma";

const router = Router();

router.get("/dashboard/stats", (req, res) => {});
router.get("/dashboard/visits", (req, res) => {});

// Get all products
router.get("/stock/products", async (req, res) => {
  const { frachise, branch, sector } = req.body;
  try {
    const products = await prisma.product.findMany({
      where: {
        sectors: sector,
      },
      // DESDE ACA TENGO QUE ENTERARME DE COMO HACER PARA QUE UN PRODUCTO PUEDA ESTAR EN VARIAS SUCURSALES Y FRANQUICIAS
    });
    return res.status(200).send({
      products: products,
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});
router.post("/stock/product", (req, res) => {});
// router.put("/stock/product", (req, res) => {});
router.delete("/stock/product", (req, res) => {});

// Get all users
router.get("/accounts/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const users = await prisma.users.findMany({
      where: {
        NOT: {
          id: parseInt(id),
        },
      },
      select: {
        id: true,
        complete_name: true,
        role: true,
      },
    });
    return res.status(200).send({
      users,
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// Get one user
router.get("/accounts/user", async (req, res) => {
  const { id } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
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
  } catch (error) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// Create a user
router.post("/accounts/user", async (req, res) => {
  const { completeName, email, role, password } = req.body;

  const hashedpassword = bcrypt.hashSync(password, 24);

  try {
    const user = await prisma.users.create({
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

// Delete a user
router.delete("/accounts/user", async (req, res) => {
  const { id } = req.body;
  try {
    await prisma.users.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// router.get("/notifications/emails", (req, res) => {});
// router.get("/notifications/emails/:emailId", (req, res) => {});
// router.delete("/notifications/emails/:emailId", (req, res) => {});

export default router;
