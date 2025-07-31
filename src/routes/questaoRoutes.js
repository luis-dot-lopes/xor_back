import { Router } from "express";
import * as questaoController from "../controllers/questaoController.js";

const router = Router();

router.post("/", questaoController.create);
router.get("/", questaoController.findAll);
router.get("/:id", questaoController.findById);
router.put("/:id", questaoController.update);
router.delete("/:id", questaoController.remove);

export default router;
