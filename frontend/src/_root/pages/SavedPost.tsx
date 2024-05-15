import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from '../../utils/contexts/AuthContext';

function SavedPost() {
    const { currentUser } = useContext(AuthContext);
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/user/savedPost", {
            method: "get",
            headers: {
                "Authorization": `Bearer ${currentUser.accessToken}`
            }
        }).then(async (response) => {
            const res = await response.json();
            setPost(res.data);
        }).catch(err => console.log(err));
    }, []);

    return (
        <div>
            {post && (
                <>
                    {post.map(postItem => {
                        return (
                            <>
                                {console.log(postItem)}
                                {/* Render your postItem here */}
                            </>
                        );
                    })}
                </>
            )}
        </div>
    );
}

export default SavedPost;
