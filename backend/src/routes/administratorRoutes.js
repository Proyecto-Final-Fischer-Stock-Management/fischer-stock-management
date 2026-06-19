import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prisma.js";

const router = Router();

router.get("/dashboard/stats", (req, res) => {});
router.get("/dashboard/visits", (req, res) => {});

// Get all products
router.get("/stock/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        fischer_code: true,
        easy_sap: true,
        name: true,
        product_picture: true,
      },
    });
    return res.status(200).send({
      products: products,
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// Get one product
router.get("/stock/product", async (req, res) => {
  try {
    const { fischerCode } = req.body;
    const product = await prisma.product.findUnique({
      where: {
        fischer_code: fischerCode,
      },
    });
    return res.status(200).send({
      product: {
        fischerCode: product.fischer_code,
        easySap: product.easy_sap,
        name: product.name,
        minimunStock: product.minimun_stock,
        productPicture: product.product_picture,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});

// Create a product
router.post("/stock/product", async (req, res) => {
  try {
    const { fischerCode, easySap, name, minimunStock, productPicture } =
      req.body;
    const product = await prisma.product.create({
      data: {
        fischer_code: fischerCode,
        easy_sap: easySap,
        name: name,
        minimun_stock: minimunStock,
        product_picture: productPicture,
      },
    });
    return res.status(201).send({ message: "Product successfully created" });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(503);
  }
});
// router.put("/stock/product", async (req, res) => {});

// Delete a product
router.delete("/stock/product", async (req, res) => {
  try {
    const { fischerCode } = req.body;
    const product = await prisma.product.delete({
      where: {
        fischer_code: fischerCode,
      },
    });
  } catch (err) {
    return res.status(503).send({
      message: err.message,
    });
  }
});

// Get all users
router.get("/accounts/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
    return res.status(503).send({
      message: err.message,
    });
  }
});

// Get one user
router.get("/accounts/user", async (req, res) => {
  try {
    const { id } = req.body;
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
    return res.status(503).send({
      message: err.message,
    });
  }
});

// Create a user
router.post("/accounts/user", async (req, res) => {
  const { completeName, email, role, password } = req.body;
  const hashedpassword = bcrypt.hashSync(password, 7);
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
    res.status(503).send({
      message: err.message,
    });
  }
});

// router.put("/accounts/user", (req, res) => {});

// Delete a user
router.delete("/accounts/user", async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.users.delete({
      where: {
        id: id,
      },
    });
  } catch (err) {
    return res.status(503).send({
      message: err.message,
    });
  }
});

// router.get("/notifications/emails", (req, res) => {});
// router.get("/notifications/emails/:emailId", (req, res) => {});
// router.delete("/notifications/emails/:emailId", (req, res) => {});

export default router;
