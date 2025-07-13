import React, { useState, useRef, ChangeEvent, useContext, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/contexts/AuthContext";
import svg from "../../assets/file-upload(1).svg";
import { UnAuthorize } from "../../utils/sessionToHook";
import { sessionToHook } from "../../utils/sessionToHook";
function CreatePost() {
  const nav = useNavigate()
  const fileInputRef = useRef(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [base64URL, setBase64URL] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef?.current?.click?.();
  };

  const initialValues = {
    caption: "",
    location: "",
    tags: "",
    file: File || undefined,
  };
  useEffect(() => {
    async function hydrate() {
      const current = await sessionToHook()                                            // STORING SESSION DATA TO HOOK
      setCurrentUser(current)
      const unvalid = await UnAuthorize()
      console.log(unvalid)
      if (unvalid) {
        nav("/")
      }
    }
    hydrate()
  },[])

  const convertToBase64 = async (file: File) => {
    const base64Data: string = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = (error) => reject(error);
    });
    setBase64URL(base64Data);
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("caption", values.caption);
      formData.append("location", values.location);
      formData.append("tags", values.tags);
      formData.append("post", values.file);
      console.log(formData)
      fetch("http://localhost:3000/api/v1/user/create-post", {
        method: "post",
        credentials:"include",
        body: formData,
      }).then(async (response) => {
        const res = await response.json()
        console.log(res.message)
        nav("/home")
      });
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      values.file = file;
      convertToBase64(file);
    }
  };

  return (
    <div className="col-span-10 h-screen overflow-scroll">

      <div className="bg-dark-1 w-[1620px] pt-[40px] p-[60px]  h-full text-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col"
          encType="multipart/formdata">
          <label htmlFor="caption">Caption</label>
          <input
            className="outline-green h-[100px] rounded-lg bg-dark-4 text p-5 "
            type="text"
            id="caption"
            name="caption"
            value={values.caption}
            onChange={handleChange}
          />

          <label htmlFor="location">Location</label>
          <input
            className="outline-green h-[50px] rounded-lg p-5 bg-dark-4"
            type="text"
            id="location"
            name="location"
            value={values.location}
            onChange={handleChange}
          />
          <div
            onClick={handleButtonClick}
            className="cursor-pointer  flex flex-col justify-center items-center w-[1500px] h-[500px] bg-dark-4 mt-5 rounded-lg">
            <input
              type="file"
              id="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
            {base64URL ? (
              <div className="w-[1500px] h-[25rem] bg-dark-4 rounded-lg mt-10 flex-col flex justify-center items-center">
                <img src={base64URL} className="w-[20rem] h-auto" alt="Preview" />
                <p className="mt-4 text-gray-400">Click to replace the image</p>
              </div>
            ) : (
              <>
                <img src={svg} className="size-[10rem]" alt="" />
                <button className="p-5 bg-dark-3 rounded-lg">
                  Select from computer
                </button>
                <span className="mt-5 text-gray-500">
                  SVG, PNG, JPEG is allows
                </span>
              </>
            )}
          </div>

          <label htmlFor="tags" className=" mt-5 mb-2">
            Add Tags (separated by commas "," )
          </label>
          <input
            className=" outline-green h-[100px] p-5 rounded-lg bg-dark-4"
            type="text"
            id="tags"
            name="tags"
            value={values.tags}
            onChange={handleChange}
          />

          <button

            className="hover:bg-green-400 rounded bg-green-600 mt-5 p-6"
            type="submit">
            Submit
          </button>


        </form>
      </div>
    </div>
  );
}

export default CreatePost;
