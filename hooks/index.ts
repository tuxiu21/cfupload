import { usePathname } from "next/navigation";
import path from "path";

export function useTabPath(){
  const pathname = usePathname();
  // pathname = pathname.replace("/files", "");
  // const 
  // return pathname;
  const parts = pathname.split(path.sep);
  const tabUrl = parts[2];
  const urlParentPath = parts.slice(3).join(path.sep);

  // console.log("tabUrl", tabUrl);
  // console.log("urlParentPath", urlParentPath);
  
  return {tabUrl, urlParentPath};

}