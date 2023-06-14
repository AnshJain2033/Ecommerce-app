import express from 'express'
import dotenv from 'dotenv'
import colors  from 'colors'
import morgan  from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
dotenv.config()

//rouutes
app.use('/api/v1/auth',authRoutes)
//connect db

//rest object
const app=express()
//use of middlewares
app.use(express.json())
app.use(morgan('dev'))

connectDB();
//rest api calling
const PORT = process.env.PORT||8080
app.get("/",(req,res)=>{
    res.send("<h1>HELLO</h1>")
})
app.listen(PORT,()=>{
    console.log("server setup done".bgGreen.black)
})