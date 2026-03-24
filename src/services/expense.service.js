import expenseModel from "../models/expense.model.js";

export const insertExpense = async (expenseDetails) => {
    const newExpense = await expenseModel.create(expenseDetails);
    if (!newExpense) {
        return {
            success: false,
            message: "Can't Add Expense."
        }
    }
    return {
        success: true,
        message: "Expense Added Successfully."
    }
}

export const fetchUserExpenses = async (userId) => {
    const userExpenses = await expenseModel.find({ userId });
    return {
        success: true,
        message: "Fetched Expenses Successfully.",
        expenses: userExpenses
    }
}

export const updateExpenseDetails = async (expenseId, expenseDetails) => {
    const expenseUpdated = await expenseModel.findByIdAndUpdate(expenseId, expenseDetails, { returnDocument: "after" });
    if (!expenseUpdated) {
        return {
            success: false,
            message: "Can't Update Expense."
        }
    }
    return {
        success: true,
        message: "Expense Updated Successfully."

    }
}

export const removeExpense = async (expenseId) => {
    const deletedExpense = await expenseModel.findByIdAndDelete(expenseId);
    return {
        deletedExpense,
        message: "Expense Deleted Successfully.",
        success: true
    };
}