import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "./lib/sessions";
import { getTabMap, getVisitorTabs, verifySession } from "./app/action";
import { Tab } from "./types";
import path from "path";


export default async function Middleware(req: NextRequest) {

  // 判断用户是否登录
  const { isAuth, username } = await verifySession()

  // 当用户访问 /files时
  const pathName = req.nextUrl.pathname
  if (pathName === '/files') {
    // 分别得到对应可访问tabs的第一项
    if (isAuth) {
      const tabMap = await getTabMap()
      const iterator = tabMap.values()
      const firstTab:Tab = iterator.next().value
      return NextResponse.redirect(new URL('/files/'+firstTab.urlName, req.nextUrl))
    }
    const tabs=await getVisitorTabs()
    return NextResponse.redirect(new URL('/files/'+tabs[0].urlName, req.nextUrl))
  }
  // if(!isAuth && pathName.startsWith('/files/')){
  //   const tabUrl=pathName.split('/')[2]
  //   console.log(tabUrl);
  //   const tabs=await getVisitorTabs()
  //   if(!tabs.some(tab=>tab.urlName===tabUrl)){

  //   }
    
  // }










}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}