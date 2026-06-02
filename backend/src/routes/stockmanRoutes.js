import { Router } from "express";

const router = Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    message: `Route ${req.method} ${req.originalUrl} is not implemented yet.`,
  });
};

router.get("/check-in/franchises", notImplemented);
router.get("/check-in/branches", notImplemented);
router.get("/check-in/sectors", notImplemented);
router.post("/check-in", notImplemented);

router.get("/home/last-check-in", notImplemented);

router.get("/catalog/products", notImplemented);
router.post("/order/product", notImplemented);

router.get("/order/product", notImplemented);
router.get("/order/products", notImplemented);
// router.put("/order/product", notImplemented);
router.delete("/order/product", notImplemented);
router.post("/order/send", notImplemented);

export default router;
