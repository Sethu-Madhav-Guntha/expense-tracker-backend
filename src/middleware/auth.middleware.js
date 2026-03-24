import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const isUserAuthenticated = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).json({
            success: false,
            message: "User is not Authenticated."
        });
    }
    const information = jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
    if (!information.userId) {
        return res.status(404).json({
            success: false,
            message: "User Id is not Found."
        });
    }
    req.userId = information.userId;
    next();
}

export const fetchUserDetails = async (req, res, next) => {
    const { userId } = req;
    const isUserFetched = await userModel.findOne({ _id: userId });
    req.user = {
        username: isUserFetched.username,
    }
    next();
}