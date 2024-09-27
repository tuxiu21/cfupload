import { useState } from "react";
import { KeyIcon, UserFilledIcon, UserIcon } from "./icons";
import ThemeSwitch from "./theme-switch";
import { getTabMap, login } from "@/app/action";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifySessionAction } from "@/app/action-cached";

export default async function Navbar() {
  // console.log("navbar渲染！");
  
  const { isAuth, username } = await verifySessionAction();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <label className="btn btn-square btn-ghost" htmlFor="my-drawer">
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
        <a className="btn btn-ghost text-xl">File Manager</a>
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
                <Link className="hover:bg-error hover:text-neutral hover:font-bold" href='/logout'>Logout</Link>
                {/* <form action={logout}>
                  <input type="hidden" name="username" value={username} />
                  <button type="submit">Logout</button>
                </form> */}
                {/* <button
                  formAction={async (formData: FormData) => {
                    "use server";
                    console.log("try to logout");

                    // await cookies().delete("session");
                  }}
                >
                  Logout
                </button> */}
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-ghost btn-square">
            Login
          </Link>
        )}
      </div>
      {/* <dialog className={" modal " + (showLoginModal ? "modal-open" : "")}>
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-ghost  btn-square absolute right-2 top-2"
                onClick={() => setShowLoginModal(false)}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Log in</h3>
            <form className="my-4 flex flex-col gap-2"
            action={login}
            >
              <label className="input input-bordered flex items-center gap-2">
                <UserFilledIcon className="h-5 w-5 opacity-70"/>
                <input type="text" className="grow" placeholder="Username" />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <KeyIcon className="h-5 w-5 opacity-70"/>
                
                <input type="password" className="grow" placeholder="Password" />
              </label>
            </form>
            <div className="flex flex-row gap-2 justify-end">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setShowLoginModal(false)}
              >
                Close
              </button>
              <button className="btn btn-sm btn-primary" onClick={() => {}}>
                Sign in
              </button>
            </div>
          </div>
        </dialog> */}
    </div>
  );
}
