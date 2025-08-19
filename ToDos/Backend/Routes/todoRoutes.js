import express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  getTaskById,
  updateTask,
} from "../Controller/todoController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const todoRouter = express.Router();

todoRouter.post("/task", verifyToken, createTask);
todoRouter.get("/user/:userId", getTasks);
todoRouter.get("/:taskId", getTaskById);
todoRouter.put("/:taskId", updateTask);
todoRouter.delete("/:taskId", deleteTask);

export default todoRouter;
