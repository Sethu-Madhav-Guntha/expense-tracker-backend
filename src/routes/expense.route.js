import { Router } from "express";
import { addExpense, deleteExpense, getUserExpenses, updateExpense } from "../controllers/expense.controller.js";

const router = Router();

router.post("/", addExpense);
router.get("/", getUserExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;