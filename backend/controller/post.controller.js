import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import { Post } from "../schemas/postSchema.js";
import { User } from "../schemas/userSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SavedPost } from "../schemas/SavedPostSchema.js";

export async function postCreator(req, res) {
  const { tags, caption, location } = req.body;

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

  if(!isSaved) throw new ApiError(404, "Not saved into db")
    res.json(200,"Created successFully")
}
export async function postSender(req,res){

const {id}=req.body

 let post = null

 if(id){
  post = await Post.findById(id)
 }else{
   post = await Post.find({})
 }
  if(!post){
    res.send(400,"Something went wrong file fetching the posts")
  }
  Object(post)

  res.send(new ApiResponse(post,200,"Successfully fetched"))
}
export async function getAllPost(req,res){
 try {
   const username  = req.body.username
   console.log(username)
   const post = await User.find({username})
   console.log(post)
   if(!post)  throw new ApiError(404,"Error occured while fetching")
     res.json(new ApiResponse(post,200,"Fetched successfully"))
   
 } catch (error) {
  throw new ApiError("Error while fetching the data for user details",error.message,404)
 }
}

export async function savePost(req, res) {
  try {
    const {user,_id,isSaved} = req.body
    const post = req.body
    Object.keys(post).forEach(key=>{
      console.log(post[key].user)
    })
    
    const isPresent = await SavedPost.find({user})
    // console.log(user)
    if(isPresent){
      console.log("inside",isPresent)

    }else{

      const updatedSavedPost = await SavedPost.findOneAndUpdate(
        { user:id },
        { $addToSet: { savedPost: { _id, isSaved } } },
        { upsert: true, new: true }
      );

    }
    // Update the SavedPost document to append to the savedPost array
    // res.status(200).json({ message: 'Post saved successfully', savedPost: updatedSavedPost.savedPost });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function getPostByThierUsername(req, res) {
  try {
    
    const { _id } = req.user; // Assuming req.user contains the user's ID

    const post = await SavedPost.findOne({ user: _id }); // Find posts by user's ID
  



    res.status(200).json({ post }); // Sending the post as a JSON response
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
