import Image from "next/image";
import fs, { Dirent } from "fs";
import Link from "next/link";
// import { BASE_PATH } from "../../config";
import path from "path";
import { redirect, RedirectType } from "next/navigation";
// import Uploader from "../../../components/uploader";

import TableView from "@/components/tableview";
// import { getFiles,  } from "./action";
import { getFiles } from "./action";
import { getTabByUrlName,  } from "@/app/action";
import { LockedIcon } from "@/components/icons";
import { verifySessionAction } from "@/app/action-cached";
const BASE_PATH = process.env.BASE_PATH!;

export default async function Files({
  params,
}: {
  params: {
    tab: string;
    path_slug?: string[];
  };
}) {
  // 验证用户身份
  const { isAuth, username } = await verifySessionAction();

  const tab = await getTabByUrlName(params.tab);
  if (!tab) {
    throw new Error("Tab not found");
  }
  if (
    !isAuth &&
    !(
      tab.permissions.includes("visitorFullAccess") ||
      tab.permissions.includes("visitorReadOnly")
    )
  ) {
    // 这里直接返回一个页面，提示用户没有权限
    // 未授权的用户接触不到数据
    return (
      <div className="grow flex flex-col items-center justify-center">
        <LockedIcon className="w-24 h-24 " />
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-center">
          {
            "You do not have permission to access this directory, please login first."
          }
        </p>
      </div>
    );
  }

  const tag_basepath = path.join(BASE_PATH, tab.pathName);

  let urlParentPath = "";
  if (params.path_slug) {
    urlParentPath = path.join(...params.path_slug);
    urlParentPath = decodeURIComponent(urlParentPath);
  }

  // 判断这个路径是文件还是目录
  const stat = await fs.promises.stat(path.join(tag_basepath, urlParentPath));
  if (stat.isFile()) {
    // 发现这是文件 下载该文件
    // 在这里我们可以实现wget的下载
    const searchParams = new URLSearchParams({
      tabUrlName: tab.urlName,
      urlPath: urlParentPath,
    });
    redirect("/api/download/direct?"+searchParams);
  }

  const filesDirent = await getFiles(tag_basepath, urlParentPath);

  const viewFiles = await Promise.all(
    filesDirent.map(async (file) => {
      const stat = await fs.promises.stat(
        path.join(tag_basepath, urlParentPath, file.name)
      );

      return {
        name: file.name,
        urlParentPath: urlParentPath,
        isFile: file.isFile(),
        size: stat.size,
        mtimeMs: stat.mtimeMs,
        birthtimeMs: stat.birthtimeMs,
        href: path.join("/files", params.tab, urlParentPath, file.name),
      };
    })
  );

  // 这里判断如果是只读状态 增加一点margin
  const visibleOnly = !(isAuth || tab.permissions.includes("visitorFullAccess"));
// +(visibleOnly && 'mx-4')
  return (
    <>
      <div className={"mx-6 breadcrumbs text-sm "+(visibleOnly ?" mx-10 ":"")}>
        <ul>
          <li>
            <Link href={path.join("/files", params.tab)}>{tab.tabName}</Link>
          </li>
          {urlParentPath.split(path.sep).map((name, index, arr) => {
            // array（可选）：调用 map 方法的原数组。
            const href = path.join(
              "/files",
              params.tab,
              ...arr.slice(0, index + 1)
            );

            return (
              <li key={href}>
                <Link href={href}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <TableView
        viewFiles={viewFiles}
        tabUrlName={params.tab}
        urlParentPath={urlParentPath}
        className={visibleOnly ? " px-4 ":""}
      />
    </>
  );
}
