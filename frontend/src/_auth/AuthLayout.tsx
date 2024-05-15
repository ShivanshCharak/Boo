import React from 'react'
// import './styles.css'
import Boo from '../assets/boo_noBackground.png'
import { useNavigate } from 'react-router-dom'

function AuthLayout() {
    const nav = useNavigate()
  return (
    <div className='w-screen h-screen bg-bg'>
        {/* <h1 className=" neon-button">BOO</h1> */}
        <img src={Boo} className='ml-750 pt-200 '  alt="" />
        <div>
            <button onClick={()=>nav("/signup")} className='bg-green-700 px-10 rounded-lg py-4 mx-[540px] hover:co text-black'>Signup</button>
            <button onClick={()=>nav("/signin")} className='bg-green-700 px-10 rounded-lg py-4  text-black'>Signin</button>
        </div>

    </div>
  )
}

export default AuthLayout
