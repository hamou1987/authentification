import express, { json } from "express"
import ConnectDB from "./Config/ConnectDB"
import userRouter from "./Route/User"
const app= express()
require('dotenv').config()

ConnectDB()
app.use(json())
app.use('/api/auth',userRouter)



app.listen(process.env.port,console.log('server is connected on port 5000'))