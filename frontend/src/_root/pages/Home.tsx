import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { set, get, del } from 'idb-keyval';
import { IPostData } from "../../types";


function Home() {
  const [postData, setPostsData] = useState<IPostData[]>([]);
  const { currentUser,setCurrentUser } = useContext(AuthContext);
  const [topPosts, setTopPosts] = useState(postData);
{console.log(currentUser)}
  useEffect(() => {
    const userData  =  JSON.stringify(sessionStorage.getItem("user"))
    console.log(userData)
    
    // setCurrentUser(JSON.parse(userData))
    fetch("http://localhost:3000/api/v1/user/sendPosts", {
      method: "POST",
      credentials:"include"
    }).then(async (response) => {
      let res = await response.json();
      res = res.data;
      setPostsData(
        res.map((post: IPostData) => {
          return { ...post, isSaved: false, isLiked: false };
        })
      );
      setTopPosts(res.slice(0, 3));
    });
  }, []);



  function handleSavedPost(id: string): void {
    setPostsData((prevData: IPostData[]) => {
      return prevData.map((post: IPostData) => {
        if (post._id === id) {
          return { ...post, isSaved: !post.isSaved };
        } else {
          return post;
        }
      });
    });
    const savePost = async () => {
      await set('unsaved-post', postData); // save to local immediately
    
      // try {
      //   const res = await fetch('/api/save-post', {
      //     method: 'POST',
      //     body: JSON.stringify(postData),
      //   });
    
      //   if (res.ok) {
      //     await del('unsaved-post'); // remove local cache
      //     // showToast('Post saved!');
      //   } else {
      //     throw new Error('Failed to save');
      //   }
      // } catch (err) {
      //   console.error(err);
      //   // showToast('Post saved locally. Will retry.');
      // } finally {
      //   // setSaving(false);
      // }
    };
    savePost()
    
  }

  function handleIsLiked(id: string) {
    setPostsData((prevData) => {
      return prevData.map((post) => {
        if (post._id === id) {
          return { ...post, isLiked: !post.isLiked };
        } else {
          return post;
        }
      });
    });
  }

  return (
    <>
      <div className="outer-main-container">
        {/* <div className=""> */}
        <h1 className="heading">Home Feed</h1>
        {postData &&
          postData.map((post) => {
            return (
              <div key={post._id} className="card ">
                <div className="topBar">
                  <img src={post.avatar} className="w-20 rounded-full" alt="" />
                  <div className="post-details-container">
                    <Link to={`/user/${post.user}`}>
                      <h1 className="font-black">{post.user}</h1>
                    </Link>
                    <div className="flex flex-row text-light-3">
                      <h1 className="mr-2">{post.createdAt}</h1>
                      <h1> - {post.location}</h1>
                    </div>
                  </div>
                </div>
                <div className="ml-14 mb-8 mt-10">
                <p className="font-semibold mb-6">{post.caption}</p> 
                {post.tags?.split(",").map((val,index)=>(
                  <span className="text-xs  p-2 cursor-pointer hover:bg-zinc-600 bg-zinc-800 rounded-md ml-5  " key={index}># {val}</span>
                ))}                   
                </div>
                <div className="bottom-card-container ">
                  {/* <h1 className="mb-3 flex justify-start ">{post.caption}</h1> */}
                  <Link to={`/postDetails/${post._id}`}>
                    <img
                      className="w-[600px] h-auto rounded-3xl border border-zinc-500"
                      src={post.post}
                      alt=""
                    />
                  </Link>
                  <div className="lower-card-container">
                    <img
                      onClick={() => handleIsLiked(post._id || "")}
                      className="w-7 cursor-pointer"
                      src={
                        post.isLiked
                          ? "../../../public/public/assets/icons/liked.svg"
                          : "../../../public/public/assets/icons/like.svg"
                      }
                      alt="Like button"
                    />
                    <img
                      onClick={() => handleSavedPost(post._id || "")}
                      className="w-7 cursor-pointer"
                      src={
                        post.isSaved
                          ? "../../../public/public/assets/icons/saved.svg"
                          : "../../../public/public/assets/icons/save.svg"
                      }
                      alt="Save button"
                    />
                    
                  </div>
                </div>
              </div>
            );
          })}
        {/* </div> */}
      </div>
      <div className="col-span-3">
        <h2 className="heading">Top Posts</h2>
        {topPosts &&
          topPosts.map((post) => (
            <div key={post._id} className="mb-4 border border-zinc-800 p-3 rounded-lg">
              <Link to={`/postDetails/${post._id}`}>
                <img
                  className="w-full h-auto rounded-3xl"
                  src={post.post}
                  alt=""
                />
              </Link>
              <div className="flex items-center">
              <img className="w-[20px] h-[20px] mr-7 rounded-full" src={post.avatar} alt="" />
              <p className="text-light-3 text-xs mt-5">
                {post.user}
              </p>

              </div>
              <p className=" text-xs font-semibold text-slate-500">{post.createdAt}</p>
              <h3 className="font-bold mt-2 text-white">{post.caption}</h3>
              <p className="text-light-3">
                {post.caption}
              </p>
              {post.tags?.split(",").map((val,index)=>(
               <p key={index}>{val}</p>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
