import React, { useEffect,useContext,useState } from 'react'
import Sidebar from '../../components/shared/Sidebar'
import { AuthContext } from '../../utils/contexts/AuthContext'
function Home() {
  const [postData,setPostsData] = useState(null)
  const {currentUser}=useContext(AuthContext)
  useEffect(()=>{
    fetch("http://localhost:3000/api/v1/user/sendPosts", {
      method: "get",
      headers: {
        "Authorization": `Bearer ${currentUser.accessToken}`
      }
    }).then(async (response) => {
      console.log(response); // Print the response object
      const res = await response.json();
      setPostsData(res.data)
      
    }).catch((err) => console.log(err.message));
    
  },[])
  return (
    <div className='w-screen h-screen bg-dark-1 text-white'>
      {postData && postData.map((post)=>{
        return(<div className=' '>
        
          <div className=' flex flex-row'>
            <div>
              <img src={post.avatar} alt="" />
            </div>
            <div>
          <h1>{post.username}</h1>
          <h1>{post.createdAt}</h1>
          <h1>{post.location}</h1>

            </div>
          </div>
          <h1>{post.caption}</h1>
          <img src={post.post} alt="" />
          
        </div>)
      })}
    </div>
  )
}

export default Home
