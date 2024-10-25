import { getFullFilePathByTabUrlName } from '@/app/action';
import { verifySessionAction, verifyTab } from '@/app/action-cached';
import fs from 'fs'
import { redirect } from 'next/navigation';
import path from 'path';

export async function GET(request: Request) {


  const url = new URL(request.url)

  const tabUrlName = url.searchParams.get("tabUrlName")
  if (!tabUrlName) {
    return new Response("tabUrlName is required", { status: 400 })
  }
  if (!(await verifyTab(tabUrlName))) {
    return new Response("Permission denied", { status: 403 })
  }
  const urlPath = url.searchParams.get("urlPath")
  if (!urlPath) {
    return new Response("urlPath is required", { status: 400 })
  }

  const filepath = await getFullFilePathByTabUrlName(tabUrlName, urlPath)


  const stat = await fs.promises.stat(filepath)
  const fileSize = stat.size
  const filename = encodeURIComponent(path.basename(filepath))

  const range= request.headers.get("Range")
  if (!range) {
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

  // 配置分片下载
  const parts = range.replace(/bytes=/, "").split("-")
  const start = parseInt(parts[0], 10)
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
  const chunksize = (end - start) + 1

  const readableStream: any = fs.createReadStream(filepath, { start, end })

  return new Response(readableStream, {
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize.toString(),
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${filename}`,
    },
  })




  // // 这里不设置为any的话会报错
  // const readableStream: any = fs.createReadStream(filepath)

  // return new Response(readableStream, {
  //   headers: {
  //     "Content-Type": "application/octet-stream",
  //     "Content-Disposition": `attachment; filename=${filename}`,
  //     "Content-Length": fileSize.toString(),
  //   },
  // })
}