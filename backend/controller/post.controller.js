import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import { Post } from "../schemas/postSchema.js";
import { User } from "../schemas/userSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export async function postCreator(req, res) {
  const { tags, caption, location } = req.body;
  console.log(tags,caption,location)
  if ([tags, caption, location].some((field) => field === ""))
    throw new ApiError(400, "tags,captions and location not given");
  const path = req.files?.post[0]?.path;
  if (!path) throw new ApiError(404, "Path doesnot exist of a file");
  const postUrl = await uploadOnCloud(path);
  const post= new Post({
    tags,
    caption,
    location,
    post:postUrl.url,
    user: req?.user?.username,
    avatar: req?.user?.avatar
  });
  
  const isSaved = await post.save()
  console.log(isSaved)
  if(!isSaved) throw new ApiError(404, "Not saved into db")
    res.json(200,"Created successFully")
}
export async function postSender(req,res){
  const post = await Post.find({})
  if(!post){
    res.send(400,"Something went wrong file fetching the posts")
  }
  Object(post)
  console.log(post)
  res.send(new ApiResponse(post,200,"Successfully fetched"))
}