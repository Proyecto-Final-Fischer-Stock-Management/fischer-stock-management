import { Router } from "express";
import { SCreationProcess } from "./automaticService";

const router = Router();

// Post a stock (product and place information)
router.post("/catalog/stock", async (req, res) => {
  try {
    const { productId, sectorId, minimumStock } = req.body;
    const stock = await SCreationProcess;
    return res.status(201).send({
      stock,
    });
  } catch (err) {
    res.status(503).send({
      message: err.message,
    });
  }
});
