import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { ICurrentUser,IFollow } from "../../types";

function People() {
  const { currentUser } = useContext(AuthContext);
  const [follow,setFollow] = useState<IFollow>({followerId:currentUser._id as string,followingId:""})
  const [allUser, setAllUser] = useState<(ICurrentUser & { isFollowed: boolean })[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/allUsers", {
      method: "GET",
      credentials:"include"
    }).then(async (response) => {
      const res = await response.json();
      const usersWithFollowStatus = res.data.map((user: ICurrentUser) => ({
        ...user,
        isFollowed: false
      }));
      setAllUser(usersWithFollowStatus);
      
    });
  }, [currentUser.accessToken]);

  const handleFollowToggle = (userId: string) => {
    // if (!follow.followingList.includes(userId)){
      setFollow({
        ...follow,
        followingId:userId
      })
      console.log(follow)
      
      fetch("http://localhost:3000/api/v1/user/addfollower",{
        method:"POST",
        headers:{  
          'authorization': `Bearer ${currentUser.accessToken}`,
          'content-type': 'application/json'
        },
        body:JSON.stringify(follow)
      }).then(async(Response)=>{
        
      })
    // }
  };

  return (
    <div className="outer-main-container">
      <h1 className="people-feed-heading">All Users</h1>
      {allUser && (
        <>
          {allUser.map((user) => (
            <div key={user._id} className="user-card-outlay">
              <img className="user-avatar" src={String(user.avatar)} alt="" />
              <h1 className="user-username">{user.username}</h1>
              {user.isFollowed ? (
                <button
                  className="user-follow-button"
                  onClick={() => handleFollowToggle(user._id)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="user-follow-button"
                  onClick={() => handleFollowToggle(user._id)}
                >
                  Follow
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default People;
