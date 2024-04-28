import React from 'react'
import { Link,NavLink,useLocation } from 'react-router-dom'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { sidebarLinks } from '@/constant'
import { INavLink } from '@/types'
// import { LogOut } from 'lucide-react'
// import img from '../../../public/assets/images/logo.svg'
function LeftSideBar() {
  const {pathname} = useLocation()
  const {toast} = useToast()
  const nav = useNavigate()
  async function Logout(){
    try{
     await fetch("http://localhost:3000/auth/logout",{
        method:"GET"
      }).then(async Response=>{
        console.log("Triggered"
          )
        const res  = await Response.json()
        toast({
          description:res.message
        })
        nav(0) 
      })    

    }catch{
      console.error("error during logout")
    }
  }
  return (
   <nav className="leftsidebar">
    <div className="flex flex-col gap-11">
    
      <Link to="/" className="flex gap-3 items-center">
        <img src="/assets/images/logo.svg" width={170} height={36} alt="" />
      </Link>
      <Link to="profile/userid" className="flex gap-3 items-center">
        <img src="/assets/images/profile.png" alt="" className="h-14 w-14 rounded-full" />
        <div className="flex flex-col">
          <p className="body-bold">
            Shivansh Charak
          </p>
          <p className="small-regular text-light-3">
            @shivansh
          </p>
        </div>
      </Link>
      <ul className='flex flex-col gap-6'>
        {sidebarLinks.map((link:INavLink)=>{
          const isActive = pathname === link.route
          return(<>
          <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
            <NavLink to={link.route} className="flex gap-4 items-center p-4"> 
            <img src={link.imgURL} className={`group-hover:invert-white ${isActive && 'invert-white'}`} alt="" />
              {link.label}
            </NavLink>

          </li>
          </>)})
        }
        
      </ul>
    </div>
    <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => Logout()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
          </Button>
   </nav>
  )
}

export default LeftSideBar