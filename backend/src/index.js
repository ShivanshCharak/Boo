import {app} from './app.js'
import dotenv from 'dotenv'
import express from 'express'
import { mongooseConnection } from '../db/mongooseConnection.js';
// app.use(express.json({limit}))

dotenv.config({
  url:"./env"
})


await mongooseConnection().then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log("Listiening to port",process.env.PORT)
  })
})
