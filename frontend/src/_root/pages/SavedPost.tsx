import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../utils/contexts/AuthContext';
import { get } from 'idb-keyval';
import { FiBookmark, FiHeart, FiMessageSquare, FiMoreHorizontal } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { sessionToHook, UnAuthorize } from '../../utils/sessionToHook';
import { useNavigate } from 'react-router-dom';

function SavedPost() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate()

    function handleHover(index:number){
        console.log(index)
    }
    useEffect(() => {
        async function getData() {
            try {
                const unsavedPosts = await get("unsaved-post");
                if (unsavedPosts) {
                    setPosts(unsavedPosts);
                }
                const current = await sessionToHook()                                            // STORING SESSION DATA TO HOOK
                setCurrentUser(current)
                const unvalid = await UnAuthorize()
                if(unvalid){
                    nav("/")
                }
               
            } catch (error) {
                console.error("Error loading saved posts:", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-[80vw] mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="flex items-center mb-8">
                <div className="mr-6">
                    {currentUser.avatar ? (
                        <img 
                            src={currentUser.avatar} 
                            alt={currentUser.username} 
                            className="w-24 h-24 rounded-full object-cover border-2 border-white"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-white text-2xl font-bold">
                            {currentUser.username.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">{currentUser.username}</h1>
                    <div className="flex items-center mt-2">
                        <FiBookmark className="text-gray-400 mr-2" />
                        <span className="text-gray-400 font-medium">
                            {posts.length} {posts.length === 1 ? 'Saved Post' : 'Saved Posts'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-zinc-700 pt-6">
                {posts.length === 0 ? (
                    <div className="text-center py-20">
                        <FiBookmark className="mx-auto text-gray-500 text-4xl mb-4" />
                        <h3 className="text-xl font-semibold text-gray-300">No Saved Posts Yet</h3>
                        <p className="text-gray-500 mt-2">When you save posts, they'll appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {/* SAVED CARDS LOOP */}
                        {posts.map((post, index) => (
  <div
    key={post._id || index}
    className="bg-zinc-900 text-white rounded-lg overflow-hidden shadow border border-zinc-800"
  >
    {/* Header */}
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-2">
        {post.avatar ? (
          <img
            src={post.avatar}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
            {post.username?.charAt(0).toUpperCase() || 'U'}
          </div>
        )}
        <span className="text-sm font-semibold">{post.user || 'Unknown'}</span>
      </div>
      <FiMoreHorizontal className="text-gray-400 hover:text-white cursor-pointer" />
    </div>

    {/* Image */}
    <div className="w-full h-[300px] bg-black">
      <img
        src={post.post}
        alt={post.caption || 'Saved Post'}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Action Icons */}
    <div className="flex items-center gap-4 px-3 py-2 text-white text-xl">
      <FiHeart className="cursor-pointer hover:scale-110 transition" />
      <FiMessageSquare className="cursor-pointer hover:scale-110 transition" />
      <FiBookmark className="ml-auto cursor-pointer hover:scale-110 transition" />
    </div>

    {/* Caption */}
    <div className="px-3 pb-2 text-sm">
      <span className="font-semibold">{post.user || 'Unknown'}</span>{" "}
      {post.caption || "Untitled Post"}
    </div>

    {/* Tags */}
    {post.tags && (
      <div className="px-3 pb-1 text-sm text-blue-400">
        {post.tags.split(',').map((tag, i) => (
          <span key={i} className="mr-2">
            #{tag.trim()}
          </span>
        ))}
      </div>
    )}

    {/* Time */}
    <div className="px-3 pb-3 text-xs text-gray-500">
      {post.createdAt
        ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
        : 'Unknown date'}
    </div>
  </div>
))}



                    </div>
                )}
            </div>
        </div>
    );
}

export default SavedPost;