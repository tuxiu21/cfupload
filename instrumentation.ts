



// 这个函数只在next-server启动的时候执行一次
export async function register() {


  // nextjs启动时好像一开始不是nodejs环境，所以这里要判断一下
  // 之后的代码都是在nodejs环境下执行的
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // 首次启动时，初始化数据库
    const fs=await import('fs')
    await fs.promises.rm('lib/db/db.json', { force: true })
  }
}