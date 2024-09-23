'use server'

import { createTabSchema, editTabSchema, getEditTabSchema, } from "@/lib/definitions"
import { createSession, decryptSession } from "@/lib/sessions"
import { tabMap } from "@/store/tabMap"
import { Tab } from "@/types"
import { cookies } from "next/headers"
import { cache } from "react";

// // 这里用cache进行缓存  React 将在每次服务器请求时使所有记忆化函数的缓存失效 所以渲染时进行的多次请求会被缓存
// export const verifySession = cache(async () => {
//   const cookie = cookies().get('session')?.value
//   const sessionPayload = await decryptSession(cookie)
//   if (sessionPayload && sessionPayload.username) {
//     return { isAuth: true, username: sessionPayload.username as string }
//   }
//   return { isAuth: false, username: '' }
// })
export const verifySession = async () => {
  const cookie = cookies().get('session')?.value
  const sessionPayload = await decryptSession(cookie)
  if (sessionPayload && sessionPayload.username) {
    return { isAuth: true, username: sessionPayload.username as string }
  }
  return { isAuth: false, username: '' }
}

// export const testCache = cache(async()=>{})
// export const testCache2 = cache(async()=>{})





export const logout = async () => {
  await cookies().delete('session')
}


export async function login(formData: FormData) {
  console.log('login action', formData)

  const username = formData.get('username')
  const password = formData.get('password')
  if (!(username === process.env.USER_NAME && password === process.env.USER_PASSWORD)) {
    return {
      res: { success: false, message: 'Invalid username or password' },
      authInfo: { isAuth: false, username: '' }
    }
  }
  await createSession(username)

  return {
    res: { success: true, message: "Login successful! " },
    authInfo: { isAuth: true, username: username as string }
  }
}

// 这个函数之所以用put 是为了防止和setState混淆
export async function putTabMapFromForm(formData: FormData) {
  const tab: Tab = {
    tabName: formData.get('tabName') as string,
    urlName: formData.get('urlName') as string,
    pathName: formData.get('pathName') as string,
    permissions: formData.getAll('permissions') as ('visitorVisible' | 'visitorFullAccess')[]
  }
  console.log(tab);
  // 表单验证
  const validatedFields = await createTabSchema.safeParseAsync(tab)
  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.errors[0].message }
  }



  tabMap.set(tab.urlName, tab);
  return { success: true, message: 'ok' }
}
export async function editTabMapFromForm(formData: FormData) {
  const tab: Tab = {
    tabName: formData.get('tabName') as string,
    urlName: formData.get('urlName') as string,
    pathName: formData.get('pathName') as string,
    permissions: formData.getAll('permissions') as ('visitorVisible' | 'visitorFullAccess')[]
  }
  const originalUrlName = formData.get('originalUrlName') as string
  console.log(tab);
  // 表单验证
  const validatedFields = await getEditTabSchema(originalUrlName).safeParseAsync(tab)
  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.errors[0].message }
  }



  tabMap.set(tab.urlName, tab);
  return { success: true, message: 'ok' }
}
export async function getTabMap() {
  return tabMap
}
export async function getTabByUrlName(urlName: string) {
  return tabMap.get(urlName)
}
export async function getVisitorTabs() {
  return Array.from(tabMap.values()).filter(tab => tab.permissions.includes('visitorVisible') || tab.permissions.includes('visitorFullAccess'))
}
