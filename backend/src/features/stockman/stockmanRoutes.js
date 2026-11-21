import { Router } from "express";
import * as service from "./stockmanService.js";

const router = Router();

// get all places and details info
router.get("/check-in/info", async (req, res) => {
  try {
    const info = await service.GettingPlaceInfo();
    return res.status(200).send({ info });
  } catch (err) {
    return res.status(503).send({ message: err.message });
  }
});

// Check in register
router.post("/check-in", async (req, res) => {
  try {
    const { sectorId } = req.body;
    const stockmanId = req.user.id;
    const result = await service.PostingCheckIn(sectorId, stockmanId);
    return res.status(201).send({ result });
  } catch (err) {
    return res.status(503).send({ message: err.message });
  }
});

// Get the last check that I made
router.get("/my-check-in", async (req, res) => {
  try {
    const stockmanId = req.user.id;
    const info = await service.GettingLastCheckIn(Number(stockmanId));
    return res.status(200).send({ info });
  } catch (err) {
    return res.status(503).send({ message: err.message });
  }
});

// Get the products (access stock) by the stockman location
router.get("/catalog/stock/:sectorId", async (req, res) => {
  try {
    const { sectorId } = req.params;
    const result = await service.SGettingManyProcess(Number(sectorId));
    return res.status(200).send({ result });
  } catch (err) {
    return res.status(503).send({ message: err.message });
  }
});

// Modify the product's information
router.put("/sendorder", async (req, res) => {
  try {
    const {
      productId,
      sectorId,
      updatedStock,
      stockOut,
      timeOfSend,
      franchise,
    } = req.body;
    const result = await service.SendingOrder(
      productId,
      sectorId,
      updatedStock,
      stockOut,
      timeOfSend,
      franchise,
    );
    return res.status(202).send({ result });
  } catch (err) {
    return res.status(503).send({ message: err.message });
  }
});

// Get product image
router.get("/catalog/product/:fischerCode/image", async (req, res) => {
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
    return res.status(503).send({
      message: err.message,
    });
  }
});

export default router;
