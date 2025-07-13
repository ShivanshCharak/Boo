import React, { useState } from "react";
import { useFormik } from "formik";
import Boo from "../../assets/Boo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SigninForm() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  
  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  
  const { handleChange, values, errors, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      setIsLoading(true);
      fetch("http://localhost:3000/api/v1/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(values)
      })
      .then(async (response) => {
        const res = await response.json();
        console.log(res,"fkkl")
        if (res.statusCode === 200) {
          // console.log("userdata",userData)
          const userData = {
            _id: res.data.user._id,
            username: res.data.user.username,
            avatar: res.data.user.avatar || '',
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            shortName: res.data.user.username
          };
          
          setCurrentUser(userData); // ✅ Triggers re-render
          console.log("user",currentUser)
          // ✅ Use the same data directly
          sessionStorage.setItem("user", JSON.stringify(userData));
          
          console.log(currentUser)
          sessionStorage.setItem("user",JSON.stringify(currentUser))
          toast.success("Login successful! Redirecting...", {
            position: "top-center",
            autoClose: 2000,
            theme:"dark",
            
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => nav("/home"), 2000); // Wait for toast to show before navigating
        } else {
          {console.log(res)}
          toast.error(res.error || "Login failed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme:"dark",
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => setIsLoading(false));
    },
  });

  return (
    <div className="w-screen h-screen bg-dark-1 flex justify-center items-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
            className={`cursor-pointer text-black mt-10 p-4 rounded-lg focus:outline-dashed flex justify-center items-center ${
              isLoading ? "bg-gray-500" : "bg-neon-purple"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SigninForm;