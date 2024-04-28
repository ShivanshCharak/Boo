import React from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
// import { LogOut } from 'lucide-react'
// import img from '../../../public/assets/images/logo.svg'
function Topbar() {
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
    <section className="top-bar">
        <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
        <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => Logout()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile`} className="flex-center gap-3">
            <img src={'/assets/images/profile.png'}  className="h-8 w-8 rounded-full" alt="" />
          </Link>
        </div>
        
        </div>
    </section>
  )
}

export default Topbar