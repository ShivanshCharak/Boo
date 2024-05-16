import React, { useState, useEffect, useContext } from 'react';
import {AuthContext} from '../../utils/contexts/AuthContext';

function SavedPost() {
    const { currentUser } = useContext(AuthContext);
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/user/getSaved", {
            method: "post",
            headers: {
                "authorization": `Bearer ${currentUser.accessToken}`
            }
        }).then(async (response) => {
            const res = await response.json();
            setPost(res);
            console.log(res.data)
        }).catch(err => console.log(err));
    }, []);

    return (
        <div>
            {console.log("hey")}

        </div>
    );
}

export default SavedPost;
