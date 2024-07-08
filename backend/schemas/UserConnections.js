import {mongoose , Schema} from 'mongoose'
import { User } from './userSchema.js'
const followers = new Schema({
  type:Schema.Types.Array,
})
const UserConnectionSchema = new Schema({
  followerId:{
    type:Schema.Types.ObjectId,
    ref:User,
  },
  followingId:{
    type:Schema.Types.ObjectId,
    ref:User,
    
  }
})
export const Connection = mongoose.model('Connection',UserConnectionSchema)
