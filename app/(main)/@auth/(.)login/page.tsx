// 'use client'

import Login from "@/components/login"
import Link from "next/link";

export default function AuthPage() {
  return (
    <div>    <dialog className="modal modal-open">
    <div className="modal-box">
      <form method="dialog">
        {/* <button
          className="btn btn-sm btn-ghost  btn-square absolute right-2 top-2"
          // onClick={() => setShowLoginModal(false)}
        >
          ✕
        </button> */}
        <Link href="/files" className="btn btn-sm btn-ghost  btn-square absolute right-2 top-2">
        ✕
        </Link>
      </form>
      {/* <h3 className="font-bold text-lg mb-4">Log in</h3> */}
      <Login inDialog/>
      {/* <div className="flex flex-row gap-2 justify-end">
        <button
          className="btn btn-sm btn-ghost"
          // onClick={() => setShowLoginModal(false)}
        >
          Close
        </button>
        <button className="btn btn-sm btn-primary" onClick={() => {}}>
          Sign in
        </button>
      </div> */}
    </div>
  </dialog></div>
  );
}
