import Router from 'express'
import express from 'express'
import cors from 'cors'
import authRouter from '../router/auth.router.js'
import uploadsRouter from '../router/uploads.router.js' 
import { updateAvatar } from '../controller/user.controller.js'
const app = Router()

app.use(express.json())

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
// public routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authRouter);

export {app}

