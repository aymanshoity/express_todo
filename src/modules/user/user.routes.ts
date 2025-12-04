import express, {  Request, Response } from "express";
import { userController } from "./user.controller";
import { logger } from "../../middleware";
import auth from "../../middlewares/auth";

const router=express.Router();

router.post("/", userController.createUser)
router.get('/',logger,auth("Admin"),userController.getUsers )
router.get('/:id',auth("Admin","User"),userController.getSingleUser )
router.put('/:id',userController.updateUser )
router.delete('/:id',userController.deleteUser )

export const userRoute=router;