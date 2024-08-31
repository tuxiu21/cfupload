"use client";

import { useState } from "react";

export default function TestClient() {
  const [classNames, setClassNames] = useState(
    "transition ease-in-out delay-150 bg-blue-500 duration-300 ..."
  );
  const [showModal, setShowModal] = useState(false);

  const [value,setValue]=useState(0)

  return (
    <div className="bg-sky-300">
      login<br/>
      value:{value}<br/>
      <button 
      className="btn"
      onClick={async ()=>{
        for (let index = 0; index < 10; index++) {
          // setTimeout(() => {
          //   SetValue((value)=>value+1)
          // }, 1000);
          await new Promise((resolve)=>{
            setTimeout(() => {
              resolve(null)
            }, 500);
          })
          setValue((value)=>value+1)
          // setValue()
          
        }
      }}>+</button>
    </div>
  );
}
