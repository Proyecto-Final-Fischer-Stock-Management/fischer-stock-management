import { Router } from "express";
import multer from "multer";
import * as service from "./administratorService.js";

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

    const user = await service.UGettingOneProcess(id);

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
    const users = await service.UGettingAllProcess(id);
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

    const result = await service.UCreationProcess(
      completeName,
      email,
      role,
      password,
    );

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

    const result = await service.UDeletionProcess(id);

    return res.status(200).send({ result });
  } catch (err) {
    return res.status(503).send({
      message: err.message,
    });
  }
});

// Get all products --- TO TEST
router.get("/stock/products", async (req, res) => {
  try {
    const info = await service.PGettingAllProcess();
    return res.status(200).send({ info });
  } catch (err) {
    res.status(503).send({ message: err.message });
  }
});

// Get one product --- TO TEST
router.get("/stock/product", async (req, res) => {
  try {
    const { fischerCode } = req.body;
    const info = await service.PGettingOneProcess(fischerCode);
    return res.status(200).send({ info });
  } catch (err) {
    res.status(503).send({ message: err.message });
  }
});

// Create a product
router.post(
  "/stock/product",
  upload.single("productPicture"),
  async (req, res) => {
    try {
      const {
        fischerCode,
        easySap,
        sodimacSku,
        carrefourEan,
        anonimaCodInt,
        hipertehuelcheCode,
        name,
        productPictureType,
      } = req.body;
      const productPicture = req.file.buffer;
      const product = [
        Number(fischerCode),
        easySap,
        sodimacSku,
        Number(carrefourEan),
        Number(anonimaCodInt),
        hipertehuelcheCode,
        name,
        productPicture,
        productPictureType,
      ];
      const result = await service.PCreationProcess(product);
      return res.status(201).send({ result });
    } catch (err) {
      if (err.message === "Required fields are uncompleted") {
        return res
          .status(400)
          .send({ message: "Complete the required fields" });
      }
      return res.status(503).send(err.message);
    }
  },
);

// router.put("/stock/product", async (req, res) => {});

// Delete a product --- TO TEST
router.delete("/stock/product", async (req, res) => {
  try {
    const { fischerCode } = req.body;
    const result = await service.PDeletionProcess;
    return res.status(202).send(result);
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
