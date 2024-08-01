import Image from "next/image";
import fs, { Dirent } from "fs";
import Link from "next/link";
import { BASE_PATH } from "../../config";
import path from "path";
import { redirect, RedirectType } from "next/navigation";
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


  async function toUpload(formData:FormData) {
    'use server'
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    const file= formData.get("file")as File;

    if(!file){
      return
    }
    const fixedFilename=Buffer.from(file.name, 'latin1').toString('utf8');
    const filePath=path.join(BASE_PATH, pathname,fixedFilename);
    const writeStream=fs.createWriteStream(filePath); 
    const readStream=file.stream()
    console.log(file);


    const reader = readStream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      writeStream.write(value);

    }
    writeStream.end();


  }

  return (
    <>
      <span className="font-bold">file manager</span>
      <br />

      <br />

      <span className="text-sky-600">pathname:{pathname}</span><br />
      
      <form action={toUpload}>
        <input type="file" name="file"/>
        <button type="submit">upload</button>
      </form>


      <br />
      <Link href={path.join("/files/", path.dirname(pathname))}>..</Link>
      <br />
      {view_files.map((file) => {
        return (
          <>
            {file.isFile() ? (
              <a
                href={path.join("/files/", pathname, file.name)}
                key={file.name + file.isFile}
                download
              >
                {file.name}
              </a>
            ) : (
              <Link
                // href={path.join("/", pathname, file.name)}
                href={path.join("/files/", pathname, file.name)}
                key={file.name + file.isFile}
              >
                {file.name}/
              </Link>
            )}
            <br />
          </>
        );
      })}
    </>
  );
}
