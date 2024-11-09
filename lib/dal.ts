
import 'server-only'

import { cookies } from 'next/headers'
import { decryptSession } from './sessions'

export const verifySession= async () => {
  // const cookie = cookies().get('session')?.value
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value
  const sessionPayload = await decryptSession(cookie)
  if (sessionPayload && sessionPayload.username) {
    return { isAuth: true, username: sessionPayload.username as string }
  }
  return { isAuth: false, username: '' }
}
