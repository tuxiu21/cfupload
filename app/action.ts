'use server'



type LoginFormState={
  success:boolean,
  message:string
}


export async function login(state:LoginFormState,formData:FormData){
  console.log('login action', formData)

  const username=formData.get('username')
  const password=formData.get('password')
  if(username===process.env.USER_NAME && password===process.env.USER_PASSWORD){
    console.log('ok');
    
  }else{
    console.log('faled');
  }
  return {success:true,message:'ok'}
  
  
}