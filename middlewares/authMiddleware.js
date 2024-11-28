import { verifyToken } from "../utils/jwtHelpers.js";

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const accessToken = token.split(" ")[1];

            const decoded = verifyToken(accessToken, process.env.JWT_KEY);

            if (decoded.userId) {
                req.userId = decoded.userId;
                next();
                return;
            }
        }
        res.status(401).json({ message: "Unauthorized access, Invalid token" });
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: "Unauthorized access, Invalid token" });
    }
};

export default authMiddleware;
