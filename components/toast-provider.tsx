'use client'

import { createContext, useContext, useState } from "react";
import { CheckMarkIcon, ErrorIcon } from "./icons";
import { ToastMessage } from "@/types";

type ToastContextType =( (toastMessage: ToastMessage) => void)|null

const ToastContext = createContext<ToastContextType>(null)

export default function ToastProvider({children}: Readonly<{children: React.ReactNode}>) {

  const [toastMessage, setToastMessage] = useState<ToastMessage>({success: false, message: ""})
  const [showToast, setShowToast] = useState(false)

  function toast(toastMessage: ToastMessage) {

    const duration=toastMessage.duration || (toastMessage.success ? 2000 : 5000)

    setToastMessage(toastMessage)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, duration)
  }




  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toast show={showToast} message={toastMessage.message} success={toastMessage.success} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const toast=useContext(ToastContext)
  if(!toast) throw new Error("useToast must be used within a ToastProvider")
  return toast
}


function Toast({
  show,
  message,
  success,
}: {
  show: boolean;
  message: string;
  success: boolean;
}) {
  return (
    <div
      className={`z-[9999] toast transition-all duration-500 ease-out box-border max-w-full min-w-0 ${
        show ? " visible opacity-100 " : "invisible opacity-0 "
      }`}
    >
      <div
        className={`alert ${
          success ? "alert-success" : "alert-error"
        } flex flex-row`}
      >
        {success ? (
          <CheckMarkIcon className="h-6 min-w-6" />
        ) : (
          <ErrorIcon className="h-6 min-w-6" />
        )}
        <span className="break-words text-wrap">{message}</span>
      </div>
    </div>
  );
}
