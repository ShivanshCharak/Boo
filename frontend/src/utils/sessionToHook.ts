
export async function sessionToHook() {
    const userData = sessionStorage.getItem("user");
    console.log(userData)
    if (userData) {
        const user = await JSON.parse(userData);
        const updatedUser = {
            _id: user._id,
            username: user.username,
            avatar: user.avatar || '',
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            shortName: user.username
        };
        return updatedUser
       
    }
}
export async function UnAuthorize(){
    let data  = sessionStorage.getItem("user")
    if(data){
        const user = await JSON.parse(data as string)
        if(user.username===""){

            sessionStorage.clear()
            return true
        }
    }else{
        return true
    }
}