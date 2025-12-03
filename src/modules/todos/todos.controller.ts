import  {  Request, Response } from "express";
import { todoServices } from "./todos.service";


const createTodo=async (req: Request, res: Response) => {
   
   try {
      const result = await todoServices.createTodo(req.body)
      console.log(result.rows[0])
      res.status(200).json({
         success: true, message: "Todo created Successfully", data: result.rows[0]
      })
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }

}

const getTodos= async (req: Request, res: Response) => {
   try {
      const result = await todoServices.getTodos()

      res.status(200).json({
         success: true,
         message: "Todos Fetched Successfully",
         data: result.rows,
      })
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }
}

const getSingleTodo=async (req: Request, res: Response) => {

   try {
      const result = await todoServices.getSingleTodo(req.params.id as string)
      if (result.rowCount === 0) {
         return res.status(404).json({
            success: false,
            message: "Todo not found",
            data: null,
         })
      } else {
         res.status(200).json({
            success: true,
            message: "Todo Fetched Successfully",
            data: result.rows[0],
         })
      }
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }
}

const updateTodo=async (req: Request, res: Response) => {
   try {
      const result = await todoServices.updateTodo(req.body,req.params.id!)
      if (result.rowCount === 0) {
         return res.status(404).json({
            success: false,
            message: "Todo not found",
            data: null,
         })
      } else {
         res.status(200).json({
            success: true,
            message: "=Todo updated Successfully",
            data: result.rows[0],
         })
      }
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }
}

const deleteTodo=async (req: Request, res: Response) => {

   try {
      const result = await todoServices.deleteTodo(req.params.id!)
      if (result.rowCount === 1) {
        
        return  res.status(200).json({
            success: true,
            message: "Todo deleted Successfully",
            data: result.rows,
         })
      } else {
          return res.status(404).json({
            success: false,
            message: "Todo not found",
            data: null,
         })
      }
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }
}

export const todoController={
   createTodo,getTodos,getSingleTodo,updateTodo,deleteTodo
}