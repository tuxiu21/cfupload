import { NextRequest, NextResponse } from "next/server";

import { verifySession } from "./lib/dal";


export default async function Middleware(req: NextRequest) {

  // console.log('middleware');

  
  

  // // 判断用户是否登录
  // const { isAuth, username } = await verifySession()


  // 当用户访问 /files时
  // const pathName = req.nextUrl.pathname
  // if (pathName === '/files') {
  //   // 分别得到对应可访问tabs的第一项
  //   if (isAuth) {
  //     const tabList = await getTabList()
  //     const iterator = tabList.values()
  //     const firstTab: Tab = iterator.next().value
  //     return NextResponse.redirect(new URL('/files/' + firstTab.urlName, req.nextUrl))
  //   }
  //   const tabs = await getVisitorTabs()
  //   return NextResponse.redirect(new URL('/files/' + tabs[0].urlName, req.nextUrl))
  // }
  // if (!isAuth && pathName.startsWith('/files/')) {
  //   const tabUrlName = pathName.split('/')[2]
  //   console.log(tabUrlName);
  //   const tabs = await getVisitorTabs()
  //   if (!tabs.some(tab => tab.urlName === tabUrlName)) {

  //   }

  // }
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}