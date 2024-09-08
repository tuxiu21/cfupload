import FileMenu from "@/components/file-menu";
import LeftBar from "@/components/leftbar";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

// 这个layout 用来包裹navbar 因为login不需要navbar 所以要独立开来
export default function Layout({
  auth,
  children,
}: {
  auth: ReactNode;
  children: ReactNode;
}) {
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
          {/* <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul> */}
          <div className="bg-base-200 text-base-content min-h-full w-80 p-4">
            <FileMenu/>
          </div>
        </div>
      </div>
    </>
  );
}
