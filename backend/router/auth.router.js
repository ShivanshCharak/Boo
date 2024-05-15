import express from 'express';
import { signup,signin, logout, updateAvatar, getAllUsers } from '../controller/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import verifyJwt from '../middlewares/verifyJwt.js'
import { getSavedPost, postCreator,postSender } from '../controller/post.controller.js';



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
router.post("/sendPosts",postSender)
router.get("/allUsers",getAllUsers)
router.post("/savedPost",getSavedPost)


export default router;
