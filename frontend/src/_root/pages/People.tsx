import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { ICurrentUser } from "../../types";

function People() {
  const { currentUser } = useContext(AuthContext);
  const [allUser, setAllUser] = useState<(ICurrentUser & { isFollowed: boolean })[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/user/allUsers", {
      method: "GET",
      headers: {
        authorization: `Bearer ${currentUser.accessToken}`,
      },
    }).then(async (response) => {
      const res = await response.json();
      const usersWithFollowStatus = res.data.map((user: ICurrentUser) => ({
        ...user,
        isFollowed: false, // Initialize follow status
      }));
      setAllUser(usersWithFollowStatus);
    });
  }, [currentUser.accessToken]);

  const handleFollowToggle = (userId: string) => {
    setAllUser((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId
          ? { ...user, isFollowed: !user.isFollowed }
          : user
      )
    );
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
