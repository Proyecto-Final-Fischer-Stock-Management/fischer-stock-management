import { Router } from "express";

const router = Router();

const notImplemented = (req, res) => {
  res.status(501).json({
    message: `Route ${req.method} ${req.originalUrl} is not implemented yet.`,
  });
};

router.post("/login", notImplemented);
router.get("/me", notImplemented);
router.post("/logout", notImplemented);

export default router;
