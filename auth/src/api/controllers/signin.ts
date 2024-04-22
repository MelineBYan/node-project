import { Request, Response } from "express";
import User from "../../models/UserModel";
import {Password} from "../../services/Password";
import { BadRequestError } from "@meline1/common";
import jwt from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) => {

    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

        if (!user || !(await Password.compare(user.password, password))) {
            throw new BadRequestError("Invalid credentials.")
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        },
            process.env.JWT_KEY!)

        return res.json({ token });

    } catch (err) {
    throw err;
    }
};