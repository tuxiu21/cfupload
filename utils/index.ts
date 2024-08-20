import path from "path";
const BASE_PATH = process.env.BASE_PATH!;
export function getSingleFileUrl(filepath: string) {
  const params = new URLSearchParams({
    filepath: path.join(BASE_PATH, filepath),
  });
  return "/api/download/direct?" + params;
}