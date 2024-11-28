import express from "express";
import { signup, login } from "../controllers/authControllers.js";
import { validateSignup } from "../middlewares/validateSignup.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const authRouter = express.Router();

authRouter.post("/signup", validateSignup, validateRequest, signup);
authRouter.post("/login", validateLogin, validateRequest, login);

// authRouter.post("/login", login);

export default authRouter;
