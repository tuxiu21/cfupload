"use client";

import { viewFiles } from "@/types";
import {
  CopyIcon,
  CreateFileIcon,
  CutIcon,
  DeleteIcon,
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
import { SelectedFileType } from "@/types";
import { formatSize, getSingleFileUrl } from "@/utils";
import { Readable } from "stream";
import Toast from "./toast";

import { useRouter } from "next/navigation";
import { useSelectedFiles, useViewFiles } from "@/app/files/providers";
import { useParentPath } from "@/hooks";

export default function TableView({ viewFiles }: { viewFiles: viewFiles }) {
  const [mounted, setMounted] = useState(false);

  // const [selectedFiles, setSelectedFiles] = useState<SelectedFileType[]>([]);
  const { selectedFiles, setSelectedFiles } = useSelectedFiles();
  const { setViewFiles} = useViewFiles();

  // setViewFiles(viewFiles);
  const parentPath=useParentPath()


  useEffect(() => {
    // 等挂载好再显示 不然会出现水合问题
    setMounted(true);
    setViewFiles(viewFiles);
  }, []);

  useEffect(() => {
    // 每次切换目录都清空选中的文件
    setSelectedFiles([]);
  }, [parentPath]);

  return (
    <>
      {mounted && (
        <div className="basis-4 grow   overflow-x-hidden">
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
                              viewFiles.map((file) => {
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
                  <th className="">Filename</th>
                  <th className="max-sm:hidden">Modify Date</th>
                  <th className="w-16">Size</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {viewFiles.map((view_file) => {
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
                      <td className="max-sm:hidden truncate">
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
        </div>
      )}
    </>
  );
}
