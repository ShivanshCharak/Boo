import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { useParams } from "react-router-dom";
import edit from "../../../public/public/assets/icons/edit.svg";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [isLikedClicked, setIsLikedClicked] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/getPost", {
      method: "Post",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify({ username: id }),
    }).then(async (response) => {
      const res = await response.json();
      setUserData(res.data[0]);
    });
  }, []);

  const handlePostClick = () => {
    setIsPostClicked(true);
    setIsLikedClicked(false); // Turn off Liked Post button
  };

  const handleLikedPostClick = () => {
    setIsLikedClicked(true);
    setIsPostClicked(false); // Turn off Posts button
  };

  return (
    <>
      {userData && (
        <div className="h-screen w-screen">
          <div className="grid grid-cols-4 max-w-[900px] mx-auto items-center">
            <div className="text-white col-span-3">
              <div className="flex items-center">
                <img
                  className="size-[200px] rounded-full"
                  src={userData.avatar}
                  alt=""
                />
                <div>
                  <h1 className="font-black text-4xl">{userData.username}</h1>
                  <h1 className="text-purple-700 mt-[10px] ml-[5px]">
                    @shortname
                  </h1>
                  <div className="flex mt-[20px] items-center">
                    <h1>
                      <span className="text-purple-700  mr-[3px]">0</span> post
                    </h1>
                    <h2>
                      <span className="text-purple-700 ml-[10px] mr-[3px]  ">
                        {Math.floor(Math.random() * 100)}
                      </span>{" "}
                      Followers
                    </h2>
                    <h2>
                      <span className="text-purple-700 ml-[10px] mr-[4px] text-purple-500">
                        {Math.floor(Math.random() * 100)}
                      </span>
                      Following
                    </h2>
                  </div>
                </div>
              </div>
              <div className="flex mt-10 w-[900px]">
                <div
                  onClick={handlePostClick}
                  className={`flex px-9 py-2 items-center rounded-lg cursor-pointer ${
                    isPostClicked ? "bg-dark-4" : ""
                  }`}
                >
                  <img
                    className="mr-2"
                    src="../../../public/public/assets/icons/posts.svg"
                    alt=""
                  />
                  <span>Posts</span>
                </div>
                <div
                  onClick={handleLikedPostClick}
                  className={`flex px-9 py-2 items-center rounded-lg ml-[20px] cursor-pointer ${
                    isLikedClicked ? "bg-dark-4" : ""
                  }`}
                >
                  <img
                    className="mr-2"
                    src="../../../public/public/assets/icons/like.svg"
                    alt=""
                  />
                  <span>Liked Post</span>
                </div>
              </div>
            </div>
            <div className="w-[180px] rounded-lg  px-5 py-2 bg-dark-4  text-white col-span-1 cursor-pointer flex items-center">
              <img
                className="size-[20px] mr-[20px]"
                src="../../../public/public/assets/icons/edit.svg"
                alt=""
              />
              <span className="font-black text-lg">Edit post</span>
            </div>
            <div className=" flex w-[1000px]  h-screen mx-auto">
              <div className="w-full text-white flex flex-col items-center justify-center">
                <img className="w-[200px] mt-[-200px]" src="../../../public/public/assets/icons/file-upload.svg" alt="" />
                <h1 className="font-black text-3xl text-light-3">No Post yet</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
