import FileMenu from "@/components/file-menu";
import LeftBar from "@/components/leftbar";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";
import { verifySession } from "../action";
import FileMenuVisitor from "@/components/file-menu-visitor";

// 这个layout 用来包裹navbar 因为login不需要navbar 所以要独立开来
export default async function Layout({
  auth,
  children,
}: {
  auth: ReactNode;
  children: ReactNode;
}) {

  const {isAuth,username}= await verifySession()

  return (
    <>
      {/* <Navbar></Navbar>
      {auth}
      {children} */}
      <div className="drawer h-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <Navbar></Navbar>
          {auth}
          {children}
        </div>
        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* 根据是否登入分别渲染 减少visitor bundle加载 */}
            {
              isAuth?<FileMenu/>:<FileMenuVisitor/>
            }
          </div>
        </div>
      </div>
    </>
  );
}
