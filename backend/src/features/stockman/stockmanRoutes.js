import { Router } from "express";
import { SGettingManyProcess } from "./stockmanService.js";

const router = Router();

router.get("/check-in/franchises", (req, res) => {});
router.get("/check-in/branches", (req, res) => {});
router.get("/check-in/sectors", (req, res) => {});
router.post("/check-in", (req, res) => {});

router.get("/home/last-check-in", (req, res) => {});

// Get the products (access stock) by the stockman location
router.get("/catalog/stock/:sectorId", async (req, res) => {
  try {
    const { sectorId } = req.params;
    const result = await SGettingManyProcess(Number(sectorId));
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
