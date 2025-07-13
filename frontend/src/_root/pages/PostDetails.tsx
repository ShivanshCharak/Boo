import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../utils/contexts/AuthContext";

import { INITIAL_POST_VALUES, IPostData } from "../../types";
import { sessionToHook } from "../../utils/sessionToHook";
import { UnAuthorize } from "../../utils/sessionToHook";

function PostDetails() {
  const [postData, setPostData] = useState<IPostData>(INITIAL_POST_VALUES);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [comment, setComment] = useState<String>("");
  const [commentArray, setCommentArray] = useState<String[]>([""]);
  const { id } = useParams();
  const nav = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/user/sendPosts`,
          {
            method: "POST",
            credentials:"include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }), // Send id as JSON object
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const res = await response.json();
        setPostData(res.data);
         async function hydrate() {
                    const current = await sessionToHook()                                            // STORING SESSION DATA TO HOOK
                    setCurrentUser(current)
                    const unvalid = await UnAuthorize()
                    if (unvalid) {
                      nav("/")
                    }
                  }
                  hydrate()
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]); // Include id in the dependency array

  function handleSubmit() {
    if (comment.trim()) {
      setCommentArray([...commentArray, comment]);
      setComment("");
    }
  }
  return (
    <div className="w-[83vw]  h-screen overflow-y-auto">
      {postData && (
        <div className="grid grid-cols-8 gap-10 text-white items-center  mx-auto">
          {/* <h1>{postData.location}</h1>
          <h1>{postData.caption}</h1>
          <h1>{postData.avatar}</h1>
          <h1>{postData.user}</h1>
          <h1>{postData.tags}</h1> */}
          {/* <h1>{postData.createdAt}</h1> */}
          <div className="imageWrapper flex flex-col items-center col-span-6 h-[100%] rounded-t-xl  mt-10 bg-dark-3">
            <img
              className="w-[80%] mt-3 rounded-lg"
              src={postData.post}
              alt=""
            />
          </div>
          <div className="flex px-5 p-10 h-[100%] col-span-2 rounded-b-lg mt-[-10px] bg-dark-4">
            <div className="w-full  ">
              <div className="flex items-center">
                <img src={postData.avatar} className="w-[60px]  rounded-lg " />
                <h1 className="font-black text-2xl mt-[-10px] ml-[10px]">
                  {postData.user}
                </h1>
              </div>
              <div className="flex flex-row text-light-3">
                <h1>{postData.createdAt} - </h1>
                <h1> - {postData.location}</h1>
              </div>
              <div className="mt-5"></div>
              <div className="mt-2">
                <p>{postData.caption}</p>
              </div>
              <div className="mt-2 border-b-2 border-[#2f3336]">
                <p className="text-light-3 mb-[10px]">#{postData.tags}</p>
              </div>
              <div className="flex justify-around p-5 border-b-2 border-[#2f3336]">
                <i className="fa-solid fa-comment"></i>
                <span> &hearts;</span>
                <i className="fa-regular fa-bookmark"></i>
              </div>
              <div className="p-2 flex mt-5 justify-evenly border-b-2  border-[#2f3336]">
                <img
                  className="rounded-full w-[50px] ml-[-20px]"
                  src={currentUser.avatar}
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="text-white text-black p-2 bg-inherit w-[200px] focus:outline-none"
                />
                <button
                  className=" px-5 bg-purple-700 rounded-xl  "
                  onClick={handleSubmit}>
                  Reply
                </button>
              </div>
              <div className="my-10 ">
                {commentArray.map((comment, index) => (
                  <div className=" flex flex-col  mt-3 border-b-2 border-[#2f3336]">
                    <div className="flex">
                      <img
                        className=" mt-2 rounded-full w-[50px] h-[50px] mb-10 bg-cyan-600"
                        src={currentUser.avatar}
                      />
                      <div className="flex flex-col mt-2">
                        <div className="flex">
                          <div className="font-black ml-4">
                            {currentUser.username}
                          </div>
                          <div className="text-gray-500 ml-1">@shivanshcharak</div>
                        </div>
                        <div className="px-2 mb-5" key={index}>
                          {comment}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
