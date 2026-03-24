import { Router } from "express";
import { addExpense, deleteExpense, getUserExpenses, updateExpense } from "../controllers/expense.controller.js";

const router = Router();

router.post("/", addExpense);
router.get("/", getUserExpenses);
router.put("/:expenseId", updateExpense);
router.delete("/:expenseId", deleteExpense);

export default router;