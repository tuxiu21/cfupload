import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({auth,pig,children}:{auth:ReactNode,pig:ReactNode,children:ReactNode}){
  return (
    <>
      <nav>
        <Link href="/test/login">open modal</Link>
      </nav>
      <div>{auth}</div>
      <div>{pig}</div>
      <div>
        {children}
      </div>
    </>
  )
}