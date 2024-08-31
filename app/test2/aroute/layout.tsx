import Link from "next/link";

export default function Layout({children}:{children:React.ReactNode}){
  return (
    <>
    <Link href={'/test2/broute'}>to broute</Link>
    {children}
    </>
  )}