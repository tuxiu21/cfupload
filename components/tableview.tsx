"use client";

import { View_Files } from "@/types";
import {
  CopyIcon,
  CreateFileIcon,
  CutIcon,
  DownloadIcon,
  FileIcon,
  FileUploadIcon,
  FolderIcon,
  FolderUploadIcon,
  InfoIcon,
  PlusIcon,
} from "@/components/icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import path from "path";
import { useTheme } from "next-themes";
function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} bytes`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(2)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
}
type SelectedFileType = {
  name: string;
  isFile: boolean;
};
export default function TableView({ view_files }: { view_files: View_Files }) {
  const [mounted, setMounted] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([]);

  const themeProps = useTheme();

  const [showInfoModal, setShowInfoModal] = useState(false);
  
  const linkRef = useRef<HTMLAnchorElement>(null);


  useEffect(() => {
    // 等挂载好再显示 不然会出现水合问题
    setMounted(true);
  }, []);

  

  const handleDownload = () => {
    console.log(selectedFiles);

    if(!linkRef.current) return;
    const parentPath = view_files[0].parentPath
    // 这里直接把需要下载的对象传过去
    
  };
  const handleShowInfo = () => {
    console.log(selectedFiles);

    if (selectedFiles.length >= 1) {
      setShowInfoModal(true);
    } 
  };

  // 重新渲染时候会进行执行 所以不必将其设为state
  let singleInfo: undefined | View_Files[number];
  if (selectedFiles.length === 1) {
    singleInfo = view_files.find((file) => {
      return (
        file.name === selectedFiles[0].name &&
        file.isFile === selectedFiles[0].isFile
      );
    });
  }
  let multipleInfo:
    | undefined
    | { fileCount: number; folderCount: number; size: number };
  if (selectedFiles.length > 1) {
    multipleInfo = selectedFiles.reduce(
      (prev, current) => {
        const file = view_files.find((file) => {
          return file.name === current.name && file.isFile === current.isFile;
        });
        if (file) {
          if (file.isFile) {
            prev.size += file.size;
            prev.fileCount++;
          } else {
            prev.folderCount++;
          }
        }
        return prev;
      },
      { fileCount: 0, folderCount: 0, size: 0 }
    );
  }

  return (
    <>
      {mounted && (
        <div className="basis-4 grow  relative overflow-x-hidden">
          {/* 表格主体 */}
          <div className="h-full overflow-y-scroll">
            {/* 表格的样式只加了table和checkbox */}
            <table className="table table-fixed">
              <thead>
                <tr>
                  <th className="w-10">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(e) => {
                          const checkbox = e.target as HTMLInputElement;
                          if (checkbox.checked) {
                            setSelectedFiles(
                              view_files.map((file) => {
                                return {
                                  name: file.name,
                                  isFile: file.isFile,
                                };
                              })
                            );
                          } else {
                            setSelectedFiles([]);
                          }
                        }}
                      />
                    </label>
                  </th>
                  <th className="w-1/2">Filename</th>
                  <th className="max-sm:hidden">Modify Date</th>
                  <th className="w-16">Size</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {view_files.map((view_file) => {
                  return (
                    <tr key={view_file.name + view_file.isFile}>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={selectedFiles.some(
                              (file) =>
                                file.name === view_file.name &&
                                file.isFile === view_file.isFile
                            )}
                            onChange={(e) => {
                              const checkbox = e.target as HTMLInputElement;

                              setSelectedFiles((prev) => {
                                if (checkbox.checked) {
                                  return [
                                    ...prev,
                                    {
                                      name: view_file.name,
                                      isFile: view_file.isFile,
                                    },
                                  ];
                                } else {
                                  return prev.filter(
                                    (file) =>
                                      !(
                                        file.name === view_file.name &&
                                        file.isFile === view_file.isFile
                                      )
                                  );
                                }
                              });
                              console.log(selectedFiles);
                            }}
                          />
                        </label>
                      </th>
                      <td>
                        <div className="flex flex-row items-center gap-2">
                          {view_file.isFile ? (
                            <>
                              <FileIcon className="min-w-5  h-5" />{" "}
                              <span className="truncate">{view_file.name}</span>
                            </>
                          ) : (
                            <>
                              <FolderIcon className="min-w-5 h-5" />
                              <Link
                                href={path.join(
                                  "/files/",
                                  view_file.parentPath,
                                  view_file.name
                                )}
                                className="truncate"
                              >
                                {view_file.name}
                              </Link>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="max-sm:hidden">
                        {new Date(view_file.mtimeMs).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </td>
                      <td>
                        <span className="whitespace-nowrap">
                          {view_file.isFile ? formatSize(view_file.size) : "-"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* 右侧菜单 */}
          <div className="absolute w-full h-full top-0 left-0 overflow-y-scroll pointer-events-none overflow-x-hidden">
            <div
              // transition必须要有初始值
              className={
                "transition-all ease-in  absolute left-full top-1/4 pointer-events-auto " +
                (selectedFiles.length > 0
                  ? "-translate-x-full"
                  : "translate-x-0")
              }
            >
              <ul
                className={
                  "menu bg-base-200 shadow-xl " +
                  (themeProps.resolvedTheme == "cyberpunk"
                    ? ""
                    : "rounded-l-xl ")
                }
              >
                <li>
                  <a
                    className="tooltip tooltip-left"
                    data-tip="Download"
                    onClick={handleDownload}
                  >
                    <DownloadIcon className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a
                    className="tooltip tooltip-left"
                    data-tip="Info"
                    onClick={handleShowInfo}
                  >
                    <InfoIcon className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a className="tooltip tooltip-left" data-tip="Cut">
                    <CutIcon className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a className="tooltip tooltip-left" data-tip="Copy">
                    <CopyIcon className="h-5 w-5" />
                  </a>
                </li>
              </ul>
            </div>
            <a ref={linkRef} className="hidden" download></a>
          </div>
          {/* 菜单对话框 */}
          <div>
            <dialog className={" modal " + (showInfoModal ? "modal-open" : "")}>
              <div className="modal-box">
                <form method="dialog">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => setShowInfoModal(false)}
                  >
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Details</h3>
                {singleInfo ? (
                  <>
                    <div className="grid grid-cols-2 gap-2 py-4">
                      <div className="flex flex-col">
                        <small className="text-default-500">Name</small>
                        <p>{singleInfo.name}</p>
                      </div>
                      <div className="flex flex-col">
                        <small className="text-default-500">Type</small>
                        {/* <p>{singleInfo.isFile ? "文件" : "文件夹"}</p> */}
                        <p>{singleInfo.isFile ? "File" : "Folder"}</p>
                      </div>
                      <div className="flex flex-col">
                        <small className="text-default-500">Size</small>
                        <p>
                          {singleInfo.isFile
                            ? formatSize(singleInfo.size)
                            : "-"}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <small className="text-default-500">Path</small>
                        <p>{singleInfo.parentPath}</p>
                      </div>

                      <div className="flex flex-col">
                        <small className="text-default-500">Create Time</small>
                        {/* <p>{singleInfo.birthtimeMs}</p> */}
                        <p>
                          {new Date(singleInfo.birthtimeMs).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <small className="text-default-500">Modify Time</small>
                        <p>
                          {new Date(singleInfo.mtimeMs).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {multipleInfo ? (
                  <>
                    <div className="grid grid-cols-2 gap-2 py-4">
                      <div className="flex flex-col">
                        <small className="text-default-500">
                          Number of files
                        </small>
                        <p>{multipleInfo.fileCount}</p>
                      </div>
                      <div className="flex flex-col">
                        <small className="text-default-500">
                          Number of folders
                        </small>
                        <p>{multipleInfo.folderCount}</p>
                      </div>
                      <div className="flex flex-col">
                        <small className="text-default-500">Total</small>
                        {multipleInfo.fileCount+multipleInfo.folderCount}
                      </div>
                      <div className="flex flex-col">
                        <small className="text-default-500">Size</small>
                        {multipleInfo.folderCount > 0 ? (
                          "-"
                        ) : (
                          <p>{formatSize(multipleInfo.size)}</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </dialog>
          </div>
        </div>
      )}
    </>
  );
}
