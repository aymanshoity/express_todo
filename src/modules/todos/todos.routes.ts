import express from "express";
import { todoController } from "./todos.controller";


const router=express.Router();

router.post("/", todoController.createTodo)
router.get('/',todoController.getTodos)
router.get('/:id',todoController.getSingleTodo)
router.put('/:id',todoController.updateTodo )
router.delete('/:id',todoController.deleteTodo )

export const todoRoute=router;