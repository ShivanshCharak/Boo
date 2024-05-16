import jwt from "jsonwebtoken";
import { User } from "../schemas/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
async function verifyJwt(req, res, next) {
 try {
   const accessToken =req.headers.authorization.split(" ")[1];

   const data = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

   if(!data) throw new ApiError(500,"Failed to verify")
   const foundedUser = await User.findById(data?._id).select("-password -accessToken");

   if (!foundedUser)
     throw new ApiError(403, "User not found access Token altered");
   req.user = foundedUser;
   
   next();
 } catch (error) {
    throw new ApiError(401,error?.message||"Invalud accessToken")
 }
}
export default verifyJwt
