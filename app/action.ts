'use server'
import { verifySession } from "@/lib/dal"
import { db } from "@/lib/db"
import { createTabSchema, editTabSchema, getEditTabSchema, } from "@/lib/definitions"
import { createSession, decryptSession } from "@/lib/sessions"
import { Tab } from "@/types"
import { cookies } from "next/headers"
import path from "path"

const BASE_PATH = process.env.BASE_PATH!;


export const logout = async () => {
  cookies().delete('session')
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
export async function puttabListFromForm(formData: FormData) {
  const tab: Tab = {
    tabName: formData.get('tabName') as string,
    urlName: formData.get('urlName') as string,
    pathName: formData.get('pathName') as string,
    permissions: formData.getAll('permissions') as ('visitorReadOnly' | 'visitorFullAccess')[]
  }
  console.log(tab);
  // 表单验证
  const validatedFields = await createTabSchema.safeParseAsync(tab)
  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.errors[0].message }
  }
  db.update((data)=>data.tabList.push(tab))
  return { success: true, message: 'ok' }
}
export async function edittabListFromForm(formData: FormData) {
  const tab: Tab = {
    tabName: formData.get('tabName') as string,
    urlName: formData.get('urlName') as string,
    pathName: formData.get('pathName') as string,
    permissions: formData.getAll('permissions') as ('visitorReadOnly' | 'visitorFullAccess')[]
  }
  const originalUrlName = formData.get('originalUrlName') as string
  console.log(tab);
  // 表单验证
  const validatedFields = await getEditTabSchema(originalUrlName).safeParseAsync(tab)
  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.errors[0].message }
  }
  db.update((data)=>{
    const index = data.tabList.findIndex(tab=>tab.urlName===originalUrlName)
    data.tabList[index] = tab
  })
  return { success: true, message: 'ok' }
}

export async function getTabByUrlName(urlName: string) {
  await db.read()
  return db.data.tabList.find(tab => tab.urlName === urlName)
}
export async function getVisitorTabs() {
  await db.read()
  return db.data.tabList.filter(tab => tab.permissions.includes('visitorReadOnly') || tab.permissions.includes('visitorFullAccess'))
}

export async function getFullFilePathByTabUrlName(tabUrlName: string, urlPath: string) {
  const tab = await getTabByUrlName(tabUrlName)
  if (!tab) {
    throw new Error("Tab not found");
  }
  return path.join(BASE_PATH,tab.pathName, urlPath)
}

