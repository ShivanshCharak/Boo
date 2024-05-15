import React, { useEffect, useContext, useState } from "react";
import Sidebar from "../../components/shared/Sidebar";
import like from '../../../public/public/assets/icons/like.svg'
import liked from '../../../public/public/assets/icons/liked.svg'
import saved from '../../../public/public/assets/icons/saved.svg'
import save from '../../../public/public/assets/icons/save.svg'
import {Link} from 'react-router-dom'
import { AuthContext } from "../../utils/contexts/AuthContext";

function Home() {
  const [postData, setPostsData] = useState(null);
  const [isSaved,setIsSaved] = useState<boolean>(false)
  const [isLikes,setIsLiked] = useState<boolean>(false)
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/sendPosts", {
      method: "Post",
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
    .then(async (response) => {
      console.log(response); // Print the response object
      const res = await response.json();
      setPostsData(res.data);
    })
    .catch((err) => console.log(err.message));
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col overflow-scroll justify-start bg-dark-1  text-white">
      <div className="w-[62rem] mt-[5rem] mx-auto flex">
        <h1 className="font-black text-4xl">Home Feed</h1>
      </div>
      {postData &&
        postData.map((post) => {
          return (
            <div className="card rounded-3xl w-[1000px] mx-auto bg-dark-3 mt-10 p-10 border-2 border-dark-4 ">
              <div className="topBar flex flex-row justify-center items-center w-[600px] ">
                <div>
                  
                  <img src={post.avatar} className="w-20 rounded-full" alt="" />
                </div>
                <div className="flex flex-col ">
                  <h1 className="ml-[10px] font-black ">{post.user}</h1>
                  <div className="flex flex-row text-light-3">
                    <h1 className="mr-[10px] ml-2 ">{post.createdAt}</h1>
                    <h1> - {post.location}</h1>
                  </div>
                </div>

              </div>
              <div className="flex flex-col justify-center items-center">
                
                <div>
                  <h1 className="mb-3">{post.caption}</h1>
                  <Link to={`/postDetails/${post._id}`}>
                     <img className="w-[600px] h-auto rounded-3xl" src={post.post} alt="" />
                  </Link>
                  <div className="flex flex-row justify-between mt-10">
                    <img  onClick={()=>setIsLiked(prevState=> !prevState)} className="w-7 cursor-pointer" src={isLikes?liked:like} alt="" />
                    <img onClick={()=>setIsSaved(prevState=> !prevState)} className="w-7 cursor-pointer" src={isSaved?saved:save} alt="" />
                  </div>

                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Home;
