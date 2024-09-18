'use server';

import { FolderIcon } from "@/components/icons";
import { getTagBasePath } from "@/utils";
import fs, { Dirent } from "fs";
import path from "path";



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

// export async function getFilesPlainObj(urlParentPath: string) {
//   const filesDirent = await getFiles(urlParentPath);
//   console.log(filesDirent);

//   // const relativePath = path.relative(BASE_PATH, urlParentPath);
//   return filesDirent.map((file) => {
//     return {
//       name: file.name,
//       urlParentPath: urlParentPath,
//       isFile: file.isFile(),
//     };
//   });
// }

export async function getFoldersUlInfo(urlParentPath: string) {
  const tag_basepath=getTagBasePath('/')
  const filesDirent = await getFiles(path.join(tag_basepath,'/'),urlParentPath);
  const folders = filesDirent.filter((file) => !file.isFile());

  // 判断文件夹是否有文件夹
  const promises= folders.map(async (folder) => {
    const dir = await fs.promises.opendir(path.join(tag_basepath, urlParentPath, folder.name))
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




