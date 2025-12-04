import express, {  Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";



const createUser=async (req: Request, res: Response) => {
   // console.log(req.body);
   
   try {
      const result=await userServices.createUser(req.body)
      res.status(200).json({
         success: true, message: "User created Successfully", data: result.rows[0]
      })
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }

}

const getUsers=async (req: Request, res: Response) => {
   try {
      const result=await userServices.getUsers()
      res.status(200).json({
         success: true,
         message: "User created Successfully",
         data: result.rows,
      })
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }
}

const getSingleUser=async (req: Request, res: Response) => {

   try {
      const result = await userServices.getSingleUser(req.params.id as string)
      if (result.rowCount === 0) {
         return res.status(404).json({
            success: false,
            message: "User not found",
            data: null,
         })
      } else {
         res.status(200).json({
            success: true,
            message: "User created Successfully",
            data: result.rows[0],
         })
      }
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }
}

const updateUser=async (req: Request, res: Response) => {
 const {name,email}=req.body
   try {
      const result = await userServices.updateUser(name,email,req.params.id!)
      if (result.rowCount === 0) {
         return res.status(404).json({
            success: false,
            message: "User not found",
            data: null,
         })
      } else {
         res.status(200).json({
            success: true,
            message: "User updated Successfully",
            data: result.rows[0],
         })
      }
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }
}

const deleteUser=async (req: Request, res: Response) => {

   try {
      const result = await userServices.deleteUser(req.params.id!)
      if (result.rowCount === 1) {
        
        return  res.status(200).json({
            success: true,
            message: "User deleted Successfully",
            data: result.rows,
         })
      } else {
          return res.status(404).json({
            success: false,
            message: "User not found",
            data: null,
         })
      }
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }
}

export const userController={
   createUser,getUsers,getSingleUser,updateUser,deleteUser
}