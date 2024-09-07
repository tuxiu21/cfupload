'use server'

import { createSession } from "@/lib/sessions"




export async function login(formData:FormData){
  console.log('login action', formData)

  const username=formData.get('username')
  const password=formData.get('password')
  if(!(username===process.env.USER_NAME && password===process.env.USER_PASSWORD)){
    return {success:false,message:'Invalid username or password'}
    
  }
  await createSession(username)

  return {success:true,message:'ok'}

  
  
}