import { createGzip } from "zlib"
import fs from "fs"
import { promisify } from "util"
import { pipeline } from "stream"
import archiver, { Archiver } from "archiver"


export async function GET(request:Request) {

  // await do_gzip("C:/Users/Rin/Desktop/photo_2024-08-16_15-59-12.jpg","C:/Users/Rin/Desktop/photo_2024-08-16_15-59-12.jpg.gz")
  // const output=fs.createWriteStream("C:/Users/Rin/Desktop/test.zip")
  const archive:Archiver=archiver('zip',{zlib:{level:9}})
  // let res:any
  // archive.pipe(res) 

  // archive.on('data', (data) => {
  //   console.log(data)
  // })
// "C:/Users/Rin/Downloads/one24""C:/Users/Rin/Desktop/cfssl/"
  // archive.directory("C:/Users/Rin/Downloads/one24","testcfssl")
  archive.directory("C:/Users/Rin/Desktop/cfssl/","testcfssl")


  //这个命令执行后 archive会作为一个可读流 开始产生数据 所以不需要await
  archive.finalize()



  return new Response(archive, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${'testsl.zip'}`,
      // "Content-Length": fileSize.toString(),
    },
  })
  // return new Response("Hello World", { status: 200 })
}

const pipe=promisify(pipeline)

async function do_gzip(input:string,ounput:string) {
  const gzip=createGzip()
  const source=fs.createReadStream(input)
  const destination=fs.createWriteStream(ounput)
  await pipe(source,gzip,destination)
  // 关闭流
  source.close()
  destination.close()
  gzip.close()

}