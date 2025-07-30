import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);

export default router;
