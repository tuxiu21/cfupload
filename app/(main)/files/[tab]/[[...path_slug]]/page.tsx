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
import { getSingleFileUrl } from "@/utils";
// import { getFiles,  } from "./action";
import { getFiles } from "./action";
const BASE_PATH = process.env.BASE_PATH!;



export default async function Files({
  params,
}: {
  params: {
    tab: string;
    path_slug?: string[];
  }
}) {
  const tag_basepath=path.join(BASE_PATH, params.tab);

  // 所有的parentPath都是url上面的
  let parentPath = "";
  if (params.path_slug) {
    parentPath = path.join(...params.path_slug);
    parentPath = decodeURIComponent(parentPath);
  }

  // 判断这个路径是文件还是目录
  const stat = await fs.promises.stat(path.join(BASE_PATH, parentPath));
  if (stat.isFile()) {
    // 发现这是文件 下载该文件
    // 在这里我们可以实现wget的下载
    const filepath = getSingleFileUrl(parentPath);
    redirect(filepath);
  }

  const filesDirent = await getFiles(parentPath);

  const viewFiles = await Promise.all(
    filesDirent.map(async (file) => {
      const stat = await fs.promises.stat(
        path.join(BASE_PATH, parentPath, file.name)
      );

      return {
        name: file.name,
        parentPath: parentPath,
        isFile: file.isFile(),
        size: stat.size,
        mtimeMs: stat.mtimeMs,
        birthtimeMs: stat.birthtimeMs,
      };
    })
  );

  // const testDiv = await getFoldersUl(parentPath);

  return (
    <>
    {/* {testDiv} */}
      <div className="mx-6 breadcrumbs text-sm">
        <ul>
          <li>
            <Link href={"/files"}>My Files</Link>
          </li>
          {parentPath.split(path.sep).map((name, index, arr) => {
            // array（可选）：调用 map 方法的原数组。
            const href = path.join("/files", ...arr.slice(0, index + 1));
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
