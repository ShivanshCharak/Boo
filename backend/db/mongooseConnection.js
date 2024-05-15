import mongoose from 'mongoose'
async function mongooseConnection(){

  try {
    console.log("hey")
        const mongoConnection = await mongoose.connect(`${process.env.MONGO_DB}`)
        console.log(`Connected to ${mongoConnection.connection.host}`)
  } catch (error) {
    console.log("Mongodb connection failed",error)
    process.exit(1)
  }
}
export {mongooseConnection}
