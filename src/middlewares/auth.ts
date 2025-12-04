// higher order function refers to the function that either takes one or more functions as arguments or returns a function as its result. In the context of middleware, a higher order function can be used to create middleware functions that can be customized with specific parameters.

import {Request, NextFunction, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
const auth=(...role:string[])=>{
   return async(req:Request,res:Response,next:NextFunction)=>{
        try{
 const authToken=req.headers.authorization;
         // console.log({"AuthToken":authToken})
         if(!authToken){
            return res.status(401).json({message:"Unauthorized"})
         }
         const decode=jwt.verify(authToken,config.jwt_secrete as string) as JwtPayload
      // jwt payload
         console.log({"Decoded Token":decode}) 
         req.user =decode 
         if(role.length && !role.includes(decode.role as string)){
            return res.status(403).json({message:"Forbidden"})
         }
         next()
        }catch(error :any){
            res.status(401).json({
               message:"Unauthorized",
            })
        }
      }
      
}

export default auth;