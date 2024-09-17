'use server';

import { FolderIcon } from "@/components/icons";
import fs, { Dirent } from "fs";
import path from "path";

const BASE_PATH = process.env.BASE_PATH!;


export async function getFiles(parentPath: string): Promise<Dirent[]> {
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
      path.join(BASE_PATH, parentPath),
      { withFileTypes: true },
      callback
    );
  });
}

export async function getFilesPlainObj(parentPath: string) {
  const filesDirent = await getFiles(parentPath);
  console.log(filesDirent);

  // const relativePath = path.relative(BASE_PATH, parentPath);
  return filesDirent.map((file) => {
    return {
      name: file.name,
      parentPath: parentPath,
      isFile: file.isFile(),
    };
  });
}

export async function getFoldersUlInfo(parentPath: string) {
  const filesDirent = await getFiles(parentPath);
  const folders = filesDirent.filter((file) => !file.isFile());

  // 判断文件夹是否有文件夹
  const promises= folders.map(async (folder) => {
    const dir = await fs.promises.opendir(path.join(BASE_PATH, parentPath, folder.name))
    for await (const dirent of dir) {
      if(dirent.isDirectory()){
        return {
          name: folder.name,
          parentPath: parentPath,
          isFile: folder.isFile(),
          hasFolder: true
        }
      }
    }
    return {
      name: folder.name,
      parentPath: parentPath,
      isFile: folder.isFile(),
      hasFolder: false
    }
  })
  return Promise.all(promises)


}




