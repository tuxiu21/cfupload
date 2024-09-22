"use client";

import { login } from "@/app/action";
import { KeyIcon, UserFilledIcon } from "./icons";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import Toast, { useToast } from "./toast-provider";
import { redirect, useRouter } from "next/navigation";
import { useAuthInfo } from "./auth-provider";

export default function Login({ inDialog }: { inDialog?: boolean }) {

  const toast = useToast();
  const {authInfo,setAuthInfo} = useAuthInfo();
  const router=useRouter()


  const handleLogin=async (formData:FormData)=>{
    const {res,authInfo} = await login( formData);
    // 写入auth-provider
    setAuthInfo(authInfo)



    toast({ success: res.success, message: res.message });
    if(res.success){
      // redirect("/files");
      router.push('/files')
    }
  }

  return (
    <>
      {inDialog ? (
        <h3 className="font-bold text-lg mb-4">Log in</h3>
      ) : (
        <h2 className="card-title mb-2">File Manager</h2>
      )}
      <form className=" flex flex-col gap-2" action={handleLogin}>
        <label className="input input-bordered flex items-center gap-2 ">
          <UserFilledIcon className="h-5 w-5 opacity-70" />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 ">
          <KeyIcon className="h-5 w-5 opacity-70" />
          <input
            type="password"
            className="grow"
            placeholder="Password"
            name="password"
          />
        </label>

        <div className="flex flex-row gap-2 justify-end mt-2">
          {inDialog && (
            <Link href="/files" className="btn btn-sm btn-ghost">
              Close
            </Link>
          )}
          <SubmitButton />
        </div>
      </form>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={"btn btn-sm btn-primary " + (pending && "btn-disabled")}
      type="submit"
    >
      {/* {pending && <span className="loading loading-sm loading-spinner"></span>} */}
      Sign in
    </button>
  );
}
