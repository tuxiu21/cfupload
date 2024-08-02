"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [now,SetNow]=useState(0)
  const [total,SetTotal]=useState(0)


  useEffect(() => {
    // download();
    console.log('total-effect:'+total);
    
  }, [total]);

   const handleClick=async()=>{
    const a=10
    SetTotal(a)
    // console.log('total:'+total);
    
    for (let index = 0; index <= a; index++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 500);
      })
      SetNow(index)
      console.log('total:'+total);
      console.log('now:'+now);
      
      console.log(index);
      
      
    }
  }

  return (
    <div>
      <span className="font-bold">file manager</span>
      <br />
      {/* <button onClick={handleClick}>点击</button> */}
      {/* <form action={handleClick}>
        <input type="file" name="file" />
        <button type="submit">upload</button>
      </form>
      <span>{now}/{total}</span> */}
    </div>
  );
}
