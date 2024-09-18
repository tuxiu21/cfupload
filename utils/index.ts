import { usePathname } from "next/navigation";
import path from "path";

// base_path只能在这里引入
const BASE_PATH = process.env.BASE_PATH!;
export function getSingleFileUrl(filepath: string) {
  const params = new URLSearchParams({
    filepath: path.join(BASE_PATH, filepath),
  });
  return "/api/download/direct?" + params;
}
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
export function getTagBasePath(tagPath: string) {
  return path.join(BASE_PATH, tagPath);
}