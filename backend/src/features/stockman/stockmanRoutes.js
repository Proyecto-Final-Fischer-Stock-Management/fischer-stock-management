import { Router } from "express";
import * as service from "./stockmanService.js";

const router = Router();

// get all places and details info
router.get("/check-in/info", async (req, res, next) => {
  try {
    const info = await service.GettingPlaceInfo();
    return res.status(200).send({ info });
  } catch (err) {
    return next(err);
  }
});

// Check in register
router.post("/check-in", async (req, res, next) => {
  try {
    const { sectorId } = req.body;
    const stockmanId = req.user.id;
    const result = await service.PostingCheckIn(sectorId, stockmanId);
    return res.status(201).send({ result });
  } catch (err) {
    return next(err);
  }
});

// Get the last check that I made
router.get("/my-check-in", async (req, res, next) => {
  try {
    const stockmanId = req.user.id;
    const info = await service.GettingLastCheckIn(Number(stockmanId));
    return res.status(200).send({ info });
  } catch (err) {
    return next(err);
  }
});

// Get the products (access stock) by the stockman location
router.get("/catalog/stock/:sectorId", async (req, res, next) => {
  try {
    const { sectorId } = req.params;
    const result = await service.SGettingManyProcess(Number(sectorId));
    return res.status(200).send({ result });
  } catch (err) {
    return next(err);
  }
});

// Modify the product's information
router.put("/sendorder", async (req, res, next) => {
  try {
    const { productId, sectorId, updatedStock, stockOut, franchise } =
      req.body.information;
    const result = await service.SendingOrder(
      productId,
      sectorId,
      updatedStock,
      stockOut,
      franchise,
    );
    return res.status(202).send({ result });
  } catch (err) {
    return next(err);
  }
});

// Get product image
router.get("/catalog/product/:fischerCode/image", async (req, res, next) => {
  try {
    const { fischerCode } = req.params;

    const product = await service.GettingProductImage(Number(fischerCode));

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

export default router;
