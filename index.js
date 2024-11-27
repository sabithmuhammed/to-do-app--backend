import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import authRouter from "./routes/auth.js";

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/to-do-app")
    .then(() => console.log("mongodb connected"));
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("working");
});

app.use("/api/v1/auth/", authRouter);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
