import { body } from "express-validator";

export const validateSignup = [
    // Validate and sanitize email
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(), // Sanitizes email to a standard format

    // Validate and sanitize password
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/\d/)
        .withMessage("Password must contain a number")
        .matches(/[!@#$%^&*]/)
        .withMessage("Password must contain a special character")
        .trim(), // Removes extra spaces

    // Validate and sanitize name
    body("name")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ max: 50 })
        .withMessage("Name cannot exceed 50 characters")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Name can only contain letters and spaces")
        .trim(), // Removes extra spaces
];
