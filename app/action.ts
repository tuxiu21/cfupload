'use server'
import { createTabSchema, editTabSchema, getEditTabSchema, } from "@/lib/definitions"
import { createSession, decryptSession } from "@/lib/sessions"
import { tabMap } from "@/store/tabMap"
import { Tab } from "@/types"
import { renameKey } from "@/utils"
import { cookies } from "next/headers"

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
  // 如果urlName发生了变化，需要修改tabMap的key
  if(tab.urlName!==originalUrlName){
    renameTabKey(originalUrlName,tab.urlName)
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
export async function renameTabKey(oldKey: string, newKey: string) {
  renameKey(tabMap, oldKey, newKey)
}
