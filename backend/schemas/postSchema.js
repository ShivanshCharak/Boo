import mongoose,{Schema} from "mongoose";
import { User } from "./userSchema.js";

const postSchema  = new Schema({
  post:{
    type:String,
    trim:true
  },
  caption:{
    type:String,
    trim:true,
    required:true,
  },
  location:{
    type:String,
    trim:true,
    required:true,
  },
  tags:{
    type:String,
    trim:true,
    required:true,
  },
  user:{
    type:String,
    ref:User
  },
  createdAt:{
    type:String,
    default: new Date().toLocaleDateString()
  },
  avatar:{
    type:String,
    ref:User,
  }
})

export const Post = mongoose.model("Post",postSchema)
