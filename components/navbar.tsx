import { useState } from "react";
import { KeyIcon, UserFilledIcon, UserIcon } from "./icons";
import ThemeSwitch from "./theme-switch";

import Link from "next/link";
import { cookies } from "next/headers";
import { verifySessionAction } from "@/app/action-cached";

export default async function Navbar() {
  // console.log("navbar渲染！");

  const { isAuth, username } = await verifySessionAction();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <label
          className="btn btn-square btn-ghost sm:hidden"
          htmlFor="my-drawer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl sm:text-2xl">File Manager</a>
      </div>

      <div className="flex-none">
        <ThemeSwitch />
      </div>

      <div className="flex-none">
        {isAuth ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <UserIcon className="w-6 h-6" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between font-bold flex flex-col gap-1 items-start rounded-md">
                  <span>Signed in as</span>
                  <span>{username}</span>
                </a>
              </li>
              <li>
                <Link
                  className="hover:bg-error hover:text-black hover:font-bold"
                  href="/logout"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-ghost btn-square">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
