import { createTask,getTasks,getsingleTask,updateTask,deleteTask } from "../controller/taskController.js";
import express from "express";
import { authenticate } from "../middleware/authenticate.js";

const taskRouter=express.Router();

taskRouter.post("/tasks",authenticate,createTask);
taskRouter.get("/tasks/:projectId/tasks",authenticate,getTasks);
taskRouter.get("/tasks/:id",authenticate,getsingleTask);
taskRouter.put("/tasks/:id",authenticate,updateTask);
taskRouter.delete("/tasks/:id",authenticate,deleteTask);

export {taskRouter};