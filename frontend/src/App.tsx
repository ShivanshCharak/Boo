import React from 'react'
import './global.css'
import {Routes,Route} from 'react-router-dom'
import SignupForm from './_auth/forms/SignupForm'
import SigninForm from './_auth/forms/SigninForm'
import AuthLayout from './_auth/AuthLayout'
import Home from './_root/pages/Home'
import RootLayout from './_root/RootLayout'
import CreatePost from './_root/pages/CreatePost'
import Explore from './_root/pages/Explore'
import PostDetails from './_root/pages/PostDetails'
import People from './_root/pages/People'
import SavedPost from './_root/pages/SavedPost'
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout/>}/>
        <Route path="/signup" element={<SignupForm/>}/>
        <Route path="/signin" element={<SigninForm/>}/>
        <Route element={<RootLayout/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path ="/explore" element={<Explore/>}/>
        <Route path="/People" element={<People/>}/>
        <Route path="/savedPost" element={<SavedPost/>}/>
        <Route path ="/postDetails/:id" element={<PostDetails/>}/>
        </Route>
    </Routes>
  )
}

export default App
