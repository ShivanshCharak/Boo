import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Boo from '../../assets/Boo.png';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupForm() {
  const nav = useNavigate()
  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      fetch("http://localhost:3000/api/v1/auth/register",{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify(values)
      }).then(async response=>{
       const res = await response.json();
       console.log(res)
       nav("/signin")
      })
    }
  });

  return (
    <div className='w-screen h-screen bg-dark-1 flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col w-96'>
        <img src={Boo} alt="Boo" />
        <h1 className='text-white text-4xl text-center'>Create your Account</h1>
        <p className='text-lg text-gray-400 text-center mt-5'>Enter the details and start socializing</p>

        <label className="mt-4 text-2xl text-white" htmlFor="username">Username</label>
        <input
          autoComplete='off'
          className='bg-dark-4 mt-4 p-4 rounded-lg focus:outline-dashed text-white'
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={values.username}
          required
        />
        {errors.username && touched.username && <div className="text-red">{errors.username}</div>}

        <label className="mt-4 text-2xl text-white" htmlFor="password">Password</label>
        <input
          autoComplete='off'
          className='bg-dark-4 mt-4 p-4 rounded-lg focus:outline-dashed text-white'
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={values.password}
          required
        />
        {errors.password && touched.password && <div className="text-red">{errors.password}</div>}

        <label className="mt-4 text-2xl text-white" htmlFor="confirmPassword">Confirm Password</label>
        <input
          autoComplete='off'
          className='bg-dark-4 mt-4 p-4 rounded-lg focus:outline-dashed text-white'
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          value={values.confirmPassword}
          required
        />
        {errors.confirmPassword && touched.confirmPassword && <div className="text-red">{errors.confirmPassword}</div>}

        <label className="mt-4 text-2xl text-white" htmlFor="email">Email</label>
        <input
          autoComplete='off'
          className='bg-dark-4 mt-4 p-4 rounded-lg focus:outline-dashed text-white'
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={values.email}
          required
        />
        {errors.email && touched.email && <div className="text-red">{errors.email}</div>}

        <button className='cursor-pointer text-black bg-neon-purple mt-10 p-4 rounded-lg focus:outline-dashed' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignupForm;
