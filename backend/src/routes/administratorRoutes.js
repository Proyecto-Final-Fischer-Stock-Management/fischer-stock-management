import { Router } from "express";

const router = Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    message: `Route ${req.method} ${req.originalUrl} is not implemented yet.`,
  });
};

router.get("/dashboard", notImplemented);
router.get("/dashboard/stats", notImplemented);
router.get("/dashboard/visits", notImplemented);

router.get("/stock", notImplemented);
router.get("/stock/products", notImplemented);
router.post("/stock/products", notImplemented);
// router.put("/stock/products", notImplemented);
router.delete("/stock/products", notImplemented);

router.get("/accounts", notImplemented);
router.get("/accounts/users", notImplemented);
router.post("/accounts/users", notImplemented);
// router.put("/accounts/users", notImplemented);
router.delete("/accounts/users", notImplemented);

// router.get("/notifications/emails", notImplemented);
// router.get("/notifications/emails/:emailId", notImplemented);
// router.delete("/notifications/emails/:emailId", notImplemented);

export default router;
