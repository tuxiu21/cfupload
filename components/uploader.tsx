"use client";

import { useState } from "react";
// import { CHUNK_SIZE } from "@/app/config";
import { chunkUpload } from "../app/files/[[...path_slug]]/action";
import { v4 as uuidv4 } from "uuid";

const CHUNK_SIZE = 1024 * 1024 * Number(process.env.NEXT_PUBLIC_CHUNK_SIZE_MB);

export default function Uploader(props: { pathname: string }) {
  const { pathname } = props;

  const [uploadedIndex, setUploadedIndex] = useState(-1);
  const [chunkTotal, setChunkTotal] = useState(0);
  const [currentFileName, setCurrentFileName] = useState("");

  async function handleUpload(formData: FormData) {
    const files = formData.getAll("files") as File[];
    // console.log(file);
    if (!files) {
      return;
    }
    files.forEach(async (file, index) => {
      console.log(file, index);
      setCurrentFileName(file.name);

      const chunks = Math.ceil(file.size / CHUNK_SIZE);
      const uuid = uuidv4();
      
      console.log('chunks!!!!!!!'+chunks);
      
      setChunkTotal(chunks);
      
  
      for (let index = 0; (file.size+CHUNK_SIZE) >= (index + 1) * CHUNK_SIZE; index++) {
        const start = index * CHUNK_SIZE;
        // const end=Math.min(file.size,(index+1)*CHUNK_SIZE);
        const end = (index + 1) * CHUNK_SIZE;
        const blob = file.slice(start, end);
        const chunkFormData = new FormData();
        chunkFormData.append("file", blob);
        chunkFormData.append("filename", file.name);
        
        chunkFormData.append("uuid", uuid);
        chunkFormData.append("index", index.toString());
        chunkFormData.append("chunks", chunks.toString());
        chunkFormData.append("pathname", pathname);
        console.log(chunkFormData);
        chunkFormData.forEach((value, key) => {
          console.log(key, value);
        });
        await chunkUpload(chunkFormData);
  
        setUploadedIndex(index);
        
        
      }
    });
  }

  return (
    // 这里不要在action内直接写函数 会造成setState延迟
    <form
      action={(formData: FormData) => {
        handleUpload(formData);

      }}
    >
      <input type="file" name="files" multiple />
      <button type="submit">upload</button>
      <br />
      <span>
        filename:{currentFileName}
      </span><br />
      <span>
        chunks:{uploadedIndex + 1}/{chunkTotal}
      </span>
    </form>
  );
}
