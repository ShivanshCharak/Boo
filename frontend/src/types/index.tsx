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
