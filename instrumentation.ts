import { tabMap } from "./store/tabMap";

// 这个函数只在next-server启动的时候执行一次
export function register() {
  
  console.log('register被执行！！');
  

  tabMap.set('all', {
    tabName: 'All Files',
    urlName: 'all',
    pathName: '/',
    permissions: []
  })
  tabMap.set('pig2', {
    tabName: '1212文件夹',
    urlName: 'pig2',
    pathName: '/1212',
    permissions: ['visitorVisible']
  })
  tabMap.set('u', {
    tabName: 'upload文件夹',
    urlName: 'u',
    pathName: '/upld111',
    permissions: ['visitorVisible', 'visitorFullAccess']
  })
}