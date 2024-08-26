import { usePathname } from "next/navigation";

export function useParentPath(){
  let pathname = usePathname();
  pathname = pathname.replace("/files", "");
  return pathname;
}