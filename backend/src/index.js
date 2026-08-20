import { Router } from "express";

import administratorRoutes from "./features/administrator/administratorRoutes.js";
import authRoutes from "./features/auth/authRoutes.js";
import stockmanRoutes from "./features/stockman/stockmanRoutes.js";
import automaticRoutes from "./features/automatic/automaticRoutes.js";
import healthRoute from "./utils/health.js";

import AuthMiddleWare from "./middlewares/authMiddleware.js";
import { RoleMiddleware } from "./middlewares/roleMiddleware.js";

const router = Router();

router.use("/auth", authRoutes);
router.use(
  "/administrator",
  AuthMiddleWare,
  RoleMiddleware("Administrator"),
  administratorRoutes,
);
router.use(
  "/stockman",
  AuthMiddleWare,
  RoleMiddleware("Stockman"),
  stockmanRoutes,
);
router.use("/automatic", automaticRoutes);
router.use("/health", healthRoute);

export default router;
