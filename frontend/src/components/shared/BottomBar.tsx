import { bottombarLinks } from '@/constant'
import React from 'react'
import {Link,useLocation} from 'react-router-dom'

function BottomBar() {
  const {pathname} = useLocation()
  return (
    <section className='bottom-bar'>
       {bottombarLinks.map((link)=>{
          const isActive = pathname === link.route
          return(<>
          {/* <li> */}
            <Link  key={link.label} className={`${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition` } to={link.route} > 
            <img src={link.imgURL} width={16} height={16}className={` ${isActive && 'invert-white'}`} alt="" />
              <p className='tiny-medium text-light-2'>{link.label}</p>
            </Link>

          {/* </li> */}
          </>)})
        }
    </section>
  )
}

export default BottomBar