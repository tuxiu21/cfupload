"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  EditIcon,
  FolderIcon,
  InfoIcon,
  LockedIcon,
  LockedOKIcon,
  PartLockedIcon,
  PlusIcon,
  UnlockedIcon,
} from "./icons";
import { getFoldersUlInfo } from "@/app/(main)/files/[tab]/[[...path_slug]]/action";
import path from "path";
import { formatUrlPath } from "@/utils";
import { Tab } from "@/types";
import { editTabMapFromForm, getTabMap, putTabMapFromForm } from "@/app/action";
import { useToast } from "./toast-provider";
import { useTabPath } from "@/hooks";
import Link from "next/link";


const tabInit: Tab = {
  tabName: "",
  urlName: "",
  pathName: "",
  permissions: [],
};

export default function FileMenu() {
  const [showCreateTabModal, setShowCreateTabModal] = useState(false);
  const [dialogMounted, setDialogMounted] = useState(false);

  const [selectedPath, setSelectedPath] = useState("");
  
  const [mountFirstUl, setMountFirstUl] = useState(true);

  const [tabs, setTabs] = useState(new Map<string, Tab>());
  const { tabUrl, urlParentPath } = useTabPath();

  const modalFirstInputRef = useRef<HTMLInputElement>(null);
  const drawerToggleLabel = useRef<HTMLLabelElement>(null);

  const [tabDialogForm, setTabDialogForm] = useState(tabInit);

  
  const originalUrlNameInput=useMemo(()=>
    <input
      type="hidden"
      name="originalUrlName"
      defaultValue={tabDialogForm.urlName}
    />,[showCreateTabModal]
    )

  const toast = useToast();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const tabs = await getTabMap();
    console.log(tabs);

    setTabs(tabs);
  };

  const handleCreateTab = async () => {
    // // 清空表单
    setTabDialogForm(tabInit);
    setSelectedPath("");
    // 打开modal
    setDialogMounted(true);

    // setShowCreateTabModal(true);

    // 下一个事件循环中执行
    setTimeout(() => {
      setShowCreateTabModal(true);
      modalFirstInputRef.current?.focus();
    }, 0);
  };
  const handleEditTab = async (tab: Tab) => {
    setTabDialogForm(tab);
    setSelectedPath("");
    setDialogMounted(true);
    // 下一个事件循环中执行
    setTimeout(() => {
      setShowCreateTabModal(true);
      modalFirstInputRef.current?.focus();
    }, 0);
  };

  // 根据state计算得到的
  const isCreateTab = tabDialogForm.tabName === "";
  const tabDialogFormPathName =
    selectedPath === "" && tabDialogForm.pathName !== ""
      ? tabDialogForm.pathName
      : selectedPath;

  return (
    <>
      <ul className="menu  rounded-box w-full mt-4 ">
        <li>
          <div className="menu-title flex flex-row justify-between items-center pr-0">
            <div className="flex flex-row gap-2 items-center">
              <FolderIcon className="h-5 w-5" />
              <span className="">Files</span>
            </div>
            <label
              className="btn btn-square btn-sm btn-ghost "
              onClick={handleCreateTab}
            >
              <PlusIcon className="h-5 w-5" />
            </label>
            <label
              htmlFor="my-drawer"
              ref={drawerToggleLabel}
              className="hidden"
            ></label>
          </div>
          <ul className="">
            {Array.from(tabs).map(([key, value]) => {
              return (
                <li key={key} className="">
                  <div
                    className={
                      "relative block p-0 peer" +
                      (tabUrl === key ? " active " : "")
                    }
                  >
                    <Link
                      href={path.join("/files", key)}
                      className="block w-full px-4 py-2"
                      onClick={() => {
                        drawerToggleLabel.current?.click();
                      }}
                    >
                      {value.tabName}
                    </Link>
                  </div>
                  {/* 这里用peer清除action的样式 防止点击此按钮导致触发上面div的action状态
                  这里之所以用ul 因为ul是在ui框架中action样式的排除标签
                  */}
                  <ul className="flex flex-row items-center gap-1 absolute right-0 top-0 bottom-0 my-auto peer-active:text-neutral-content peer-[.active]:text-neutral-content">
                    {value.permissions.includes("visitorFullAccess") ? (
                      <div
                        className="tooltip"
                        data-tip="This folder is public."
                      >
                        <UnlockedIcon className="w-5 h-5" />
                      </div>
                    ) : (
                      <>
                        {value.permissions.includes("visitorVisible") ? (
                          <div
                            className="tooltip"
                            data-tip="This folder is visible to visitors."
                          >
                            <PartLockedIcon className="w-5 h-5" />
                          </div>
                        ) : (
                          <div
                            className="tooltip"
                            data-tip="This folder is private."
                          >
                            <LockedOKIcon className="w-5 h-5" />
                          </div>
                        )}
                      </>
                    )}
                    <button
                      className="btn btn-square btn-sm btn-ghost "
                      onClick={() => {
                        handleEditTab(value);
                      }}
                    >
                      <EditIcon className="h-5 w-5" />
                    </button>
                  </ul>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
      {dialogMounted && (
        <dialog
          className={" w-dvw modal " + (showCreateTabModal ? "modal-open" : "")}
          // key={dialogKey}
          onTransitionEnd={() => {
            // 点击关闭modal 等动画结束后 重新挂载表单 清空表单
            if (!showCreateTabModal) {
              // setFormKey((prev) => prev + 1);
              setDialogMounted(false);
            }
          }}
        >
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-ghost  btn-square absolute right-2 top-2"
                onClick={() => {
                  setShowCreateTabModal(false);
                }}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">
              {/* Add Tab */}
              {isCreateTab ? "Create Tab" : "Edit Tab"}
            </h3>
            <form
              className="mt-2 flex flex-col gap-2"
              // key={formKey}
              action={async (formData: FormData) => {
                // console.log(formData);
                formData.forEach((value, key) => {
                  console.log(key, value);
                });
                let res;
                if (isCreateTab) {
                  res = await putTabMapFromForm(formData);
                } else {
                  res = await editTabMapFromForm(formData);
                }
                if (res.success) {
                  setShowCreateTabModal(false);
                } else {
                  toast({ success: false, message: res.message });
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
                  defaultValue={tabDialogForm.tabName}
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
                    setTabDialogForm((prev) => ({
                      ...prev,
                      urlName: formated,
                    }));
                  }}
                  type="text"
                  placeholder=""
                  name="urlName"
                />
                {!isCreateTab && (
                  originalUrlNameInput
                )}
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
                <div className="flex flex-row w-full items-center mb-2">
                  <span className="text-nowrap mr-4">Path Name:</span>
                  <span className=" min-w-0 text-wrap break-all">
                    {tabDialogFormPathName}
                  </span>
                  {/* 这里弄假几个的input 用来向表单填充数据 */}
                  <input
                    type="hidden"
                    name="pathName"
                    value={tabDialogFormPathName}
                  />
                </div>

                <li className="max-w-full overflow-x-scroll">
                  <details
                    // open
                    open={isCreateTab}
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
                      {mountFirstUl && <FileUl urlParentPath="/" />}
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
                    defaultChecked={tabDialogForm.permissions.includes(
                      "visitorVisible"
                    )}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Visitor Full Access</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    name="permissions"
                    value="visitorFullAccess"
                    defaultChecked={tabDialogForm.permissions.includes(
                      "visitorFullAccess"
                    )}
                  />
                </label>
              </div>
              <div className="flex flex-row gap-2 justify-end">
                <button className="btn btn-sm btn-primary" type="submit">
                  {isCreateTab ? "Create" : "Edit"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
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
function FileUl({ urlParentPath }: { urlParentPath: string }) {
  type Folder = {
    name: string;
    urlParentPath: string;
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
    // console.log("setupFolders", urlParentPath);
    const folders = await getFoldersUlInfo(urlParentPath);

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
                    setSelectedPath(path.join(urlParentPath, folder.name));
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
                      selectedPath === path.join(urlParentPath, folder.name)
                        ? "active"
                        : ""
                    }
                  >
                    <FolderIcon className="h-4 w-4" />
                    {folder.name}
                  </summary>

                  {mountNextUlKeys.includes(folder.name) && (
                    <FileUl
                      urlParentPath={path.join(urlParentPath, folder.name)}
                    />
                  )}
                </details>
              </>
            ) : (
              <a
                className={
                  selectedPath === path.join(urlParentPath, folder.name)
                    ? "active"
                    : ""
                }
                onClick={() => {
                  setSelectedPath(path.join(urlParentPath, folder.name));
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
