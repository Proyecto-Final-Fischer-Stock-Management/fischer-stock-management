import { Router } from "express";
import { SCreationProcess } from "./automaticService.js";

const router = Router();

// Post a stock (product and place information)
router.post("/catalog/stock", async (req, res, next) => {
  try {
    const { productId, sectorId, minimumStock, actualStock, unitsPerCage } =
      req.body;
    const result = await SCreationProcess(
      productId,
      sectorId,
      minimumStock,
      actualStock,
      unitsPerCage,
    );
    return res.status(201).send({
      result,
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
