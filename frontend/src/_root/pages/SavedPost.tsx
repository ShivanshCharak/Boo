import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../utils/contexts/AuthContext';
import { get } from 'idb-keyval';
import { FiBookmark, FiHeart, FiMessageSquare, FiMoreHorizontal } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

function SavedPost() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const unsavedPosts = await get("unsaved-post");
                if (unsavedPosts) {
                    setPosts(unsavedPosts);
                }
                
                const userData = sessionStorage.getItem("user");
                if (userData) {
                    const user = JSON.parse(userData);
                    const updatedUser = {
                        _id: user._id,
                        username: user.username,
                        avatar: user.avatar || '',
                        accessToken: user.accessToken,
                        refreshToken: user.refreshToken,
                        shortName: user.username
                    };
                    setCurrentUser(updatedUser);
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
        <div className="w-[70vw] mx-auto px-4 py-8">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 group">
                        {posts.map((post, index) => (
                            <div key={index} className="relative bg-zinc-900 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                                {/* Post Image */}
                                <div className="relative pb-[100%] bg-gray-700">
                                    <img 
                                        src={post.post} 
                                        alt={post.caption || 'Saved post'} 
                                        className="absolute h-full w-full object-cover hover:scale-140"
                                    />
                                </div>
                                
                                {/* Post Details */}
                                <div className="p-4 absolute bottom-0 bg-zinc-950/80 w-full  translate-y-[200px] group-hover:translate-y-0 duration-500 transition-all">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center">
                                            {post.avatar ? (
                                                <img 
                                                    src={post.avatar} 
                                                    alt="Post author" 
                                                    className="w-8 h-8 rounded-full mr-2"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-xs font-bold mr-2">
                                                    {post.username?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                            )}
                                            <span className="font-semibold text-white">{post.user || 'Unknown'}</span>
                                        </div>
                                        <button className="text-gray-400 hover:text-white">
                                            <FiMoreHorizontal />
                                        </button>
                                    </div>
                                    
                                    <p className="text-white mb-3 line-clamp-2">{post.caption}</p>
                                    
                                    {post.tags && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {post.tags.split(',').map((tag, i) => (
                                                <span key={i} className="text-xs bg-gray-700 text-slate-200 px-2 py-1 rounded">
                                                    #{tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center">
                                                <FiHeart className="mr-1" /> {post.isLiked ? 'Liked' : '0'}
                                            </span>
                                            <span className="flex items-center">
                                                <FiMessageSquare className="mr-1" /> 0
                                            </span>
                                        </div>
                                        <span>
                                            {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : 'Unknown date'}
                                        </span>
                                    </div>
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