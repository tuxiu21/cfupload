'use client'

import { useEffect } from "react";


function download(){
    // let blob_url = "";
  // 发现这是文件 下载该文件
  const blob = new Blob(["testfile!!"], { type: "text/plain" });
  const blob_url = URL.createObjectURL(blob);
  console.log(blob_url);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = blob_url;
  a.download = 'testfile.txt'; // 替换为实际的文件名
  document.body.appendChild(a);
  a.click();
}


export default function FileDownloader() {
  

  useEffect(() => {
    download();
  }, []);
  
  return <div>
    1
  </div>
}
