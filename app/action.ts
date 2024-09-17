'use server'

import { createTabSchema,  } from "@/lib/definitions"
import { createSession } from "@/lib/sessions"
import { tabMap } from "@/store/tabMap"
import { Tab } from "@/types"





export async function login(formData: FormData) {
  console.log('login action', formData)

  const username = formData.get('username')
  const password = formData.get('password')
  if (!(username === process.env.USER_NAME && password === process.env.USER_PASSWORD)) {
    return { success: false, message: 'Invalid username or password' }
  }
  await createSession(username)

  return { success: true, message: 'ok' }
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
export async function getTabMap() {
  return tabMap
}

