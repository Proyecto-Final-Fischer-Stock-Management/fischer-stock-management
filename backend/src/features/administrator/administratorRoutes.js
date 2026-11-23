import { Router } from "express";
import multer from "multer";
import * as service from "./administratorService.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("Invalid image format"));
    }

    callback(null, true);
  },
});

router.get("/dashboard/stats", (req, res) => {});
router.get("/dashboard/visits", (req, res) => {});

// Get one user
router.get("/accounts/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await service.UGettingOneProcess(id);

    return res.status(200).send({
      user,
    });
  } catch (err) {
    return next(err);
  }
});

// Get all users
router.get("/accounts/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await service.UGettingAllProcess(id);
    return res.status(200).send({
      users,
    });
  } catch (err) {
    return next(err);
  }
});

// Create a user
router.post("/accounts/user", async (req, res, next) => {
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
    return next(err);
  }
});

// Delete a user
router.delete("/accounts/user", async (req, res, next) => {
  try {
    const { id } = req.body;

    const result = await service.UDeletionProcess(id);

    return res.status(200).send({ result });
  } catch (err) {
    return next(err);
  }
});

// Get all products --- TO TEST
router.get("/stock/products", async (req, res, next) => {
  try {
    const info = await service.PGettingAllProcess();
    return res.status(200).send({ info });
  } catch (err) {
    return next(err);
  }
});

// Get one product --- TO TEST
router.get("/stock/product/:fischerCode", async (req, res, next) => {
  try {
    const { fischerCode } = Number(req.params.fischerCode);
    const info = await service.PGettingOneProcess(fischerCode);
    return res.status(200).send({ info });
  } catch (err) {
    return next(err);
  }
});

// Get product image
router.get("/stock/product/:fischerCode/image", async (req, res, next) => {
  try {
    const { fischerCode } = req.params;

    const product = await service.PGettingOneProcess(Number(fischerCode));

    if (!product || !product.product_picture) {
      return res.status(404).send({
        message: "Product image not found",
      });
    }

    res.set("Content-Type", product.product_picture_type);

    return res.status(200).send(product.product_picture);
  } catch (err) {
    return next(err);
  }
});

// Create a product
router.post(
  "/stock/product",
  upload.single("productPicture"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Product image is required",
        });
      }
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
      const product = {
        fischerCode: Number(fischerCode),
        easySap,
        sodimacSku,
        carrefourEan: Number(carrefourEan),
        anonimaCodInt: Number(anonimaCodInt),
        hipertehuelcheCode,
        name,
        productPicture,
        productPictureType,
      };
      const result = await service.PCreationProcess(product);
      return res.status(201).send({ result });
    } catch (err) {
      return next(err);
    }
  },
);

// router.put("/stock/product", async (req, res) => {});

// Delete a product --- TO TEST
router.delete("/stock/product", async (req, res, next) => {
  try {
    const { fischerCode } = req.body;
    const result = await service.PDeletionProcess(fischerCode);
    return res.status(202).send(result);
  } catch (err) {
    return next(err);
  }
});

// router.put("/accounts/user", (req, res) => {});
// router.get("/notifications/emails", (req, res) => {});
// router.get("/notifications/emails/:emailId", (req, res) => {});
// router.delete("/notifications/emails/:emailId", (req, res) => {});

export default router;
