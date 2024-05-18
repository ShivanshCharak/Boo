import {mongoose , Schema} from 'mongoose'

const UserConnectionSchema = new Schema({
  userId:{
    type:Schema.Types.ObjectId,
    ref:User
  },
  followerId:{
    type:Schema.Types.ObjectId,
    ref:User,
  },
  followingId:{
    type:Schema.Types.ObjectId,
    ref:User,
  }
})
export const UserConnection = mongoose.Model('UserConnectionSchema',UserConnectionSchema)
