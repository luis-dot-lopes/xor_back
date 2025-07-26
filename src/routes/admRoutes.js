import { Router } from "express";
import * as controller from "../controllers/admController.js";

const router = Router();

router.get("/me", controller.getProfile);

export default router;
