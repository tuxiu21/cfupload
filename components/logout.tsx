'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { logout } from "@/app/action"
import { useToast } from "@/components/toast-provider"

export default function Logout({nextUrl}:{nextUrl?:string}) {

  const url=nextUrl||'/'

  const router = useRouter()
  const toast=useToast()
  useEffect(() => {
    // logout
    // router.push('/')
    init()
  }, [])

  const init=async()=>{
    await logout()
    toast({message:'Logout success',success:true})
    router.push(url)

  }
  return null
}