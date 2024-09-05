import Navbar from "@/components/navbar";
import { ReactNode } from "react";

// 这个layout 用来包裹navbar 因为login不需要navbar 所以要独立开来
export default function Layout({auth,children}:{auth:ReactNode,children:ReactNode}){
  return (
    <>
      <Navbar></Navbar>
      {auth}
      {children}
    </>
  )
}