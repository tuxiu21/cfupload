import { cache } from "react"

export default function TestPage(){
  const testCache = cache(()=>{})
  return <>
  <div className="w-20 h-20 bg-sky-300 hover:bg-sky-700">
    <div className=" w-10 h-10 bg-red-200 hover:bg-red-800"></div>
  </div>
  </>
}