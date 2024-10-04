'use server';

import { FolderIcon } from "@/components/icons";
import fs, { Dirent } from "fs";
import path from "path";

const BASE_PATH = process.env.BASE_PATH!;

export async function getFiles(tag_basepath:string,urlParentPath: string): Promise<Dirent[]> {
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
      path.join(tag_basepath, urlParentPath),
      { withFileTypes: true },
      callback
    );
  });
}


export async function getFoldersUlInfo(urlParentPath: string) {
  // const tag_basepath=getTagBasePath('/')
  const filesDirent = await getFiles(BASE_PATH,urlParentPath);
  const folders = filesDirent.filter((file) => !file.isFile());

  // 判断文件夹是否有文件夹
  const promises= folders.map(async (folder) => {
    const dir = await fs.promises.opendir(path.join(BASE_PATH, urlParentPath, folder.name))
    for await (const dirent of dir) {
      if(dirent.isDirectory()){
        return {
          name: folder.name,
          urlParentPath: urlParentPath,
          isFile: folder.isFile(),
          hasFolder: true
        }
      }
    }
    return {
      name: folder.name,
      urlParentPath: urlParentPath,
      isFile: folder.isFile(),
      hasFolder: false
    }
  })
  return Promise.all(promises)


}




