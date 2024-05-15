import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
// import { useContext } from 'react'
function People() {
  const { currentUser } = useContext(AuthContext);
  const [allUser, setAllUser] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/allUsers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
    }).then(async (response) => {
      const res = await response.json();

      setAllUser(res.data);
    });
  }, []);
  return (
    <>
      <div className="w-screen h-screen">
        <h1 className="mt-[10rem] w-[75rem] mx-auto font-black text-4xl text-white mb-[10px]">
          All Users
        </h1>
        {allUser && (
          <>
            {allUser.map((user) => {
              return (
                <div className=" rounded-xl border border-light-3 flex flex-row p-3 items-center bg-dark-4 text-white mx-auto w-[1200px] mb-[20px]">
                  <img
                    className="object-fit size-[100px] rounded-full"
                    src={user.avatar}
                    alt=""
                  />
                  <h1 className="size-[20px] mt-[-40px] ml-[10px] font-black text-xl">
                    {user.username}
                  </h1>
                  <button className="ml-[55rem] bg-neon-purple rounded-lg px-8 cursor-pointer py-3">
                    Follow
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

export default People;
