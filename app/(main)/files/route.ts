import {  getVisitorTabs } from "@/app/action";
import { getTabList } from "@/app/action-cached";
import { verifySessionAction } from "@/app/action-cached";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import path from "path";

export async function GET(request: Request){
  const { isAuth, username } = await verifySessionAction()

  if (isAuth) {
    const tabList = await getTabList()
    redirect(path.join('/files', tabList[0].urlName))
  }


  const tabs = await getVisitorTabs()


  // redirect(path.join('/files', tabs[0].urlName))
  if(tabs.length===0){
    redirect('/login')
  }
  redirect(path.join('/files', tabs[0].urlName))

  // redirect('/login')

}