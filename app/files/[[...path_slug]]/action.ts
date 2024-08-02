'use server'
// import { BASE_PATH } from "@/app/config";
import fs from "fs";
import path from "path";
import os from "os";

const tmp_path = os.tmpdir();
const BASE_PATH = process.env.BASE_PATH!;
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
  // reader.releaseLock();
  writeStream.end();

  await new Promise((resolve) => {
    writeStream.on('close', () => {
      resolve(null);
    });
  }
  ); 


  if (index + 1 === chunks) {
    const destPath = path.join(BASE_PATH, pathname, filename);
    fs.renameSync(filePath,destPath);
  }
}

