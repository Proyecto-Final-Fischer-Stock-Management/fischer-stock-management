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
    const { sectorId, stockmanId } = req.body;
    const result = await service.PostingCheckIn(sectorId, stockmanId);
    return res.status(201).send({ result });
  } catch (err) {
    return res.status(503).send({ message: err.message });
  }
});

// Get the last check that I made
router.get("/my-check-in/:stockmanId", async (req, res) => {
  try {
    const { stockmanId } = req.params;
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

// Post the products that the stockman wants to modify
router.post("/order/product", (req, res) => {});

// get the all the products that the stockman had selected
router.get("/order/products", (req, res) => {});
router.put("/order/product", (req, res) => {});
router.delete("/order/product", (req, res) => {});
router.post("/order", (req, res) => {});

export default router;
