import 'server-only'
import  {SignJWT} from 'jose/jwt/sign'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
const secret=process.env.SECRET_KEY
const encodedSecret=new TextEncoder().encode(secret)

export async function createSession(username:string){
  const expires=new Date(Date.now()+1000*60*60*24*7)
  const signedJWT= await new SignJWT({username,expires})
  .setProtectedHeader({alg:'HS256'})
  .setIssuedAt()
  .setExpirationTime('7d')
  .sign(encodedSecret)
  console.log('signedJWT',signedJWT);

  cookies().set('session',signedJWT,{
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}
export async function decryptSession(cookie:string|undefined){
  if(!cookie){
    return null
  }
  try {
    const {payload}=await jwtVerify(cookie,encodedSecret)
    return payload
  } catch (error) {
    return null
  }
}

// export async function deleteSession(){
//   // cookies().delete('session')
//   cookies().set('pig','sdad')
// }
