import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import userModel from "../models/user.model.js";

export const createUser = async (userDetails) => {
    const { email } = userDetails;
    const isUserRegistered = await userModel.findOne({ email });
    if (isUserRegistered) {
        return {
            success: false,
            message: "User Exists. Please Login."
        }
    }
    const salt = await bcryptjs.genSalt(10);
    userDetails.password = await bcryptjs.hash(userDetails.password, salt);
    const newUser = await userModel.create(userDetails);
    if (!newUser) {
        return {
            success: false,
            message: "User Can't be Created."
        }
    }
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);
    const user = {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
    }
    return {
        user,
        token,
        success: true,
        message: "User Created Successfully"
    };
}

export const checkCredentials = async (credentials) => {
    const { email, password } = credentials;
    const userInfo = await userModel.findOne({ email });
    if (userInfo) {
        const isPasswordMatched = bcryptjs.compare(password, userInfo.password);
        if (isPasswordMatched) {
            const token = jwt.sign({ userId: userInfo._id }, process.env.JWT_SECRET_KEY);
            const user = {
                userId: userInfo._id,
                username: userInfo.username,
                email: userInfo.email,
                role: userInfo.role
            }
            return {
                user,
                token,
                message: "User Logged In Successfully.",
                success: true
            }
        }
        return {
            success: false,
            message: "Invalid Password."
        }
    }
    return {
        success: false,
        message: "User Doesn't Exist. Please Register."
    }
}