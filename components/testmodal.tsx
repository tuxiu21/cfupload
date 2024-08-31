'use client'

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function TestModal({children}:{children:ReactNode}){
  const router=useRouter()
  return (
    <div className="bg-red-300">
       in modal <br/>
      <button className="btn" onClick={()=>{
        router.back()
      }}>close modal</button>
      {children}
    </div>
  )
}