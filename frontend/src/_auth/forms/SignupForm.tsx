import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Boo from '../../assets/Boo.png';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupForm() {
  const { setCurrentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  
  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values)
      });

      const res = await response.json();
      console.log("Signup Response:", res);

      if (!response.ok) {
        throw new Error(res.message || 'Registration failed');
      }

      if (res.success && res.data) {
        // Handle both possible response structures
        const userData = res.data.user ;
       console.log(res.data,userData._id,userData.username, userData.avatar,userData.accessToken) 
        // Set user with all required fields
        setCurrentUser({
          _id: userData._id,
          username: userData.username,
          avatar: userData.avatar || '',
          accessToken: res.accessToken,
          // refreshToken: userData.refreshToken
        });

        toast.success('Account created successfully!', {
          theme: 'dark',
          autoClose: 2000,
        });

        // Wait for state to update and toast to show
        setTimeout(() => nav("/home"), 2000);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      toast.error(error.message || 'An error occurred. Please try again.', {
        theme: 'dark'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className='w-screen h-screen bg-dark-1 flex justify-center items-center'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <form onSubmit={handleSubmit} className='flex flex-col w-96'>
        <img src={Boo} alt="Boo" className='mx-auto w-32 h-32' />
        <h1 className='text-white text-4xl text-center mt-4'>Create your Account</h1>
        <p className='text-lg text-gray-400 text-center mt-2 mb-6'>
          Enter the details and start socializing
        </p>

        <div className='mb-4'>
          <label className="block text-white text-sm font-medium mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={handleChange}
            value={values.username}
            disabled={isLoading}
            className={`w-full p-3 rounded-lg bg-dark-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.username && touched.username ? 'border border-red-500' : ''
            }`}
          />
          {errors.username && touched.username && (
            <p className="mt-1 text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className="block text-white text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={values.email}
            disabled={isLoading}
            className={`w-full p-3 rounded-lg bg-dark-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.email && touched.email ? 'border border-red-500' : ''
            }`}
          />
          {errors.email && touched.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className="block text-white text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={values.password}
            disabled={isLoading}
            className={`w-full p-3 rounded-lg bg-dark-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.password && touched.password ? 'border border-red-500' : ''
            }`}
          />
          {errors.password && touched.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div className='mb-6'>
          <label className="block text-white text-sm font-medium mb-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={values.confirmPassword}
            disabled={isLoading}
            className={`w-full p-3 rounded-lg bg-dark-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.confirmPassword && touched.confirmPassword ? 'border border-red-500' : ''
            }`}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-colors ${
            isLoading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <a href="/signin" className="text-purple-500 hover:text-purple-400 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;