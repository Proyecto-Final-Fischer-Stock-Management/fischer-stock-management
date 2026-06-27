import { Router } from "express";
import multer from "multer";
import {
  UGettingOneProcess,
  UCreationProcess,
  UDeletionProcess,
  UGettingAllProcess,
  PCreationProcess,
} from "./administratorService.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/dashboard/stats", (req, res) => {});
router.get("/dashboard/visits", (req, res) => {});

// Get one user
router.get("/accounts/user", async (req, res) => {
  try {
    const { id } = req.body;

    const user = await UGettingOneProcess(id);

    return res.status(200).send({
      user,
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
    const users = await UGettingAllProcess(id);
    return res.status(200).send({
      users,
    });
  } catch (err) {
    return res.status(503).send({
      message: err.message,
    });
  }
});

// Create a user
router.post("/accounts/user", async (req, res) => {
  try {
    const { completeName, email, role, password } = req.body;

    const result = await UCreationProcess(completeName, email, role, password);

    return res.status(201).send({ result });
  } catch (err) {
    if (err.message === "Required fields incompleted") {
      return res.status(400).send({ message: "Complete the required fields" });
    } else if (err.message === "Prisma has failed, unable to create user") {
      return res
        .status(500)
        .send({ message: "Server error, contact developement team" });
    }
    return res.status(503).send({
      message: err.message,
    });
  }
});

// Delete a user
router.delete("/accounts/user", async (req, res) => {
  try {
    const { id } = req.body;

    const result = await UDeletionProcess(id);

    return res.status(200).send({ result });
  } catch (err) {
    return res.status(503).send({
      message: err.message,
    });
  }
});

// Get all products --- TO FINISH
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

// Get one product --- TO FINISH
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

// Create a product --- TO FINISH
router.post(
  "/stock/product",
  //upload.single("productPicture"),
  async (req, res) => {
    try {
      const { fischerCode, easySap, name, minimunStock } = req.body;
      // const productPicture = req.file.buffer;
      const result = await PCreationProcess(
        fischerCode,
        easySap,
        name,
        minimunStock,
        // productPicture (cuando lo pueda testear con otra cosa descomentar esto)
      );
      return res.status(201).send({ result });
    } catch (err) {
      if (err.message === "Required fields are incompleted") {
        return res
          .status(400)
          .send({ message: "Complete the required fields" });
      }

      return res.status(503).send(err.message);
    }
  },
);
// router.put("/stock/product", async (req, res) => {});

// Delete a product --- TO FINISH
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

// router.put("/accounts/user", (req, res) => {});
// router.get("/notifications/emails", (req, res) => {});
// router.get("/notifications/emails/:emailId", (req, res) => {});
// router.delete("/notifications/emails/:emailId", (req, res) => {});

export default router;
