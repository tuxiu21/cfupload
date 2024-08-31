import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({auth,children}:{auth:ReactNode,children:ReactNode}){
  return (
    <>
      <nav>
        <Link href="/test3/login">open modal</Link>
      </nav>
      <div>{auth}</div>
      <div>
        {children}
      </div>
    </>
  )
}