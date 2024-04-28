import React from 'react'
import SigninFrom from './_auth/forms/SigninFrom'
import SignupForm from './_auth/forms/SignupForm'
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages/index'

// impor
import './globals.css'
import {Routes,Route} from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
const App = () => {
  return (
    <main className="flex h-screen">
        <Routes>
            <Route element={<AuthLayout/>}>
            {/* Public routes */}
                <Route path='/sign-in' element={<SigninFrom/>}/>
                <Route path='/sign-up' element={<SignupForm/>}/>

             {/* Public routes */}

            </Route>
            <Route element={<RootLayout/>}>
                <Route index element={<Home/>}/>
                <Route path='/explore' element={<Explore/>}/>
                <Route path='/saved' element={<Saved/>}/>
                <Route path='/all-users' element={<AllUsers/>}/>
                <Route path='/create-post' element={<CreatePost/>}/>
                <Route path='/update-post/:id' element={<EditPost/>}/>
                <Route path='posts/:id' element={<PostDetails/>}/>
                <Route path='/profile/:id/*' element={<Profile/>}/>
                <Route path='update-profile/:id' element={<UpdateProfile/>}/>

            </Route>

        </Routes>
    </main>
  )
}

export default App