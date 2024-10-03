import { usePathname } from "next/navigation";
import path from "path";

export function useTabPath(){
  const pathname = usePathname();
  // pathname = pathname.replace("/files", "");
  // const 
  // return pathname;
  const parts = pathname.split(path.sep);
  const tabUrlName = parts[2];
  const urlParentPath = parts.slice(3).join(path.sep);

  // console.log("tabUrlName", tabUrlName);
  // console.log("urlParentPath", urlParentPath);
  
  return {tabUrlName, urlParentPath};

}