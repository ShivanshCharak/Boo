import { Connection } from "../schemas/UserConnections.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../schemas/userSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export async function UserConnection(req, res) {
  try {
    const { followerId, followingId } = req.body;

    if ([followerId, followingId].some((field) => field === undefined)) {
      return res
        .status(400)
        .json(new ApiError(400, "Follower and following list are required"));
    }

    const newConnection = new Connection({ followerId, followingId });
    console.log(newConnection);

    await newConnection.save();

    res.status(201).json({
      message: "User connection created successfully",
      data: newConnection,
    });
  } catch (error) {
    console.error("Error in UserConnection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getFollower(req, res) {
  const { id } = req.body;
  let followerList = new Array();
  const connectionList = await Connection.find({ followerId: id }).select(
    "-followerId -_id,-__v"
  );
  connectionList.map((data) => followerList.push(data.followingId));
  // let array  = followingList.map(obj=>obj.toString())
  let array2 = await Promise.all(
    followerList.map(async (id) => await User.findById(id).select('-password -createdAt -updatedAt'))
  );
  // array2.("-password -createdAt -updatedAt")
  res.json(new ApiResponse(array2,200,"Follower list extracted successfully"))
}
export async function getFollowing(req,res){
  const {id}= req.body
  let followingList = new Array()
  const connectionList = await Connection.find({followingId:id}).select("-followingId")
  console.log(connectionList)
  connectionList.map((data)=>followingList.push(data.followerId))
  let array2 = await Promise.all(
    followingList.map(async (id) => await User.findById(id).select('-password -createdAt -updatedAt'))
  );
  console.log(array2)
  // array2.("-password -createdAt -updatedAt")
  res.json(new ApiResponse(array2,200,"Follower list extracted successfully"))
}
