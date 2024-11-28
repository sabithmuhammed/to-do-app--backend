import { body } from "express-validator";

export const validateLogin = [
    // Validate and sanitize email
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),

    // Validate and sanitize password
    body("password").notEmpty().withMessage("Password is required").trim(), // Removes extra spaces
];
