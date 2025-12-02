import express, { NextFunction, Request, Response } from 'express';
import { Pool } from 'pg'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') })
const app = express()
const port = 5000

const pool = new Pool({
   connectionString: `${process.env.CONNECTION_STR}`
})



const initDB = async () => {
   await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      age INT,
      phone VARCHAR(15),
      address TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      UPDATED_at TIMESTAMP DEFAULT NOW()
   )
      `)
   await pool.query(`
      CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      TITLE VARCHAR(200),
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      UPDATED_at TIMESTAMP DEFAULT NOW()
   )
      `)
}

initDB()
// parser
app.use(express.json())
// to send form data
// app.use(express.urlencoded())



// logger middleware

const logger=(req:Request,res:Response,next:NextFunction)=>{
   console.log(`[${new Date().toISOString()}]  ${req.method} ${req.path}`)
   next()
}

// when any route will be hit this middle ware will create a log file in a specific folder


// root route
app.get('/',logger, (req: Request, res: Response) => {
   res.send('Hello Shoity Salary peye kemon lagche???')
})

// users route
app.post('/users', async (req: Request, res: Response) => {
   // console.log(req.body);
   const { name, email } = req.body;
   try {
      const result = await pool.query(`INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`, [name, email])
      console.log(result.rows[0])
      res.status(200).json({
         success: true, message: "User created Successfully", data: result.rows[0]
      })
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }

})
app.get('/users', async (req: Request, res: Response) => {
   try {
      const result = await pool.query(`SELECT * FROM users`)

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
})
app.get('/users/:id', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`SELECT * FROM users WHERE ID=$1`, [req.params.id])
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
})

app.put('/users/:id', async (req: Request, res: Response) => {
 const {name,email}=req.body
   try {
      const result = await pool.query(`UPDATE users SET name=$1 , email=$2 WHERE id=$3 RETURNING *`, [name,email,req.params.id])
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
})

app.delete('/users/:id', async (req: Request, res: Response) => {

   try {
      const result = await pool.query(`DELETE  FROM users WHERE ID=$1`, [req.params.id])
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
})

// todos route
app.post('/todos', async (req: Request, res: Response) => {
   // console.log(req.body);
   const { user_id, title } = req.body;
   try {
      const result = await pool.query(`INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`, [user_id, title])
      console.log(result.rows[0])
      res.status(200).json({
         success: true, message: "Todo created Successfully", data: result.rows[0]
      })
   } catch (err: any) {
      res.status(500).json({
         success: false, message: err.message
      })
   }

})

app.get('/todos', async (req: Request, res: Response) => {
   try {
      const result = await pool.query(`SELECT * FROM todos`)

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
})

//  Not found route
app.use((req: Request, res: Response) => {
   res.status(404).json({
      success:false,
      message:"Route Not Found",
      path:req.path
   })
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
