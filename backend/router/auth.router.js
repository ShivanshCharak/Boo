import express from 'express';
import { signup,signin, logout, updateAvatar, getAllUsers } from '../controller/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import verifyJwt from '../middlewares/verifyJwt.js'
import { savePost, postCreator,postSender,getAllPost, getPostByThierUsername } from '../controller/post.controller.js';
import { getFollower, getFollowing, UserConnection } from '../controller/UserConnection.controller.js';



const router = express.Router();

router.post("/register", upload.fields([
  {
    name:"avatar",
    maxCount:1
  }
]) ,signup);
router.post("/signin", signin);
router.post("/logout",verifyJwt,logout);

// protected routes
router.post("/updateAvatar",verifyJwt,upload.fields([
  {
    name:'avatar',
    maxCount:1
  }
]),updateAvatar)
router.post("/create-post",verifyJwt,upload.fields([
 { name:'post',
  maxCount:1}
]),postCreator)
router.post("/sendPosts",verifyJwt,postSender) // details as well as explore and home page
router.get("/allUsers",getAllUsers) 
router.post("/getPost",getAllPost)// user-Details
router.post("/savedPost",verifyJwt,savePost) // saving post on the basis os saved
router.post("/getSaved",verifyJwt,getPostByThierUsername)  //getting saved post
router.post("/addfollower",UserConnection)  
router.post("/getFollower",getFollower)  
router.post("/getFollowing",getFollowing) 
// router.post("/remfollower",unFollow)  

export default router;
