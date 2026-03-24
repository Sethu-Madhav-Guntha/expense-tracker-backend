import { model, Schema } from "mongoose";

const expenseModel = new Schema({
    item: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

export default model("expense", expenseModel);