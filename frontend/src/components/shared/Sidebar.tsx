import { useNavigate } from "react-router-dom";
import React, { ChangeEvent, useContext, useEffect} from "react";
import Boo from "../../assets/Boo.png";
import fileUpload from "../../assets/file-upload(1).svg";
import { useRef, useState } from "react";
import { AuthContext } from "../../utils/contexts/AuthContext";


function Sidebar() {
  let nav = useNavigate();
  const [initialRender,setIntitialRender] =useState(true)

  let avatarRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File|null>(null)
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState<string>(fileUpload);
  function handleLogout(): void {
    fetch("http://localhost:3000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`,
        contentType: "application/json",
      },
    
    })
      .then(async (response) => {
        nav("/signin");
      })
      .catch((err) => (err));
  }
  useEffect(() => {
    if (!initialRender && avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
   
  
      fetch("http://localhost:3000/api/v1/user/updateAvatar", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
        body: formData
      })
      .then(async (response) => {
          const res = await response.json();
          setCurrentUser(res.user)
        })
        .catch((err) => console.error(err));
    } else {
      setIntitialRender(false);
    }
  }, [avatarFile]);
  

  function handleUploadAvatar(): void {
    avatarRef.current?.click();
  }
  async function convertToBase64(data:File){
    const EncodedData:string = await new Promise((resolve,reject)=>{
      const fs  = new FileReader()
      fs.readAsDataURL(data)
      fs.onload=()=> resolve(fs.result as string)
      fs.onerror=(err)=>reject(err)
    })
    setAvatar(EncodedData)
  }
function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    const avatarFile = e.target.files?.[0];
    setAvatarFile(avatarFile)
    if(!avatarFile) return
    convertToBase64(avatarFile)
  }
  return (
    <div className="fixed sidebar max-w-[350px] h-screen bg-dark-3 text-white">
      <img src={Boo} className="w-40 mx-20 " alt="" />

      <div className="flex  max-w-50 ml-2 mt-10">
        <input
          type="file"
          ref={avatarRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div
          onClick={handleUploadAvatar}
          className="w-20 h-20 bg-dark-4 rounded-full flex place-content-center cursor-pointer">
          <img src={currentUser.avatar} width={20} height={20} className="w-20 rounded-full overflow-hidden" alt="" />
          
        </div>
        <div className="username-wrapper h-20">
          <div className="mt-3 ml-3 font-bold text-nowrap text-xl">
            {currentUser?.username}
          </div>
          <div className="ml-5 text-light-3">@scharak24</div>
        </div>
      </div>
      <div className=" p-5 navigation flex flex-col justify-between">
        <div
          onClick={() => nav("/home")}
          className="mt-10 ml-5  hover:bg-primary-600 p-5 hover:rounded-md cursor-pointer">
          {" "}
          <i className=" mr-2 fa-solid fa-house"></i> Home
        </div>
        <div
          onClick={() => nav("/explore")}
          className="mt-10 ml-5  hover:bg-primary-600 p-5 hover:rounded-md cursor-pointer ">
          <i className="mr-2 fa-brands fa-wpexplorer"></i>Explore
        </div>
        <div
          onClick={() => nav("/people")}
          className="mt-10 ml-5  hover:bg-primary-600 p-5 hover:rounded-md cursor-pointer ">
          <i className="mr-2 fa-solid fa-user"></i>People
        </div>
        <div
          onClick={() => nav("/saved")}
          className="mt-10 ml-5  hover:bg-primary-600 p-5 hover:rounded-md cursor-pointer">
          {" "}
          <i className="mr-2 fa-regular fa-floppy-disk"></i> Saved
        </div>
        <div
          onClick={() => nav("/create-post")}
          className="mt-10 ml-5  hover:bg-primary-600 p-5 hover:rounded-md cursor-pointer ">
          <i className="mr-2 fa-solid fa-image"></i>Create Post
        </div>
      </div>
      <div onClick={handleLogout} className="cursor-pointer">
        <i className="mt-20 mr-10 ml-10 cursor-pointer fa-solid fa-right-from-bracket"></i>
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
