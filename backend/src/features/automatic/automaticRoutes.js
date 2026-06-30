import { Router } from "express";
import { SCreationProcess } from "./automaticService.js";

const router = Router();

// Post a stock (product and place information)
router.post("/catalog/stock", async (req, res) => {
  try {
    const { productId, sectorId, minimumStock } = req.body;
    const result = await SCreationProcess(productId, sectorId, minimumStock);
    return res.status(201).send({
      result,
    });
  } catch (err) {
    res.status(503).send({
      message: err.message,
    });
  }
});

export default router;
