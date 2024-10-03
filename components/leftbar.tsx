"use client";
import { addFile, chunkUpload } from "@/app/(main)/files/action";
import {
  CheckMarkIcon,
  CreateFileIcon,
  DropdownIcon,
  DropUpIcon,
  ErrorIcon,
  FileUploadIcon,
  FolderIcon,
  FolderUploadIcon,
  PlusIcon,
  UploadingIcon,
} from "@/components/icons";
import { formatSize } from "@/utils";
import {  useTabPath } from "@/hooks";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Toast, { useToast } from "./toast-provider";
import path from "path";
import { Tab } from "@/types";
enum ModalType {
  None,
  Folder,
  // FileUpload,
  // FolderUpload,
  CreateFile,
}

type TaskStatus = {
  filename: string;
  chunkUploaded: number;
  chunkTotal: number;
  destination: string;
  size: number;
  // status:string
};

const CHUNK_SIZE = 1024 * 1024 * Number(process.env.NEXT_PUBLIC_CHUNK_SIZE_MB);

export default function LeftBar({tabs,isAuth}:{tabs:Tab[],isAuth:boolean}) {
  // 这个获取的是完整的路径
  const {tabUrlName,urlParentPath} = useTabPath();

  const [modalStatus, setModalStatus] = useState(ModalType.None);
  const [addFileName, setAddFileName] = useState("");

  const [tasks, setTasks] = useState<TaskStatus[]>([]);
  const [showTaskBar, setShowTaskBar] = useState(false);

  const addModalInputRef = useRef<HTMLInputElement>(null);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const folderUploadRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const toast = useToast();

  const handleAddFile = async () => {
    const res = await addFile(
      tabUrlName,
      addFileName,
      modalStatus === ModalType.CreateFile,
      urlParentPath
    );

    toast({ success: res.success, message: res.message });

    if (res.success) {
      // 重新获取文件列表
      router.refresh();
      setModalStatus(ModalType.None);
    }
  };

  const handleUploadFile = async (files: FileList) => {
    setShowTaskBar(true);

    // 因为用户可能会切换目录 所以这里需要保存一下
    const uploadurlParentPath = urlParentPath;

    const upload = async (file: File) => {
      const chunks = Math.ceil(file.size / CHUNK_SIZE);
      const uuid = uuidv4();

      setTasks((tasks) => {
        return tasks.map((task) => {
          if (
            task.filename === file.name &&
            task.destination === uploadurlParentPath
          ) {
            task.chunkTotal = chunks;
            return task;
          }
          return task;
        });
      });
      for (
        let index = 0;
        file.size + CHUNK_SIZE >= (index + 1) * CHUNK_SIZE;
        index++
      ) {
        const start = index * CHUNK_SIZE;
        const end = (index + 1) * CHUNK_SIZE;
        // 在这里对文件进行分块
        const blob = file.slice(start, end);

        const chunkFormData = new FormData();

        chunkFormData.append("tabUrlName", tabUrlName);
        chunkFormData.append("file", blob);
        chunkFormData.append("filename", file.name);

        chunkFormData.append("uuid", uuid);
        chunkFormData.append("index", index.toString());
        chunkFormData.append("chunks", chunks.toString());
        chunkFormData.append("pathname", uploadurlParentPath);
        // console.log(chunkFormData);
        // chunkFormData.forEach((value, key) => {
        //   console.log(key, value);
        // });
        await chunkUpload(chunkFormData);

        setTasks((tasks) => {
          return tasks.map((task) => {
            if (
              task.filename === file.name &&
              task.destination === uploadurlParentPath
            ) {
              if (task.chunkTotal === 0) {
                task.chunkTotal = 1;
                task.chunkUploaded = 1;
              } else {
                task.chunkUploaded = index + 1;
              }

              return task;
            }
            return task;
          });
        });

        router.refresh();
      }
    };
    const uploadPromises = [];

    // 向tasks中添加
    const newTasks: TaskStatus[] = [];
    for (let i = 0; i < files.length; i++) {
      newTasks.push({
        filename: files[i].name,
        chunkUploaded: 0,
        chunkTotal: 0,
        destination: uploadurlParentPath,
        size: files[i].size,
      });
    }

    setTasks([...tasks, ...newTasks]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // 同时发送多个异步请求
      uploadPromises.push(upload(file));
    }

    // 对于单个文件的所有chunk 所有请求同步
    // 对于多个文件 所有请求同时发出 
    await Promise.all(uploadPromises);
    router.refresh();
  };

  const tab= tabs.find((tab) => tab.urlName === tabUrlName);
  if(!(isAuth || tab?.permissions.includes("visitorFullAccess"))){
    return null;
  }

  return (
    <div className="sm:min-w-60 p-2">
      {/* new 按钮 */}
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-primary max-sm:btn-square"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="max-sm:hidden">New</span>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <button
              onClick={() => {
                setModalStatus(ModalType.Folder);
                addModalInputRef.current?.focus();
              }}
            >
              <FolderIcon className="h-5 w-5" />
              Folder
            </button>
            <div className="divider my-0"></div>
          </li>
          <li>
            <button
              onClick={() => {
                fileUploadRef.current?.click();
              }}
            >
              <FileUploadIcon className="h-5 w-5" />
              <input
                type="file"
                multiple
                className="hidden"
                ref={fileUploadRef}
                onChange={(e) => {
                  console.log(e.target.files);
                  if (e.target.files) {
                    handleUploadFile(e.target.files);
                  }
                }}
              />
              File Upload
            </button>
            <button
              onClick={() => {
                folderUploadRef.current?.click();
              }}
            >
              <FolderUploadIcon className="h-5 w-5" />
              <input
                type="file"
                {...{ webkitdirectory: "", mozdirectory: "", directory: "" }}
                className="hidden"
                ref={folderUploadRef}
                onChange={(e) => {
                  console.log(e.target.files);
                  if (e.target.files) {
                    handleUploadFile(e.target.files);
                  }
                }}
              />
              Folder Upload
            </button>
            <div className="divider  my-0"></div>
          </li>
          <li>
            <button
              onClick={() => {
                setModalStatus(ModalType.CreateFile);
                addModalInputRef.current?.focus();
              }}
            >
              <CreateFileIcon className="h-5 w-5" />
              Create File
            </button>
          </li>
        </ul>
      </div>


      {/* new 对话框 */}
      <div>
        <dialog
          className={
            " modal " + (modalStatus !== ModalType.None ? "modal-open" : "")
          }
        >
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-square btn-ghost absolute right-2 top-2"
                onClick={() => setModalStatus(ModalType.None)}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">
              {modalStatus === ModalType.Folder
                ? "Create Folder"
                : modalStatus === ModalType.CreateFile
                ? "Create File"
                : ""}
            </h3>

            <div className="py-4 flex flex-col gap-2 ">
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered input-secondary  w-full"
                value={addFileName}
                onChange={(e) => {
                  setAddFileName(e.target.value);
                }}
                ref={addModalInputRef}
              />
              <div className="w-full flex flex-row justify-end">
                <button
                  className="btn btn-primary "
                  onClick={() => {
                    handleAddFile();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>

      {/* 任务状态栏 */}
      <div
        className={
          "absolute w-dvw h-dvh  top-0 left-0 pointer-events-none overflow-y-scroll invisible overflow-x-hidden"
        }
      >
        <div
          className={
            "absolute pointer-events-auto right-0 bottom-0 z-10 visible transition-all max-w-full " +
            (showTaskBar
              ? "translate-y-0 w-full sm:w-1/2"
              : "translate-y-48  w-12")
          }
        >
          <div className="card bg-base-200 shadow-2xl ">
            <div className="card-title justify-end">
              {/* <span>Task Status</span> */}
              <label className="btn btn-ghost swap swap-rotate ">
                <input
                  type="checkbox"
                  checked={showTaskBar}
                  onChange={(e) => {
                    setShowTaskBar(e.target.checked);
                  }}
                />
                <DropUpIcon className="swap-on" />
                <DropdownIcon className="swap-off" />
              </label>
            </div>
            <div className="card-body h-48 p-6 pt-0">
              <div className="overflow-y-scroll">
                {tasks
                  .slice()
                  .reverse()
                  .map((task, index) => {
                    return (
                      <div
                        key={task.filename + index}
                        className="flex flex-row gap-2 w-full"
                      >
                        <div className="flex flex-col min-w-0 grow">
                          <div className="flex flex-row">
                            <span className="truncate">{task.filename}</span>
                          </div>
                          <progress
                            className="progress progress-primary"
                            value={task.chunkUploaded}
                            max={task.chunkTotal}
                          ></progress>
                          <div className="flex flex-row justify-between">
                            <span>{formatSize(task.size)}</span>
                            <span>
                              Chunks:{task.chunkUploaded}/{task.chunkTotal}
                            </span>
                          </div>
                        </div>

                        {/* 任务状态 以及操作 */}
                        <div className="">
                          {task.chunkUploaded === task.chunkTotal ? (
                            <>
                              <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-square m-1 swap  hover:swap-active"
                                onClick={() => {
                                  const dstPath = path.join(
                                    "/files",
                                    task.destination
                                  );
                                  router.push(dstPath);
                                  setShowTaskBar(false);
                                }}
                              >
                                <FolderIcon className="h-6 w-6 text-secondary swap-on" />
                                <CheckMarkIcon className="h-6 w-6 text-green-600 swap-off" />
                              </div>
                            </>
                          ) : (
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-ghost btn-square m-1"
                            >
                              <UploadingIcon className=" h-6 w-6 text-secondary" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
