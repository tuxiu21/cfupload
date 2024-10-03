
import path from "path";

const BASE_PATH = process.env.BASE_PATH!;
// export function getSingleFileDownloadUrl(tabUrlName:string,urlPath: string) {
//   const params = new URLSearchParams({
//     tabUrlName: tabUrlName,
//     urlPath: path.join(BASE_PATH, urlPath),
//   });
//   return "/api/download/direct?" + params;
// }
export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} bytes`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
}
export function formatUrlPath(tagName: string) {
  const res=tagName.match(/[a-zA-Z0-9]/g);
  const urlName=res ? res.join('').toLowerCase() : '';
  return urlName
}


