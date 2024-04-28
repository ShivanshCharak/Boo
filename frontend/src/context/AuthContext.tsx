import React from 'react'
import { createContext,useContext,useEffect,useState } from 'react'
import {IUser} from "../types/index"
import { useNavigate } from 'react-router-dom'
export const INITIAL_USER={
    id:"",
    name:"",
    username:"",
    email:"",
    imageUrl:"",
    bio:''
}

const INITIAL_STATE={
    user:INITIAL_USER,
    isLoading:false,
    isAuthenticated:false,
    setUser:()=>{},
    setIsAuthenticated:()=>{},
    checkAuhUser:async()=>Promise<boolean>

}
type IContextType ={
  user:IUser,
  isLoading:boolean,
  setUser:React.Dispatch<React.SetStateAction<IUser>>,
  isAuthenticated:boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}
const AuthContext = createContext<IContextType>(INITIAL_STATE)

export function AuthProvider({children}:{children:React.ReactNode}){
  const navigate = useNavigate()
  const [user,setUser] = useState<IUser>(INITIAL_USER)
  const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false)
  const [isLoading,setIsLoading] = useState(false as boolean)
  const checkAuthUser = async ()=>{
    setIsLoading(true);
    try{
      fetch("http")

    }catch{

    }
  }
}

// export default AuthContext