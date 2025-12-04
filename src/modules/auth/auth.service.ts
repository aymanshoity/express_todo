import { pool } from "../../config/db"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "../../config";


const userLogin=async(email:string,password:string)=>{
   console.log(email,password)
   const result=await pool.query(`SELECT * FROM users WHERE email=$1 `,[email])
   if(result.rows.length===0){ return null};
   const user=result.rows[0];
   console.log(user)
   const isPasswordMatched=await bcrypt.compare(password,user.password)
   if(!isPasswordMatched) return false;
   const secret=config.jwt_secrete as string
   const token=jwt.sign({name:user.name,email:user.email,role:user.role},secret,{expiresIn:"7d"})
   console.log({token})
   return {token,user}
}

export const authServices={
   userLogin
}



