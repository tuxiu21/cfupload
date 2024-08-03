import Image from "next/image";
import fs, { Dirent } from "fs";
import Link from "next/link";
// import { BASE_PATH } from "../../config";
import path from "path";
import { redirect, RedirectType } from "next/navigation";
import Uploader from "./uploader";

import { randomUUID, UUID } from "crypto";
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

function getFileApiUrl(filepath: string) {
  const params = new URLSearchParams({
    filepath: path.join(BASE_PATH, filepath),
  });
  return "/api?" + params;
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

  // 判断这个路径是文件还是目录
  const stat = await fs.promises.stat(path.join(BASE_PATH, pathname));
  if (stat.isFile()) {
    // 发现这是文件 下载该文件
    const filepath = getFileApiUrl(pathname);

    redirect(filepath);
  }
  const view_files = await getFiles(pathname);

  return (
    <main className="flex flex-row h-full">
      <div className="w-72 bg-yellow-100">
        <details className="dropdown">
          <summary className="btn m-1">open or close</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </details>

      </div>
      <div className="flex-grow"></div>

      {/* <span className="text-sky-600">Pathname:&nbsp;{pathname==""?'/':pathname}</span>
      <Uploader pathname={pathname}></Uploader>
      <Link href={path.join("/files/", path.dirname(pathname))}>..</Link>
      {view_files.map((file) => {
        return (
          <div key={file.name + file.isFile}>
            {file.isFile() ? (
              <a
                href={path.join("/files/", pathname, file.name)}
                download
              >
                {file.name}
              </a>
            ) : (
              <Link
                href={path.join("/files/", pathname, file.name)}
              >
                {file.name}/
              </Link>
            )}
          </div>
        );
      })} */}
    </main>
  );
}
