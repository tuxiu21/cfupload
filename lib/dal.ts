
import 'server-only'

import { cookies } from 'next/headers'
import { decryptSession } from './sessions'
import { cache } from 'react'

// export const verifySession = cache(async () => {
//   const cookie = cookies().get('session')?.value
//   const sessionPayload = await decryptSession(cookie)
//   if (sessionPayload && sessionPayload.username) {
//     return { isAuth: true, username: sessionPayload.username as string }
//   }
//   return { isAuth: false, username: '' }
// })
