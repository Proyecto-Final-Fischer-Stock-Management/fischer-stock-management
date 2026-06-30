import { Router } from "express";
import administratorRoutes from "./features/administrator/administratorRoutes.js";
import authRoutes from "./features/auth/authRoutes.js";
import stockmanRoutes from "./features/stockman/stockmanRoutes.js";
import automaticRoutes from "./features/automatic/automaticRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/administrator", administratorRoutes);
router.use("/stockman", stockmanRoutes);
router.use("/automatic", automaticRoutes);

export default router;
