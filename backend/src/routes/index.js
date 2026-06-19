import { Router } from "express";
import administratorRoutes from "./administratorRoutes.js";
import authRoutes from "../features/auth/authRoutes.js";
import stockmanRoutes from "./stockmanRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/administrator", administratorRoutes);
router.use("/stockman", stockmanRoutes);

export default router;
