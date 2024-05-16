import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/contexts/AuthContext";

function Home() {
  const [postData, setPostsData] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [topPosts, setTopPosts] = useState([]); // State for top posts

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/sendPosts", {
      method: "post",
      headers: {
        authorization: `bearer ${currentUser.accessToken}`,
      },
    }).then(async (response) => {
      let res = await response.json();
      res = res.data;
      setPostsData(
        res.map((post) => {
          return { ...post, isSaved: false, isLiked: false };
        })
      );
      // Assuming top posts are the first 3 posts for simplicity
      setTopPosts(res.slice(0, 3));
    });
  }, [currentUser.accessToken]);

  function handleSavedPost(id) {
    setPostsData((prevData) => {
      return prevData.map((post) => {
        if (post._id === id) {
          return { ...post, isSaved: !post.isSaved };
        } else {
          return post;
        }
      });
    });
  }

  function handleIsLiked(id) {
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
    <div className="w-screen h-screen flex flex-col overflow-scroll justify-start bg-dark-1 text-white">
      <div className="w-[90%] mt-[5rem] mx-auto flex">
        <div className="home-feed w-[65%]">
          <h1 className="font-black text-white ml-[300px] text-4xl mb-10">Home Feed</h1>
          {postData &&
            postData.map((post) => {
              return (
                <div
                  key={post._id}
                  className="card rounded-3xl ml-[260px] w-[700px] bg-dark-3 mt-10 p-10 border-2 border-dark-4">
                  <div className="topBar flex flex-row justify-start items-center">
                    <img src={post.avatar} className="w-20 rounded-full" alt="" />
                    <div className="flex flex-col ml-4">
                      <Link to={`/user/${post.user}`}>
                        <h1 className="font-black">{post.user}</h1>
                      </Link>
                      <div className="flex flex-row text-light-3">
                        <h1 className="mr-2">{post.createdAt}</h1>
                        <h1> - {post.location}</h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="mb-3">{post.caption}</h1>
                    <Link to={`/postDetails/${post._id}`}>
                      <img className="w-[600px] h-auto rounded-3xl" src={post.post} alt="" />
                    </Link>
                    <div className="flex flex-row justify-between mt-10 w-full">
                      <img
                        onClick={() => handleIsLiked(post._id)}
                        className="w-7 cursor-pointer"
                        src={
                          post.isLiked
                            ? "../../../public/public/assets/icons/liked.svg"
                            : "../../../public/public/assets/icons/like.svg"
                        }
                        alt="Like button"
                      />
                      <img
                        onClick={() => handleSavedPost(post._id)}
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
        </div>
        <div className=" fixed  ml-[1200px] top-posts-container w-[15%]">
          <h2 className="font-black text-2xl mb-4">Top Posts</h2>
          {topPosts && topPosts.map((post) => (
            <div key={post._id} className="top-post mb-4">
              <Link to={`/postDetails/${post._id}`}>
                <img className="w-full h-auto rounded-3xl" src={post.post} alt="" />
              </Link>
              <h3 className="font-bold mt-2">{post.caption}</h3>
              <p className="text-light-3">{post.user} - {post.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
