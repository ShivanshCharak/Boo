import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { IPostData } from "../../types";

function Explore() {
  const [postData, setPostData] = useState<IPostData[]>([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/sendPosts", {
      method: "POST",
      headers: {
        authorization: `Bearer ${currentUser.accessToken}`,
      },
    })
      .then(async (response) => {
        console.log(response); // Print the response object
        const res = await response.json();
        console.log(res);
        setPostData(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div className="explore-container">
      <div className="searchbar-div ">
        <img
          src="../../../public/public/assets/icons/search.svg"
          className="size-[40px]"
          alt=""
        />
        <input type="text" className="searchbar-input" />
      </div>
      <div className="second-layer">
        <div className="font-black text-3xl">Popular today</div>
        <div className="flex items-center ">
          <p className="mr-[10px]">Filter</p>
          <img src="../../../public/public/assets/icons/filter.svg" alt="" />
        </div>
      </div>
      <div className="thirdGrid w-[1400px] grid grid-cols-3">
        {postData &&
          postData.map((post) => {
            return (
              <>
                <div className="w-[400px] mt-10 ">
                  <img
                    src={post.post}
                    className=" w-[400px] h-[390px] rounded-2xl object-cover"
                    alt=""
                  />
                  <div className=" mt-[-70px] flex items-center ">
                    <img src={post.avatar} className="w-[90px]" alt="" />
                    <p className="mt-[-20px]">{post.user}</p>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Explore;
