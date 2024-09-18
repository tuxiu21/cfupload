import Image from "next/image";
import fs, { Dirent } from "fs";
import Link from "next/link";
// import { BASE_PATH } from "../../config";
import path from "path";
import { redirect, RedirectType } from "next/navigation";
// import Uploader from "../../../components/uploader";

import { randomUUID, UUID } from "crypto";
import {
  CreateFileIcon,
  FileIcon,
  FileUploadIcon,
  FolderIcon,
  FolderUploadIcon,
  PlusIcon,
} from "@/components/icons";
import LeftBar from "@/components/leftbar";
import TableView from "@/components/tableview";
import { getSingleFileUrl, getTagBasePath } from "@/utils";
// import { getFiles,  } from "./action";
import { getFiles } from "./action";
import { getTabMap } from "@/app/action";



export default async function Files({
  params,
}: {
  params: {
    tab: string;
    path_slug?: string[];
  }
}) {
  const tab=(await getTabMap()).get(params.tab)
  if(!tab){
    throw new Error("Tab not found")
  }

  const tag_basepath=getTagBasePath(tab.pathName)

  let urlParentPath = "";
  if (params.path_slug) {
    urlParentPath = path.join(...params.path_slug);
    urlParentPath = decodeURIComponent(urlParentPath);
  }

  // 判断这个路径是文件还是目录
  const stat = await fs.promises.stat(path.join(tag_basepath, urlParentPath));
  if (stat.isFile()) {
    // 发现这是文件 下载该文件
    // 在这里我们可以实现wget的下载
    const filepath = getSingleFileUrl(urlParentPath);
    redirect(filepath);
  }

  const filesDirent = await getFiles(tag_basepath, urlParentPath);

  const viewFiles = await Promise.all(
    filesDirent.map(async (file) => {
      const stat = await fs.promises.stat(
        path.join(tag_basepath, urlParentPath, file.name)
      );

      return {
        name: file.name,
        urlParentPath: urlParentPath,
        isFile: file.isFile(),
        size: stat.size,
        mtimeMs: stat.mtimeMs,
        birthtimeMs: stat.birthtimeMs,
      };
    })
  );

  // const testDiv = await getFoldersUl(urlParentPath);

  return (
    <>
    {/* {testDiv} */}
      <div className="mx-6 breadcrumbs text-sm">
        <ul>
          <li>
            <Link href={path.join('/files',params.tab)}>My Files</Link>
          </li>
          {urlParentPath.split(path.sep).map((name, index, arr) => {
            // array（可选）：调用 map 方法的原数组。
            const href = path.join("/files",params.tab, ...arr.slice(0, index + 1));
            
            return (
              <li key={href}>
                <Link href={href}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <TableView viewFiles={viewFiles} />
    </>
  );
}
