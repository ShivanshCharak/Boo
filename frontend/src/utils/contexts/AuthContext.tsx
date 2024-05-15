import { ReactNode, createContext, useState } from "react";
import { IAuthContextProvider, ICurrentUser } from "../../types";

const INITIAL_USER: ICurrentUser = {
    username: "",
    refreshToken: "",
    accessToken: "",
    avatar: "", // This could be a string or a URL, so the type is fine
    shortName: ""
};


export const AuthContext = createContext<IAuthContextProvider>({currentUser:INITIAL_USER,setCurrentUser:()=>{}})
// Create the context provider component
export function AuthContextProvider({ children }:{children:ReactNode}) {
    const [currentUser, setCurrentUser] = useState<ICurrentUser>(INITIAL_USER);
    
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
}
