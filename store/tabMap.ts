import 'server-only'

import { Tab } from "@/types";

// 这里的tabMap是一个全局的map，用来存储tab的信息
// 如果把tabMap放在action里面 对于不同的session，tabMap是不共享的
export const  tabMap = new Map();

console.log('store被执行！！');

// export const tabMap=new Map<string,Tab>([]);

// console.log('store被执行！！');


// tabMap.set('all',{
//   tabName:'All Files',
//   urlName:'all',
//   pathName:'/',
//   permissions:[]
// })
// tabMap.set('pig2',{
//   tabName:'1212文件夹',
//   urlName:'pig2',
//   pathName:'/1212',
//   permissions:['visitorVisible']
// })
// tabMap.set('u',{
//   tabName:'upload文件夹',
//   urlName:'u',
//   pathName:'/upld111',
//   permissions:['visitorVisible','visitorFullAccess']
// })