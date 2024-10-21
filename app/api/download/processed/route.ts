import { getFullFilePathByTabUrlName } from "@/app/action";
import { verifyTab } from "@/app/action-cached";
import { SelectedFileType } from "@/types";
import archiver from "archiver";
import { LRUCache } from "lru-cache";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// const fileListMap = new Map<string, string>();
const fileListMap = new LRUCache<string, string>({ max:10,ttl:60*1000});

export async function GET(request: Request) {
  const url = new URL(request.url)
  const uuid = url.searchParams.get("uuid")
  if (!uuid) {
    return new Response("uuid is required", { status: 400 })
  }
  const res = fileListMap.get(uuid);
  if (!res) {
    return new Response("uuid is not exist", { status: 400 })
  }

  const resObj = JSON.parse(res);
  const urlParentPath: string = resObj.urlParentPath;
  const selectedFiles: SelectedFileType[] = resObj.selectedFiles;
  const tabUrlName:string = resObj.tabUrlName;

  const archive = archiver('zip', { zlib: { level: 4 } })
  // selectedFiles.forEach(async (selectedFile) => {
  //   const fullPath = await getFullFilePathByTabUrlName(tabUrlName, path.join(urlParentPath, selectedFile.name));  
  //   if (selectedFile.isFile) {
  //     archive.file(fullPath, { name: selectedFile.name });
  //   } else {
  //     archive.directory(fullPath, selectedFile.name);
  //   }
  // });
  for (let i = 0; i < selectedFiles.length; i++) {
    const selectedFile = selectedFiles[i];
    const fullPath = await getFullFilePathByTabUrlName(tabUrlName, path.join(urlParentPath, selectedFile.name));  
    if (selectedFile.isFile) {
      archive.file(fullPath, { name: selectedFile.name });
    } else {
      archive.directory(fullPath, selectedFile.name);
    }
  }
  const zipname = (selectedFiles.length === 1 ? encodeURIComponent(selectedFiles[0].name) : ("download-" + new Date().getTime()))+".zip";

  archive.finalize()
  // 此时 这里的archive是一个可读流

  return new Response((archive as any), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${zipname}`,
      // "Content-Disposition": `attachment; filename=${2473}`,
    },
  })



}
export async function POST(request: Request) {
  //得到需要下载的文件list
  // 注意，尽管方法被命名为 json()，结果并不是 JSON，而是将输入作为 JSON 解析，以生成一个 JavaScript 对象。
  const url = new URL(request.url)

  const tabUrlName = url.searchParams.get("tabUrlName")
  if(!(await verifyTab(tabUrlName))){
    return new Response("Permission denied", { status: 403 })
  }

  const result: string = await request.json()


  // 生成下载链接
  const uuid = uuidv4();
  fileListMap.set(uuid, JSON.stringify(result));

  
  return new Response(uuid, {
    headers: {
      "Content-Type": "application/json",
    },
  });

}