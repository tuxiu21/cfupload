'use client'

import { getTabMap } from "./action";


export default function Home() {
  return (
    <div className="hero bg-base-200 grow">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary"
          onClick={async ()=>{
            // const res=await getTabMap()
            const res=await getTabMap()
            console.log(res);
          }}
          >Get Started</button>
        </div>
      </div>
    </div>
  );
}
