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
import { useEffect, useState } from "react";
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


  useEffect(() => {
    // console.log(view_files);
    // 等挂载好再显示 不然会出现水合问题
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className="flex-grow  relative overflow-x-hidden">
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
                            checked={
                              selectedFiles.some(
                                (file) =>
                                  file.name === view_file.name &&
                                  file.isFile === view_file.isFile
                              )
                            }
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
                            <FileIcon className="min-w-5  h-5" />
                          ) : (
                            <FolderIcon className="min-w-5 h-5" />
                          )}
                          <span className="truncate">{view_file.name}</span>
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
          <div 
          className="absolute  top-1/4 right-0 "
          // className="absolute  top-1/4 left-full "
          // className="fixed  top-1/4 left-full "
          >

            <ul className="menu bg-base-200 rounded-l-xl shadow-xl">
              <li>
                <a className="tooltip tooltip-left" data-tip="Download">
                  <DownloadIcon className="h-5 w-5" />
                </a>
              </li>
              <li>
                <a className="tooltip tooltip-left" data-tip="Info">
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
        </div>
      )}
    </>
  );
}
