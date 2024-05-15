import { ReactNode, SetStateAction, createContext,useState } from "react";
import { IPostContext, IPostData } from "../../types";

const Initial_Values={
    post:"",
    caption:"",
    location:"",
    user:"",
    tags:"",
    createdAt:""
}

export const PostContext = createContext<IPostContext>({postData:Initial_Values,setPostData:()=>{}})
export function PostContextProvider({children}:{children:ReactNode}){
    const [postData,setPostData] = useState<IPostData>(Initial_Values)
    return (
    <PostContext.Provider value={{postData,setPostData}}>
        {children}
    </PostContext.Provider>)
}
