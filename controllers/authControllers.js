import User from "../model/user.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/jwtHelpers.js";

export const signup = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const error = new Error(
                "User with same email exist. Try login instead."
            );
            error.status = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await new User({
            email,
            name,
            password: hashedPassword,
        }).save();

        return res
            .status(201)
            .json({ message: "Account created successfully." });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error(
                "No account found with this email. Please check and try again."
            );
            error.status(404);
            throw error;
        }

        const isPasswordSame = bcrypt.compare(password, user.password);

        if (!isPasswordSame) {
            const error = new Error("Incorrect password. Please try again.");
            error.status = 401;
            throw error;
        }

        const accessToken = createToken({ userId: user._id }, "access");
        const refreshToken = createToken({ userId: user._id }, "refresh");

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            name: user.name,
            accessToken,
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
