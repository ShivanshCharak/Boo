import React from 'react'
// import './styles.css'
import Boo from '../assets/boo_noBackground.png'
import { useNavigate } from 'react-router-dom'

function AuthLayout() {
    const nav = useNavigate()
  return (
    <div className='w-screen h-screen bg-bg overflow-hidden flex flex-col items-center justify-center '>
        {/* <h1 className=" neon-button">BOO</h1> */}
        <div className=' '>
            <img src={Boo} className=''  alt="" />
        </div>
        <div className='flex   w-[500px] justify-between'>

            <button onClick={()=>nav("/signin")} className='bg-green-700 px-10 rounded-lg py-4  text-black font-bold'>Signin</button>


            <button onClick={()=>nav("/signup")} className='bg-green-700 px-10 rounded-lg py-4  hover:co text-black font-bold'>Signup</button>
        </div>

    </div>
  )
}

export default AuthLayout
