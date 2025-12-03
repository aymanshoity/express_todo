import express, {  Request, Response } from 'express';
import config from './config';
import { initDB, pool } from './config/db';
import { logger } from './middleware';
import { userRoute } from './modules/user/user.routes';
import { todoRoute } from './modules/todos/todos.routes';
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
app.use('/todos',todoRoute )



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
