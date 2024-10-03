'use client'

import { cache } from "react"
import { getTabList } from "@/app/action-cached";

export default function TestPage(){
  const testCache = cache(()=>{})
  return <>
  <div className="w-20 h-20 bg-sky-300 hover:bg-sky-700">
    <button className="btn btn-primary" onClick={async()=>{
      const taskMap=await getTabList()
      console.log(taskMap);
      
    }}>test</button>
    <div className=" w-10 h-10 bg-red-200 hover:bg-red-800"></div>
  </div>
  </>
}