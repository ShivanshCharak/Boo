import mongoose from 'mongoose';
import { User } from './userSchema';

const commentSchemaObject = new mongoose.Schema({
  text:{
    type:'String',
    required:true,
  },
  date:{
    type:Date,
    default:Date.now()
  } 
})

const CommentSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  comment:[commentSchemaObject]

})
export const Comment =  mongoose.model('Comment', CommentSchema)
