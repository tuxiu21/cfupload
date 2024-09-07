import 'server-only'
import  {SignJWT} from 'jose/jwt/sign'
import { cookies } from 'next/headers'
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
