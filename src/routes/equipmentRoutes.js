import { Router } from "express";
import * as controller from "../controllers/equipmentController.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post("/", upload.single("imagem"), controller.create);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/:id", upload.single("imagem"), controller.update);
router.delete("/:id", controller.remove);

export default router;
