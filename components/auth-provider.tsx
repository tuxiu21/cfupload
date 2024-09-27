'use client'
import { verifySessionAction } from "@/app/action-cached";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type AuthContextType = {
  authInfo: { isAuth: boolean; username: string; };
  setAuthInfo: Dispatch<SetStateAction<{ isAuth: boolean; username: string; }>>;
};


export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {


  // const [isAuth, setIsAuth] = useState(false);
  // const [username, setUsername] = useState("");
  const [authInfo, setAuthInfo] = useState({isAuth:false,username:''})
  // 初次加载时，从cookie中获取
  useEffect(() => {
    init()
  }, []);
  const init=async ()=>{
    const authInfo=await verifySessionAction()
    setAuthInfo(authInfo)
  }


  return (
    <AuthContext.Provider value={{authInfo,setAuthInfo}}>
      {children}
    </AuthContext.Provider>
  );
}
const AuthContext = createContext<null|AuthContextType>(null)
export const useAuthInfo = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthInfo must be used within a AuthProvider");
  }
  return context;
}