import mongoose,{Schema} from "mongoose";
import { User } from "./userSchema.js";
import { Post } from "./postSchema.js";

const savedPost  = new Schema({
  savedPost:[
    {
      postId:{
        type:Schema.Types.ObjectId,
        ref:'POST'
      },
      isSaved:{
        type:Boolean,
        required:true
      }
    }
  ],
  user:{
    type:String,
    ref:User
  }
  
})
export const SavedPost = mongoose.model("SavedPost",savedPost)
