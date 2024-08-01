import fs from 'fs'
import { redirect } from 'next/navigation';
import path from 'path';

export async function GET(request: Request) {

  const url = new URL(request.url)
  // console.log(url);
  
  const filepath = url.searchParams.get("filepath")
  if (!filepath) {
    return new Response("filepath is required", { status: 400 })
  }
  // const filename=path.basename(filepath)
  const stat = await fs.promises.stat(filepath)
  const fileSize = stat.size
  const filename = path.basename(filepath)

  // 这里不设置为any的话会报错
  const readableStream: any = fs.createReadStream(filepath)
  
  return new Response(readableStream, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${filename}`,
      "Content-Length": fileSize.toString(),
    },
  })
}