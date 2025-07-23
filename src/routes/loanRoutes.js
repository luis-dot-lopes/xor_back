import { Router } from "express";
import * as controller from "../controllers/loanController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { userTokenMiddleware } from "../middlewares/userTokenMiddleware.js";

const router = Router();

router.post("/", authMiddleware, controller.createLoan);
router.get("/", authMiddleware, controller.getAllLoans);
router.get("/:id", authMiddleware, controller.getLoanById);
router.put("/:id", authMiddleware, controller.updateLoanStatus);
router.delete("/:id", authMiddleware, controller.deleteLoan);

router.get(
  "/user/loans/:token",
  userTokenMiddleware,
  controller.getUserLoansByToken
);
router.get(
  "/user/loan/:id/:token",
  userTokenMiddleware,
  controller.getUserLoanById
);

export default router;
