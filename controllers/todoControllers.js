import Todo from "../model/todo.js";

export const getTodos = async (req, res, next) => {
    try {
        const userId = req.userId;

        const todos = await Todo.find({ userId });
        res.status(200).json(todos);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const addTodo = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { todo } = req.body;

        const todos = await Todo.findOneAndUpdate(
            { userId },
            {
                $push: {
                    todos: todo,
                },
            },
            { upsert: true, new: true }
        );
        res.status(200).json(todos);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const updateTodo = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { updatedData } = req.body;
        const { todoId } = req.params;

        const todos = await Todo.findOne({ userId });

        const todo = todos?.todos?.find((todo) => todo.todoId === todoId);

        if (
            new Date(todo.updatedAt).getTime() < new Date(updatedData.updatedAt)
        ) {
            await Todo.findOneAndUpdate(
                { userId, "todos.todoId": todoId },
                {
                    $set: {
                        "todos.$.title": updatedData.title,
                        "todos.$.check": updatedData.check,
                        "todos.$.updatedAt": updatedData.updatedAt,
                    },
                },
                { new: true }
            );
        }
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const deleteTodo = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { todoId } = req.params;

        await Todo.findOneAndUpdate(
            { userId, "todos.todoId": todoId },
            {
                $pull: {
                    todos: { todoId },
                },
            },
            { new: true }
        );
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};
