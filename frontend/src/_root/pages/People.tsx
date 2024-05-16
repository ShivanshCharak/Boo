import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";

function People() {
  const { currentUser } = useContext(AuthContext);
  const [allUser, setAllUser] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/allUsers", {
      method: "GET",
      headers: {
        authorization: `Bearer ${currentUser.accessToken}`,
      },
    }).then(async (response) => {
      const res = await response.json();
      setAllUser(res.data);
    });
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-col overflow-scroll bg-black">
        <h1 className="mt-[10rem] w-screen mx-auto font-black text-4xl text-white mb-[10px]">
          All Users
        </h1>
        {allUser && (
          <>
            {allUser.map((user) => {
              return (
                <div key={user.id} className="rounded-xl border border-light-3 flex flex-row p-3 items-center bg-dark-4 text-white mx-auto w-[1200px] mb-[20px]">
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
