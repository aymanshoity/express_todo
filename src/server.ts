import express, {  Request, Response } from 'express';
import config from './config';
import { initDB, pool } from './config/db';
import { logger } from './middleware';
import { userRoute } from './modules/user/user.routes';
const app = express()
const port = config.port


// parser
app.use(express.json())
// to send form data
// app.use(express.urlencoded())

// initialize DB
initDB()
// logger middleware



// when any route will be hit this middle ware will create a log file in a specific folder


// root route
app.get('/',logger, (req: Request, res: Response) => {
   res.send('Hello Shoity Salary peye kemon lagche???')
})

// users route
app.use('/users',userRoute)


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
