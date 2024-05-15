import React, { useContext, useEffect,useState } from "react";
import search from "../../../public/public/assets/icons/search.svg";
import filter from "../../../public/public/assets/icons/filter.svg";
import { AuthContext } from "../../utils/contexts/AuthContext";

function Explore() {
    const [postData,setPostData] = useState(null)
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/user/sendPosts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        })
        .then(async (response) => {
          console.log(response); // Print the response object
          const res = await response.json();
          console.log(res)
          setPostData(res.data);
        })
        .catch((err) => console.log(err.message));
      }, []);
  return (
    <div className="flex flex-col mt-[100px] ml-[400px] text-white">
      <div className="searchbar flex bg-dark-4 focus:outline-none rounded-md p-4 bg-dark-4 w-[1400px] ">
        <img src={search} className="size-[40px]" alt="" />
        <input
          type="text"
          className=" bg-dark-4 ml-[20px] focus:outline-none w-[1400px]"
        />
      </div>
      <div className="secondLayer flex justify-between mt-[20px]">
        <div className="font-black text-3xl">Popular today</div>
        <div className="flex items-center ">
          <p className="mr-[10px]">Filter</p>
          <img src={filter} alt="" />
        </div>
      </div>
      <div className="thirdGrid grid grid-cols-3">
        {postData &&(
          postData.map((post)=>{
            return (
            <>
            <div className="w-[400px] mt-10 ">
              <img src={post.post} className=" w-[400px] h-[390px] rounded-2xl object-cover" alt="" />
              <div className=" mt-[-70px] flex items-center ">
              <img src={post.avatar} className="w-[90px]" alt="" />
              <p className="mt-[-20px]">{post.user}</p>
              </div>
              
            </div>
            </>
          );

          })
        )}
      </div>
    </div>
  );
}

export default Explore
