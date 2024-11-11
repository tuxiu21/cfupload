'use server'
import fs from "fs";
import path from "path";
import os from "os";
import { SelectedFileType } from "@/types";
import { cache } from "react";
import { verifyTab } from "@/app/action-cached";
import { redirect } from "next/navigation";
import { getFullFilePathByTabUrlName } from "@/app/action";

// 不用tmp_path 因为不能跨卷移动文件 并且tmp分区可能比较小
// const tmp_path = os.tmpdir();



export async function pasteFiles(
  tabUrlName: string,
  selectedFiles: SelectedFileType[],
  originurlParentPath: string,
  urlParentPath: string,
  action: "copy" | "cut"
) {

  if (!(await verifyTab(tabUrlName))) {
    redirect('/login')
  }

  if(originurlParentPath === urlParentPath){
    return {
      success: false,
      message: "Please select a different destination"
    }
  }

  const actionFunc = action === "copy" ? fs.promises.cp : fs.promises.rename;
  for (const { name, isFile } of selectedFiles) {
    const src = await getFullFilePathByTabUrlName(tabUrlName, path.join(originurlParentPath, name));
    const dest = await getFullFilePathByTabUrlName(tabUrlName, path.join(urlParentPath, name));


    try {
      await actionFunc(src, dest, { recursive: true });
    } catch (e) {
      return {
        success: false,
        message: "Error pasting file"
      }
    }

  }
  return {
    success: true,
    message: "File pasted successfully"
  }

}



export async function deleteFile(tabUrlName: string, selectedFiles: SelectedFileType[], urlParentPath: string) {

  if (!(await verifyTab(tabUrlName))) {
    redirect('/login')
  }

  for (const { name, isFile } of selectedFiles) {
    // const filePath = path.join(BASE_PATH, urlParentPath, name);
    const filePath = await getFullFilePathByTabUrlName(tabUrlName, path.join(urlParentPath, name));
    try {
      const res = await fs.promises.stat(filePath)
      if (isFile) {
        await fs.promises.unlink(filePath)
      } else {
        await fs.promises.rmdir(filePath, { recursive: true })
      }
    } catch (e) {
      return {
        success: false,
        message: "Error deleting file"
      }
    }
  }
  return {
    success: true,
    message: "File deleted successfully"
  }
}

export async function addFile(tabUrlName:string,name: string, isFile: boolean, urlParentPath: string) {

  if (!(await verifyTab(tabUrlName))) {
    redirect('/login')
  }

  // const filePath = path.join(BASE_PATH, urlParentPath, name);
  const filePath = await getFullFilePathByTabUrlName(tabUrlName, path.join(urlParentPath, name));

  try {
    // 如果没报错 说明有文件 
    const res = await fs.promises.stat(filePath)
    return {
      success: false,
      message: "File already exists"
    }
  } catch (e) {
    if (isFile) {
      await fs.promises.writeFile(filePath, "");
    } else {
      await fs.promises.mkdir(filePath);
    }
    return {
      success: true,
      message: "File created successfully"
    }
  }
}

export async function chunkUpload(chunkFormData: FormData) {

  const tabUrlName = chunkFormData.get("tabUrlName") as string;

  if (!(await verifyTab(tabUrlName))) {
    redirect('/login')
  }


  // 取得表单参数
  const file = chunkFormData.get("file") as File;
  const filename = chunkFormData.get("filename") as string;
  const uuid = chunkFormData.get("uuid") as string;
  const index = Number(chunkFormData.get("index"));
  const chunks = Number(chunkFormData.get("chunks"));
  const pathname = chunkFormData.get("pathname") as string;

  const destPath = await getFullFilePathByTabUrlName(tabUrlName, path.join(pathname, filename));

  // const filePath = path.join(tmp_path, uuid);

  // 写入文件
  // 如果是第一个chunk 需要删除原文件 并且创建文件夹
  if (index === 0) {
    await fs.promises.rm(destPath, { force: true });
    await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
  }

  const writeStream = fs.createWriteStream(destPath, { flags: 'a' });
  const readStream = file.stream()
  const reader = readStream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    writeStream.write(value);

  }
  writeStream.end();

  await new Promise((resolve) => {
    writeStream.on('close', () => {
      resolve(null);
    });
  }
  );

  // 这里还要考虑文件size为0的情况 也就是chunks为0的情况
  // if (index + 1 === chunks || chunks === 0) {
  //   // const destPath = path.join(BASE_PATH, pathname, filename);
  //   const destPath = await getFullFilePathByTabUrlName(tabUrlName, path.join(pathname, filename));

  //   // 如果文件已经存在 删除
  //   await fs.promises.rm(destPath, { force: true });


  //   await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
  //   await fs.promises.rename(filePath, destPath);
  // }
}
