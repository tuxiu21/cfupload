// import { PageProps } from '@/.next/types/app/page'
import TestClient from '@/components/testclient'
import Link from 'next/link'

export default function Home(props:any){
  console.log('params:');
  
  // console.log(props.params);
  // console.log(props.searchParams);
  
  return (
    <div>
      111
      <Link href='/?a=1' className='btn'>route</Link>
      {/* current params:{props.searchParams.a} */}
      <TestClient/>
    </div>
  )
}