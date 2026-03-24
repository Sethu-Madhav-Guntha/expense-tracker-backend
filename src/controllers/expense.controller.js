import { insertExpense, fetchUserExpenses, updateExpenseDetails, removeExpense } from "../services/expense.service.js";

export const addExpense = async (req, res) => {
    const { username } = req.headers;
    // console.log(req.body);
    const { item, amount } = req.body;
    const newExpense = await insertExpense({ item, amount, username });
    if (!newExpense.success) {
        return res.status(409).json({ ...newExpense });
    }
    return res.status(201).json({ ...newExpense });
};

export const getUserExpenses = async (req, res) => {
    const { username } = req.headers;
    const expenses = await fetchUserExpenses(username);
    res.status(200).json({ ...expenses });
};

export const updateExpense = async (req, res) => {
    const { username } = req.headers;
    const { id } = req.params;
    console.log(id);
    const updateExpenseObject = { ...req.body, username };
    const updatedExpense = await updateExpenseDetails(id, updateExpenseObject);
    if (!updatedExpense.success) {
        return res.status(401).json({ ...updatedExpense });
    }
    return res.status(200).json({ ...updatedExpense });
};

export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    const deletedExpense = await removeExpense(id);
    return res.status(204).json({ ...deletedExpense });
};