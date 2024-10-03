'use server'

import { verifySession } from "@/lib/dal"
import { cache } from "react"
import { getVisitorTabs } from "./action"
import { db } from "@/lib/db"

// cache的函数要分离开 因为middleware内部不能放cache的
export const verifySessionAction = cache(verifySession)

export const verifyTab=cache(async (tabUrlName:string|null)=>{

  if(!tabUrlName){
    return false
  }
  const { isAuth, username } = await verifySessionAction();
  if(isAuth){
    return true
  }
  const visitorTabs=await getVisitorTabs()
  const tab=visitorTabs.find(tab=>tab.urlName===tabUrlName)
  if(tab){
    return true
  }
  return false

})

// export async function getTabList() {
//   // tabList是敏感数据，需要验证权限
//   const { isAuth, username } = await verifySessionAction();

//   await db.read()
//   return db.data.tabList
// }

export const getTabList=cache(async ()=>{
    // tabList是敏感数据，需要验证权限
  const { isAuth, username } = await verifySessionAction();
  if(!isAuth){
    throw new Error('not auth')
  }
  await db.read()
  return db.data.tabList
})