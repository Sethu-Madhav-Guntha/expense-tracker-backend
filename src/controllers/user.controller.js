import { createUser, checkCredentials } from "../services/user.service.js";

export const registerUser = async (req, res) => {
    const createdUser = await createUser(req.body);
    if (!createdUser.success) {
        return res.status(409).json({ ...createdUser });
    }
    return res.status(201).json({
        ...createdUser
    })
};

export const loginUser = async (req, res) => {
    const loggedInUser = await checkCredentials(req.body);
    if (!loggedInUser.success) {
        return res.status(401).json({ ...loggedInUser });
    }
    return res.status(200).json({ ...loggedInUser });
};