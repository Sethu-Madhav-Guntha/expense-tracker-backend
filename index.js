import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./src/routes/user.route.js";
import expenseRouter from "./src/routes/expense.route.js";
import connectDB from "./src/config/db.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/users", userRouter);
app.use("/expenses", expenseRouter);

app.listen(PORT, () => {
    console.log(`App is listening at Port: ${PORT}`);
});