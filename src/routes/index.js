import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import equipmentRoutes from "./equipmentRoutes.js";
import loanRoutes from "./loanRoutes.js";
import admRoutes from "./admRoutes.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/equipments", authMiddleware, equipmentRoutes);
router.use("/loans", loanRoutes);
router.use("/admin", authMiddleware, admRoutes);

export default router;
