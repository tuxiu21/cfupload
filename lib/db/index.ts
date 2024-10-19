import 'server-only'


import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { dbData } from '@/types'

const defaultData = {
  'tabList': [
    {
      'tabName': 'All Files',
      'urlName': 'all',
      'pathName': '/',
      'permissions': []
    },
    // {
    //   'tabName': '1212文件夹',
    //   'urlName': 'pig2',
    //   'pathName': '/1212',
    //   'permissions': [
    //     'visitorReadOnly'
    //   ]
    // },
    // {
    //   'tabName': 'upload文件夹',
    //   'urlName': 'u',
    //   'pathName': '/upld111',
    //   'permissions': [
    //     'visitorReadOnly',
    //     'visitorFullAccess'
    //   ]
    // }
  ]
}



export const db = new Low(new JSONFile<dbData>('lib/db/db.json'),defaultData as dbData)
