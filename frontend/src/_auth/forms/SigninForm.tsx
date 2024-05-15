import React from "react";
import { useFormik } from "formik";
import Boo from "../../assets/Boo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { useContext } from "react";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SigninForm() {
  const{currentUser,setCurrentUser}=useContext(AuthContext)
  const nav = useNavigate()
  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { handleChange, values, errors, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      fetch("http://localhost:3000/api/v1/auth/signin",{
        method:"POST",
        credentials:"include",
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify(values)
      }).then(async (response)=>{
        const res = await response.json()
        if(res.statusCode ===200){
          setCurrentUser(res.data.user)
          console.log(currentUser)
          nav("/home")
        }
      }
    ).catch(()=>console.log("error"))
    },
  });

  return (
    <div className="w-screen h-screen bg-dark-1 flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-96">
          <img src={Boo} alt="" />
          <h1 className="text-white text-4xl text-center">Login</h1>
          <p className="text-lg text-gray-400 text-center mt-5">
            Enter the details and start socializing
          </p>

          <label className="mt-4 text-2xl text-white" htmlFor="email">
            Email
          </label>
          <input
            autoComplete="off"
            className="bg-dark-4 mt-4 p-4 rounded-lg focus:outline-dashed text-white"
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />

          <label className="mt-4 text-2xl text-white" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="off"
            className="bg-dark-4 mt-4 p-4 rounded-lg focus:outline-dashed text-white"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            required
          />

          <button
            className="cursor-pointer text-black bg-neon-purple mt-10 p-4 rounded-lg focus:outline-dashed"
            type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SigninForm;
