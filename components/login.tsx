"use client";

import { login } from "@/app/action";
import { KeyIcon, UserFilledIcon } from "./icons";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import Toast, { useToast } from "./toast-provider";

export default function Login({ inDialog }: { inDialog?: boolean }) {
  // action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  // fn：当按钮被按下或者表单被提交时触发的函数。当函数被调用时，该函数会接收到表单的上一个 state（初始值为传入的 initialState 参数，否则为上一次执行完该函数的结果）作为函数的第一个参数，余下参数为普通表单动作接到的参数。
  const [state, action] = useFormState(login, { success: false, message: "" });
  const toast = useToast();
  useEffect(() => {
    toast({ success: state.success, message: state.message });
  }, [state]);

  return (
    <>
      {inDialog ? (
        <h3 className="font-bold text-lg mb-4">Log in</h3>
      ) : (
        <h2 className="card-title mb-2">File Manager</h2>
      )}
      <form className=" flex flex-col gap-2" action={action}>
        <label className={"input input-bordered flex items-center gap-2 "}>
          <UserFilledIcon className="h-5 w-5 opacity-70" />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
          />
        </label>

        <label className={"input input-bordered flex items-center gap-2 "}>
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
