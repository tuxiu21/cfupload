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
    <>
      <span className="font-bold">file manager</span>
      <br />

      <br />

      <span className="text-sky-600">pathname:{pathname}</span>
      <br />

      {/* <form action={toUpload}>
        <input type="file" name="file"/>
        <button type="submit">upload</button>
      </form> */}
      <Uploader pathname={pathname}></Uploader>

      <br />
      <Link href={path.join("/files/", path.dirname(pathname))}>..</Link>
      <br />
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
            <br />
          </div>
        );
      })}
    </>
  );
}
