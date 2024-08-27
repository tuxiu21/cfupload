import { SVGProps } from "react";
import fs, { Dirent } from "fs";
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