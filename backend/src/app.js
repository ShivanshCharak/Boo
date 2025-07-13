import Router from 'express'
import { User } from '../schemas/userSchema.js'
import express from 'express'
import cors from 'cors'
import authRouter from '../router/auth.router.js'
import uploadsRouter from '../router/uploads.router.js' 
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { updateAvatar } from '../controller/user.controller.js'
import verifyJwt from '../middlewares/verifyJwt.js'
import jwt from 'jsonwebtoken'
const app = Router()
import cookieParser from 'cookie-parser';
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
// public routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', authRouter);
app.get("/api/validate-session", validateSession)
export {app}

async function validateSession(req, res) {

  try {
 
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken)
    if (!refreshToken) throw new ApiError(401, "Unauthorized");

    const decoded =  await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    const user = await User.findById(decoded._id);
    console.log(user,user.refreshToken)
    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }
    
    const newAccessToken = await user.generateAccessToken();
    console.log("new accesstoken", newAccessToken)

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 mins
    });

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };

    return res.status(200).json(
      new ApiResponse(
        { user: userData, accessToken: newAccessToken },
        200,
        "Session validated"
      )
    );
  } catch (error) {
    // Clear cookies if validation fails
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    console.error(error)
    return res.status(401).json(new ApiError(401, "Session expired"));
  }
}

