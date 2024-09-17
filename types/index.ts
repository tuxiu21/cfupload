import { SVGProps } from "react";
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type viewFiles =   {
  size: number;
  mtimeMs: number;
  name: string;
  parentPath: string;
  // path: string;
  isFile: boolean;
  birthtimeMs: number;
}[]
export type SelectedFileType = {
  name: string;
  isFile: boolean;
};

export type ToastMessage={
  success: boolean;
  message: string;
  duration?: number;
}
export type Tab = {
  tabName: string;
  urlName: string;
  pathName: string;
  // permissions: string[];
  permissions: ('visitorVisible' | 'visitorFullAccess' )[];
}