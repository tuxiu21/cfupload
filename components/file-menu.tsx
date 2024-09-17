"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FolderIcon, InfoIcon, PlusIcon } from "./icons";
import { getFoldersUlInfo } from "@/app/(main)/files/[tab]/[[...path_slug]]/action";
import path from "path";
import { formatUrlPath } from "@/utils";
import { Tab } from "@/types";
import { getTabMap, putTabMapFromForm,  } from "@/app/action";
import { useToast } from "./toast-provider";
import { useTabPath } from "@/hooks";
import Link from "next/link";

export default function FileMenu() {
  const [showCreateTabModal, setShowCreateTabModal] = useState(false);

  const [selectedPath, setSelectedPath] = useState("");

  const [mountFirstUl, setMountFirstUl] = useState(true);

  const [tabs, setTabs] = useState(new Map<string, Tab>());
  const { tabUrl, parentPath } = useTabPath();

  const modalFirstInputRef = useRef<HTMLInputElement>(null);

  const [tabDialogForm, setTabDialogForm] = useState<Tab>({
    tabName: "",
    urlName: "",
    pathName: "",
    permissions:[]
  });

  const toast=useToast();

  useEffect(() => {
    init();
  }, []);

  const init=async()=>{
    const tabs = await getTabMap();
    console.log(tabs);
    
    setTabs(tabs);
  }

  const handleCreateTab = async () => {
    // 打开modal
    setShowCreateTabModal(true);
    // getFiles('/')
    modalFirstInputRef.current?.focus();
  };

  return (
    <>
      <ul className="menu  rounded-box w-full mt-4 ">
        <li>
          <div className="menu-title flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <FolderIcon className="h-5 w-5" />
              <span className="">Files</span>
            </div>
            <label
              className="btn btn-square btn-sm btn-ghost "
              onClick={handleCreateTab}
              // htmlFor="my-drawer"
            >
              <PlusIcon className="h-5 w-5" />
            </label>
          </div>
          <ul>
            {/* <li>
              <a>All Files</a>
            </li> */}
            {
              
              Array.from(tabs).map(([key, value]) => {                
                return (
                  <li key={key}>
                    <Link href={key} className={(tabUrl===key)?' active ':''}>{value.tabName}</Link>
                  </li>
                );
              })
            }
          </ul>
        </li>
      </ul>
      <dialog
        className={" w-dvw modal " + (showCreateTabModal ? "modal-open" : "")}
      >
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-ghost  btn-square absolute right-2 top-2"
              onClick={() => setShowCreateTabModal(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Tab</h3>
          <form
            className="mt-2 flex flex-col gap-2"
            action={async (formData: FormData) => {
              // console.log(formData);
              formData.forEach((value, key) => {
                console.log(key, value);
              });
              // 
              const res=await putTabMapFromForm(formData);
              // setShowCreateTabModal(false);
              if(res.success){
                setShowCreateTabModal(false);
              }else{
                toast({success:false,message:res.message});
              }

            }}
          >
            <label className="input input-bordered input-sm flex items-center gap-2">
              <span className="min-w-20">Tab Name</span>
              <input
                type="text"
                className="grow"
                placeholder=""
                name="tabName"
                ref={modalFirstInputRef}
              />
            </label>
            <label className="input input-bordered input-sm flex items-center gap-2">
              <span className="min-w-20">Url Name</span>
              <input
                className="grow min-w-0"
                value={tabDialogForm.urlName}
                onChange={(e) => {
                  const value = e.target.value;
                  const formated = formatUrlPath(value);
                  setTabDialogForm((prev) => ({ ...prev, urlName: formated }));
                }}
                type="text"
                placeholder=""
                name="urlName"
              />
              <div
                className="tooltip tooltip-left
              before:max-w-60

              "
                data-tip="Only lowercase letters and numbers are allowed, as this will be used in the URL."
              >
                <InfoIcon className="min-w-4 h-4 text-info" />
              </div>
            </label>

            <ul className="menu menu-xs w-full max-w-xs border input-bordered rounded-lg">
              <div className="flex flex-row w-full items-center">
                <span className="text-nowrap mr-2">Path Name:</span>
                <span className="text-xs min-w-0 text-wrap break-all">
                  {selectedPath}
                </span>
                {/* 这里弄一个假的input 用来向表单填充数据 */}
                <input type="hidden" name="pathName" value={selectedPath} />
              </div>

              <li className="max-w-full overflow-x-scroll">
                <details
                  open
                  onToggle={async (e) => {
                    if ((e.target as any).open) {
                      setMountFirstUl(true);
                    } else {
                      setMountFirstUl(false);
                    }
                  }}
                  className="max-w-full"
                >
                  <summary>
                    <FolderIcon className="h-4 w-4" />
                    All Files
                  </summary>
                  <FileUlContext.Provider
                    value={[selectedPath, setSelectedPath]}
                  >
                    {mountFirstUl && <FileUl parentPath="/" />}
                  </FileUlContext.Provider>
                </details>
              </li>
            </ul>
            <div className="mb-2">
              <label className="label cursor-pointer">
                <span className="label-text">Visitor Visible</span>
                <input
                  type="checkbox"
                  className="toggle"
                  name="permissions"
                  value="visitorVisible"
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">Visitor Full Access</span>
                <input
                  type="checkbox"
                  className="toggle"
                  name="permissions"
                  value="visitorFullAccess"
                />
              </label>
            </div>
            <div className="flex flex-row gap-2 justify-end">

              <button className="btn btn-sm btn-primary" type="submit">
                Create
              </button>
            </div>
          </form>

          {/* <div className="flex flex-row gap-2 justify-end">
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setShowCreateTabModal(false)}
            >
              Close
            </button>
            <button className="btn btn-sm btn-primary" onClick={() => {}} >
              Sign in
            </button>
          </div> */}
        </div>
      </dialog>
    </>
  );
}

const FileUlContext = createContext<
  [string, Dispatch<SetStateAction<string>>] | null
>(null);
function useFileUlContext() {
  const context = useContext(FileUlContext);
  if (!context) {
    throw new Error("FileUlContext is null");
  }
  return context;
}

// 客户端组件不能用async
function FileUl({ parentPath }: { parentPath: string }) {
  type Folder = {
    name: string;
    parentPath: string;
    isFile: boolean;
    hasFolder: boolean;
  };

  const [folders, setFolders] = useState<Folder[]>([]);
  const [mountNextUlKeys, setMountNextUlKeys] = useState<string[]>([]);

  const [selectedPath, setSelectedPath] = useFileUlContext();

  useEffect(() => {
    setupFolders();
  }, []);

  async function setupFolders() {
    // console.log("setupFolders", parentPath);
    const folders = await getFoldersUlInfo(parentPath);

    setFolders(folders);
  }

  return (
    <ul>
      {folders.map((folder) => {
        return (
          <li key={folder.name}>
            {folder.hasFolder ? (
              <>
                <details
                  onToggle={(e) => {
                    //阻止事件冒泡
                    e.stopPropagation();
                    setSelectedPath(path.join(parentPath, folder.name));
                    if ((e.target as any).open) {
                      setMountNextUlKeys((prev) => [...prev, folder.name]);
                    } else {
                      // 关闭时卸载下一个ul 减少dom
                      setMountNextUlKeys((prev) =>
                        prev.filter((key) => key !== folder.name)
                      );
                    }
                  }}
                >
                  <summary
                    className={
                      selectedPath === path.join(parentPath, folder.name)
                        ? "active"
                        : ""
                    }
                  >
                    <FolderIcon className="h-4 w-4" />
                    {folder.name}
                  </summary>

                  {mountNextUlKeys.includes(folder.name) && (
                    <FileUl parentPath={path.join(parentPath, folder.name)} />
                  )}
                </details>
              </>
            ) : (
              <a
                className={
                  selectedPath === path.join(parentPath, folder.name)
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setSelectedPath(path.join(parentPath, folder.name));
                }}
              >
                <FolderIcon className="h-4 w-4" />
                {folder.name}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
