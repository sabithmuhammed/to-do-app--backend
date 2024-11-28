import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Pass an error object to the next middleware
        return next({
            status: 400,
            message: "Validation failed",
            details: errors.array(), // Attach detailed error info (optional)
        });
    }
    next(); // Proceed if no validation errors
};
