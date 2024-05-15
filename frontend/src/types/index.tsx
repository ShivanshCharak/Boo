export type ICurrentUser={
    username:string,
    refreshToken:string,
    accessToken:string,
    avatar:string|URL,
    shortName:string
}

export type IAuthContextProvider={
    currentUser:ICurrentUser,
    setCurrentUser:React.Dispatch<React.SetStateAction<ICurrentUser>>

}
export type IPostData={
    post:string,
    caption:string,
    location:string,
    user:string,
    tags:string,
    createdAt:string,
    avatar:string
}
export type IPostContext={
    postData:IPostData,
    setPostData:React.Dispatch<React.SetStateAction<IPostData>>

}
export const INITIAL_POST_VALUES={
    post:"",
    caption:"",
    location:"",
    user:"",
    tags:"",
    createdAt:"",
    avatar:""
}
