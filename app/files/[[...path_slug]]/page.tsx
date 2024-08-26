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

async function getFiles(pathname: string): Promise<Dirent[]> {
  return new Promise((resolve, reject) => {
    const callback = (err: NodeJS.ErrnoException | null, files: Dirent[]) => {
      if (err) {
        reject(err);
      } else {
        // 这里的reject和resolve是从Promise((resolve, reject)）中来的 所以 即使它在callback中 也是传进来的 对应的是Promise的resolve和reject
        resolve(files);
      }
    };
    fs.readdir(
      path.join(BASE_PATH, pathname),
      { withFileTypes: true },
      callback
    );
  });
}

export default async function Files({
  params,
}: {
  params: { path_slug?: string[] };
}) {
  let pathname = "";
  if (params.path_slug) {
    pathname = path.join(...params.path_slug);
    pathname = decodeURIComponent(pathname);
  }
  console.log("发生了重新渲染！！！！");

  // 判断这个路径是文件还是目录
  const stat = await fs.promises.stat(path.join(BASE_PATH, pathname));
  // console.log(stat);
  if (stat.isFile()) {
    // 发现这是文件 下载该文件
    // 在这里我们可以实现wget的下载
    const filepath = getSingleFileUrl(pathname);
    redirect(filepath);
  }
  const filesDirent = await getFiles(pathname);

  const view_files = await Promise.all(
    filesDirent.map(async (file) => {
      const stat = await fs.promises.stat(
        path.join(BASE_PATH, pathname, file.name)
      );

      return {
        name: file.name,
        parentPath: pathname,
        isFile: file.isFile(),
        size: stat.size,
        mtimeMs: stat.mtimeMs,
        birthtimeMs: stat.birthtimeMs,
      };
    })
  );
  // console.log(view_files);

  return (
    <div className="grow flex flex-col min-w-0">
      <div className="mx-6 breadcrumbs text-sm">
        <ul>
          <li>
            <Link href={"/files"}>My Files</Link>
          </li>
          {pathname.split(path.sep).map((name, index, arr) => {
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

