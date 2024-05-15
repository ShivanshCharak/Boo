import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../utils/contexts/AuthContext";

import { INITIAL_POST_VALUES, IPostData } from "../../types";

function PostDetails() {
  const [postData, setPostData] = useState<IPostData>(INITIAL_POST_VALUES);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/user/sendPosts`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
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
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]); // Include id in the dependency array

  return (
    <div className="w-screen  h-screen">
      {postData && (
        <div className="flex flex-col w-[1200px] text-white items-center  mx-auto">
          {/* <h1>{postData.location}</h1>
          <h1>{postData.caption}</h1>
          <h1>{postData.avatar}</h1>
          <h1>{postData.user}</h1>
          <h1>{postData.tags}</h1> */}
          {/* <h1>{postData.createdAt}</h1> */}
          <div className="imageWrapper flex flex-col items-center h-[450px] w-[500px] rounded-t-xl  mt-10 bg-dark-3">
            <img className="w-[460px] mt-3 rounded-lg" src={postData.post} alt="" />
          </div>
          <div className="flex py-10 px-2  items-center w-[500px] rounded-b-lg mt-[-10px] bg-dark-4">
            <div className="w-full ">
              <div className="flex items-center">
              <img src={postData.avatar} className="w-[60px]  rounded-lg " />
                <h1 className="font-black text-2xl mt-[-10px] ml-[10px]">{postData.user}</h1>
                
              </div>
                <div className="flex flex-row text-light-3">
                  <h1>{postData.createdAt } - </h1>
                  <h1> - {postData.location}</h1>

                </div>
                <div className="border-b-2 border-dark-3 mt-5">
                </div>
                  <div className="mt-2">
                    <p>{postData.caption}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-light-3">{postData.tags}</p>
                  </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
