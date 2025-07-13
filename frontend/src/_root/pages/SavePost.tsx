import React,{useEffect,useContext, useState} from 'react'
import { AuthContext } from '../../utils/contexts/AuthContext'
function SavePost({id}) {
    const {currentUser}= useContext(AuthContext)
    const [id,setId] = useState<string>("")
    useEffect(()=>{
        fetch("http://localhost:3000/api/v1/user/savePost",{
            method:"post",
            credentials:"include",
            body:JSON.stringify({id:id})
        })
    })
  return (
<div className="grid grid-cols-4 max-w-[600px] mx-auto">
  <div className='text-white col-span-2'>h1</div>
  <div className='text-white col-span-2'>h2</div>
</div>


  )
}

export default SavePost
{/* <div>
         {userData && userData.map((post)=>{
             return(<>
             <div key={post._id} className="card rounded-3xl w-[1000px] mx-auto bg-dark-3 mt-10 p-10 border-2 border-dark-4">
            {console.log("post")}
              <div className="topBar flex flex-row justify-center items-center w-[600px]">
                <div>
                  <img src={post.avatar} className="w-20 rounded-full" alt="" />
                </div>
                <div className="flex flex-col">
                 
                    <h1 className="ml-[10px] font-black">{post.user}</h1>
                                   <div className="flex flex-row text-light-3">
                    <h1 className="mr-[10px] ml-2">{post.createdAt}</h1>
                    <h1> - {post.location}</h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>
                  <h1 className="mb-3">{post.caption}</h1>
                 
                    <img className="w-[600px] h-auto rounded-3xl" src={post.post} alt="" />
          
                  <div className="flex flex-row justify-between mt-10">
                    <img onClick={() => handleIsLiked(post._id)} className="w-7 cursor-pointer" src={post.isLiked ?"../../../public/public/assets/icons/liked.svg" : "../../../public/public/assets/icons/like.svg"} alt="" />
                    <img onClick={() => handleSavedPost(post._id)} className="w-7 cursor-pointer" src={post.isSaved ? "../../../public/public/assets/icons/saved.svg" : "../../../public/public/assets/icons/save.svg"} alt="" />
                  </div>
                </div>
              </div>
    //         </div> 
    //     </>   
    //     )})}
             // </div> */}
