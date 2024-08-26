import Image from "next/image";
import fs, { Dirent } from "fs";
import Link from "next/link";
// import { BASE_PATH } from "../../config";
import path from "path";
import { redirect, RedirectType } from "next/navigation";
import Uploader from "../../../components/uploader";

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
import TestClient from "@/components/testclient";
const BASE_PATH = process.env.BASE_PATH!;



export default async function Files({
  params,
}: {
  params: { path_slug?: string[] };
}) {
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

  // const view_files = await fetch(`/api/viewfiles?parentPath=${parentPath}`).then((res) =>
  //   res.json()
  // );

  return (
    <div>
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
      <TableView view_files={view_files} />
    </div>
  );
}

