'use server'
import fs from "fs";
import path from "path";
import os from "os";
import { SelectedFileType } from "@/types";
import { getSingleFileUrl } from "@/utils";
import archiver from "archiver";
import { Readable } from "stream";

const tmp_path = os.tmpdir();
const BASE_PATH = process.env.BASE_PATH!;

export async function deleteFile(selectedFiles: SelectedFileType[], parentPath: string) {

  for (const { name, isFile } of selectedFiles) {
    const filePath = path.join(BASE_PATH, parentPath, name);
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



  // const filePath = path.join(BASE_PATH, parentPath, name);
  // try {
  //   const res = await fs.promises.stat(filePath)
  //   if (isFile) {
  //     await fs.promises.unlink(filePath)
  //   }else{
  //     await fs.promises.rmdir(filePath, { recursive: true })
  //   }
  //   return {
  //     success: true,
  //     message: "File deleted successfully"
  //   }
  // } catch (e) {
  //   return {
  //     success: false,
  //     message: "Error deleting file"
  //   }
  // }

}

export async function addFile(name: string, isFile: boolean, parentPath: string) {
  const filePath = path.join(BASE_PATH, parentPath, name);
  // console.log(filePath);

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
  // 取得表单参数
  const file = chunkFormData.get("file") as File;
  const filename = chunkFormData.get("filename") as string;
  const uuid = chunkFormData.get("uuid") as string;
  const index = Number(chunkFormData.get("index"));
  const chunks = Number(chunkFormData.get("chunks"));
  const pathname = chunkFormData.get("pathname") as string;

  const filePath = path.join(tmp_path, uuid);

  // 写入文件
  const writeStream = fs.createWriteStream(filePath, { flags: 'a' });
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


  if (index + 1 === chunks) {
    const destPath = path.join(BASE_PATH, pathname, filename);
    fs.renameSync(filePath, destPath);
  }
}

