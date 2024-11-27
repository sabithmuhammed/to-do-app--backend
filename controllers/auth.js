import User from "../model/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const error = new Error(
                "User with same email exist. Try login instead"
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
            .json({ message: "Account created successfully" });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
