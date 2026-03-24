import { insertExpense, fetchUserExpenses, updateExpenseDetails, removeExpense } from "../services/expense.service.js";

export const addExpense = async (req, res) => {
    const { userId } = req;
    const { item, amount } = req.body;
    const newExpense = await insertExpense({ item, amount, userId });
    if (!newExpense.success) {
        return res.status(409).json({ ...newExpense });
    }
    return res.status(201).json({ ...newExpense });
};

export const getUserExpenses = async (req, res) => {
    const { userId } = req;
    const expenses = await fetchUserExpenses(userId);
    res.status(200).json({ ...expenses });
};

export const updateExpense = async (req, res) => {
    const { userId } = req;
    const { expenseId } = req.params;
    const updateExpenseObject = { ...req.body, userId };
    const updatedExpense = await updateExpenseDetails(expenseId, updateExpenseObject);
    if (!updatedExpense.success) {
        return res.status(401).json({ ...updatedExpense });
    }
    return res.status(200).json({ ...updatedExpense });
};

export const deleteExpense = async (req, res) => {
    const { expenseId } = req.params;
    const deletedExpense = await removeExpense(expenseId);
    return res.status(204).json({ ...deletedExpense });
};