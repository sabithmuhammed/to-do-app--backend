import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

export const createToken = (payload, type = "access") => {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: type === "access" ? "5d" : "30d",
    });

    return token;
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error("JWT verification failed");
    }
};

