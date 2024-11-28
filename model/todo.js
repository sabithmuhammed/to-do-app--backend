import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
        todos: [
            {
                todoId: { type: String, required: true, unique: true },
                title: { type: String, required: true },
                check: { type: Boolean, required: true, default: false },
                priority: { type: String, default: "Low" },
                createdAt: { type: Date, required: true, default: new Date() },
                updatedAt: { type: Date, required: true, default: new Date() },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("todo", todoSchema);
