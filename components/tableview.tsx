"use client";

import { Tab, viewFiles } from "@/types";
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
import { formatSize } from "@/utils";

import { useSelectedFiles, useViewFiles } from "@/app/(main)/files/providers";

export default function TableView({viewFiles,tabUrlName,urlParentPath}: {viewFiles: viewFiles;tabUrlName:string;urlParentPath:string}) {

  const { selectedFiles, setSelectedFiles } = useSelectedFiles();
  const { setViewFiles} = useViewFiles();

  const [selectAllChecked, setSelectAllChecked] = useState(false);



  useEffect(() => {
    // 等挂载好再显示 不然会出现水合问题
    // setMounted(true);
    setViewFiles(viewFiles);
  }, []);

  useEffect(() => {
    // 选中的文件变化时 viewFiles也要变化
    setViewFiles(viewFiles);

    // 如果选中的文件为空 取消选择
    if(selectedFiles.length === 0){
      setSelectAllChecked(false);
    }

  }, [selectedFiles]);

  useEffect(() => {
    // 每次切换目录都清空选中的文件
    setSelectedFiles([]);
  }, [urlParentPath]);

  return (
    <>
        <div className="basis-4 grow   overflow-x-hidden">
          {/* 表格主体 */}
          <div className="h-full overflow-y-scroll">
            {/* 表格的样式只加了table和checkbox */}
            <table className="table">
              <thead>
                <tr>
                  <th className="pr-0">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(e) => {

                          setSelectAllChecked(!selectAllChecked);

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
                        checked={
                          selectAllChecked
                        }
                      />
                    </label>
                  </th>
                  <th className="">Filename</th>
                  <th className="max-lg:hidden ">Modify Date</th>
                  <th className="">Size</th>

                </tr>
              </thead>
              <tbody>
                {viewFiles.map((view_file) => {
                  return (
                    <tr key={view_file.name + view_file.isFile}>
                      <th className="pr-0">
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
                        <div className="flex flex-row items-center gap-2 w-28 sm:w-48 md:w-72 lg:w-80">
                          {view_file.isFile ? (
                            <>
                              <FileIcon className="min-w-5  h-5" />{" "}
                              <span className="truncate">{view_file.name}</span>
                            </>
                          ) : (
                            <>
                              <FolderIcon className="min-w-5 h-5" />
                              <Link
                                // href={path.join(
                                //   "/files/",
                                //   tabUrlName,
                                //   view_file.urlParentPath,
                                //   view_file.name
                                // )}
                                href={view_file.href}
                                // href={view_file.name+'000'}
                                className="truncate"
                              >
                                {view_file.name}
                              </Link>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="max-sm:hidden max-lg:hidden truncate">
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
      
    </>
  );
}
