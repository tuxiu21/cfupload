"use client";
import { addFile, chunkUpload } from "@/app/files/action";
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
} from "@/components/icons";
import { formatSize } from "@/utils";
import { useParentPath } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Toast from "./toast";
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

export default function LeftBar() {
  // 这个获取的是完整的路径
  const parentPath=useParentPath()

  const [modalStatus, setModalStatus] = useState(ModalType.None);
  const [addFileName, setAddFileName] = useState("");

  const [addFileRes, setAddFileRes] = useState({ success: false, message: "" });

  const [showToast, setShowToast] = useState(false);

  const [tasks, setTasks] = useState<TaskStatus[]>([]);
  const [showTaskBar, setShowTaskBar] = useState(false);

  const addModalInputRef = useRef<HTMLInputElement>(null);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const folderUploadRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleAddFile = async () => {
    const res = await addFile(
      addFileName,
      modalStatus === ModalType.CreateFile,
      parentPath
    );
    setAddFileRes(res);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
    if (res.success) {
      // 重新获取文件列表
      router.refresh();

      setTimeout(() => {
        setModalStatus(ModalType.None);
      }, 500);
    }
  };

  const handleUploadFile = async (files: FileList) => {
    setShowTaskBar(true);

    // 因为用户可能会切换目录 所以这里需要保存一下
    const uploadParentPath = parentPath;

    const upload = async (file: File) => {
      const chunks = Math.ceil(file.size / CHUNK_SIZE);
      const uuid = uuidv4();

      setTasks((tasks) => {
        return tasks.map((task) => {
          if (
            task.filename === file.name &&
            task.destination === uploadParentPath
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
        const blob = file.slice(start, end);
        const chunkFormData = new FormData();
        chunkFormData.append("file", blob);
        chunkFormData.append("filename", file.name);

        chunkFormData.append("uuid", uuid);
        chunkFormData.append("index", index.toString());
        chunkFormData.append("chunks", chunks.toString());
        chunkFormData.append("pathname", uploadParentPath);
        console.log(chunkFormData);
        chunkFormData.forEach((value, key) => {
          console.log(key, value);
        });
        await chunkUpload(chunkFormData);

        setTasks((tasks) => {
          return tasks.map((task) => {
            if (
              task.filename === file.name &&
              task.destination === uploadParentPath
            ) {
              task.chunkUploaded = index + 1;
              return task;
            }
            return task;
          });
        });
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
        destination: uploadParentPath,
        size: files[i].size,
      });
    }

    setTasks([...tasks, ...newTasks]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // 同时发送多个异步请求
      uploadPromises.push(upload(file));
    }
    await Promise.all(uploadPromises);
    router.refresh();
  };

  return (
    <div className="sm:min-w-72 p-2">
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
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
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
          <Toast
            show={showToast}
            success={addFileRes.success}
            message={addFileRes.message}
          />
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
            (showTaskBar ? "translate-y-0 w-full" : "translate-y-48  w-12")
          }
        >
          <div className="card bg-base-200 shadow-2xl ">
            <div className="card-title justify-end">
              {/* <span>Task Status</span> */}
              <label className="btn btn-ghost swap swap-rotate ">
                <input
                  type="checkbox"
                  // value={showTaskBar ? "on" : "off"}
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
                          {/* <CheckMarkIcon/> */}
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-square m-1"
                          >
                            <CheckMarkIcon className="h-6 w-6 text-green-600" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* <div></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
