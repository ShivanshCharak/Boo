import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    index:true
  },
  avatar:{
    type:String,
    default:"https://res.cloudinary.com/dnvjiudhd/image/upload/v1715711834/qy1nfrd18jjnnblhjjbw.svg"
  },
  password:{
    type:String,
    required:[true,"Password is required"],
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },
  refreshToken:{
    type:String
  },
  imageUrl:{
    type:String
  },
},{timestamps:true})

UserSchema.pre("save", async function(next){
  if(!this.isModified("password")) {
    return next()
  }
  this.password = await bcrypt.hash(this.password,10)
  next()
})
UserSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}
UserSchema.methods.generateAccessToken = async function(){
  return await jwt.sign({
    _id:this._id,
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:'10m'
  }
)
}
UserSchema.methods.generateRefreshToken = async function(){
  return await jwt.sign({
    _id:this._id,
    username: this.username,
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:'1d'
  }
)
}
export  const User = mongoose.model('User',UserSchema)

