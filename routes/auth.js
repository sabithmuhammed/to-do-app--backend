import express from "express";
import { signup } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);

// authRouter.post("/login", login);


export default authRouter;
