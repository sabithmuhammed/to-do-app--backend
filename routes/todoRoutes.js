import express from "express";
import {
    addTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../controllers/todoControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const todoRouter = express.Router();

todoRouter.use(authMiddleware);

todoRouter.get("/get-todos", getTodos);
todoRouter.post("/add-todo", addTodo);
todoRouter.patch("/update-todo/:todoId", updateTodo);
todoRouter.delete("/delete-todo/:todoId", deleteTodo);

export default todoRouter;
