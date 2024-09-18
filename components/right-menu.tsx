"use client";
import { SelectedFileType, viewFiles } from "@/types";
import {
  CancelIcon,
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
  PasteIcon,
  PlusIcon,
} from "@/components/icons";
import { deleteFile, pasteFiles } from "@/app/(main)/files/action";
import {  useTabPath } from "@/hooks";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import path from "path";
import { useEffect, useRef, useState } from "react";
import { useToast } from "./toast-provider";
import { formatSize } from "@/utils";
import { useSelectedFiles, useViewFiles } from "@/app/(main)/files/providers";

enum ClipboardStatus {
  None,
  Copy,
  Cut,
}

export default function RightMenu() {
  const { selectedFiles, setSelectedFiles } = useSelectedFiles();
  const { viewFiles } = useViewFiles();
  const { tabUrl, urlParentPath } = useTabPath();
  const themeProps = useTheme();

  const [clipboardStatus, setClipboardStatus] = useState(ClipboardStatus.None);

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();

  const linkRef = useRef<HTMLAnchorElement>(null);

  const clipboardRef = useRef({
    files: [] as SelectedFileType[],
    urlParentPath: "",
  });

  const [mounted, setMounted] = useState(false);

  const toast = useToast();

  useEffect(() => {
    setMounted(true);
    // return () => {

    // };
  }, []);

  const handleDownload = async () => {
    console.log(selectedFiles);

    if (!linkRef.current) return;

    // 如果选中单个并且是文件
    if (selectedFiles.length === 1 && selectedFiles[0].isFile) {
      linkRef.current.href =
        "/files/" + path.join(urlParentPath, selectedFiles[0].name);
      linkRef.current.click();
      return;
    }

    // 这里直接把需要下载的对象传过去
    const res = await fetch("/api/download/processed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        urlParentPath,
        selectedFiles,
      }),
    });
    const uuid = await res.text();
    const params = new URLSearchParams({ uuid: uuid });
    linkRef.current.href = "/api/download/processed?" + params;
    linkRef.current.click();
  };
  const handleShowInfo = () => {
    console.log(selectedFiles);

    if (selectedFiles.length >= 1) {
      setShowInfoModal(true);
    }
  };
  const handleDelete = () => {
    console.log(selectedFiles);

    if (selectedFiles.length >= 1) {
      setShowDeleteModal(true);
    }
  };
  const toDeleteFile = async () => {
    const res = await deleteFile(selectedFiles, urlParentPath);

    toast(res);
    if (res.success) {
      setShowDeleteModal(false);

      setSelectedFiles([]);

      router.refresh();
    }
  };
  const handleClipAction = (status: ClipboardStatus) => {
    setClipboardStatus(status);
    clipboardRef.current = {
      files: selectedFiles,
      urlParentPath,
    };
    setSelectedFiles([]);
  };
  const handlePaste = async () => {
    const res = await pasteFiles(
      clipboardRef.current.files,
      clipboardRef.current.urlParentPath,
      urlParentPath,
      clipboardStatus === ClipboardStatus.Copy ? "copy" : "cut"
    );

    toast(res);

    if (res.success) {
      setClipboardStatus(ClipboardStatus.None);
      router.refresh();
    }
  };

  // 重新渲染时候会进行执行 所以不必将其设为state
  let singleInfo: undefined | viewFiles[number];
  if (selectedFiles.length === 1) {
    singleInfo = viewFiles.find((file) => {
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
        const file = viewFiles.find((file) => {
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

  // console.log("right-menu渲染");

  let menuExtraClass = "";
  let menuClipboardExtraClass = "";
  // 为了防止tooltip还在显示 要再往右移动一点
  if (selectedFiles.length == 0 && clipboardStatus === ClipboardStatus.None) {
    menuExtraClass = " translate-x-full ";
    menuClipboardExtraClass = " translate-x-full ";
  }

  if (selectedFiles.length >= 1 && clipboardStatus === ClipboardStatus.None) {
    menuExtraClass = " -translate-x-full ";
    menuClipboardExtraClass = " translate-x-full ";
  }
  if (
    clipboardStatus === ClipboardStatus.Cut ||
    clipboardStatus === ClipboardStatus.Copy
  ) {
    menuExtraClass = " translate-x-full ";
    menuClipboardExtraClass = " -translate-x-full ";
  }

  return (
    <>
      {mounted && (
        <>
          {/* 右侧菜单 */}
          <div className="absolute w-full h-full top-0 left-0 overflow-y-scroll pointer-events-none overflow-x-hidden invisible">
            <div
              // transition必须要有初始值
              className={
                "transition-all ease-in  absolute left-full top-1/4 pointer-events-auto visible " +
                menuExtraClass
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
                  <a
                    className="tooltip tooltip-left"
                    data-tip="Cut"
                    onClick={() => {
                      handleClipAction(ClipboardStatus.Cut);
                    }}
                  >
                    <CutIcon className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a
                    className="tooltip tooltip-left"
                    data-tip="Copy"
                    onClick={() => {
                      handleClipAction(ClipboardStatus.Copy);
                    }}
                  >
                    <CopyIcon className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a
                    className="tooltip tooltip-left"
                    data-tip="Delete"
                    onClick={handleDelete}
                  >
                    <DeleteIcon className="h-5 w-5" />
                  </a>
                </li>
              </ul>
            </div>
            <div
              className={
                "transition-all ease-in  absolute left-full top-1/4 pointer-events-auto visible " +
                menuClipboardExtraClass
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
                    data-tip="Paste"
                    onClick={handlePaste}
                  >
                    <PasteIcon className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a
                    className="tooltip tooltip-left"
                    data-tip="Cancel"
                    onClick={() => {
                      setClipboardStatus(ClipboardStatus.None);
                    }}
                  >
                    <CancelIcon className="h-5 w-5" />
                  </a>
                </li>
              </ul>
            </div>
            <a ref={linkRef} className="hidden" download></a>
            {/* <Toast
          show={showToast}
          success={toastRes.success}
          message={toastRes.message}
        /> */}
          </div>
          {/* 菜单对话框 */}
          <div>
            <dialog className={" modal " + (showInfoModal ? "modal-open" : "")}>
              <div className="modal-box">
                <form method="dialog">
                  <button
                    className="btn btn-sm btn-square btn-ghost absolute right-2 top-2"
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
                        <p className="text-wrap break-words">
                          {singleInfo.name}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <small className="text-default-500">Type</small>
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
                        <p>{singleInfo.urlParentPath}</p>
                      </div>

                      <div className="flex flex-col">
                        <small className="text-default-500">Create Time</small>
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
                        {multipleInfo.fileCount + multipleInfo.folderCount}
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
            <dialog
              className={" modal " + (showDeleteModal ? "modal-open" : "")}
            >
              <div className="modal-box">
                <form method="dialog">
                  <button
                    className="btn btn-sm btn-square btn-ghost absolute right-2 top-2"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Delete</h3>
                <p className="my-4">
                  Are you sure you want to delete the selected files?
                </p>
                <div className="flex flex-row gap-2 justify-end">
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={toDeleteFile}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        </>
      )}
    </>
  );
}
