import { getVisitorTabs } from "@/app/action";
import { FolderIcon, LockedIcon, PartLockedIcon, UnlockedIcon } from "./icons";
import Link from "next/link";
import FileMenuLink from "./file-menu-link";

export default async function FileMenuVisitor() {
  const tabs = await getVisitorTabs();
  return (
    <ul className="menu  rounded-box w-full mt-4 ">
      <li>
        <div className="menu-title flex flex-row justify-between items-center pr-0">
          <div className="flex flex-row gap-2 items-center">
            <FolderIcon className="h-5 w-5" />
            <span className="">Files</span>
          </div>
          {/* <label
            className="btn btn-square btn-sm btn-ghost "
            onClick={handleCreateTab}
          >
            <PlusIcon className="h-5 w-5" />
          </label> */}
          <label
            htmlFor="my-drawer"
            // ref={drawerToggleLabel}
            className="hidden"
          ></label>
        </div>
        <ul className="">
          {tabs.map((tab) => {
            return (
              <li key={tab.urlName} className="">
                {/* <div
                  // className={
                  //   "relative block p-0 peer" +
                  //   (tabUrlName === key ? " active " : "")
                  // }
                >
                  <Link
                  href={'test'}
                    // href={path.join("/files", key)}
                    className="block w-full px-4 py-2"
                    // onClick={() => {
                    //   drawerToggleLabel.current?.click();
                    // }}
                  >
                    {tab.tabName}
                  </Link>
                </div> */}
                <FileMenuLink tab={tab} />
                {/* 这里用peer清除action的样式 防止点击此按钮导致触发上面div的action状态
            这里之所以用ul 因为ul是在ui框架中action样式的排除标签
            */}
                <ul className="flex flex-row items-center gap-1 absolute right-0 top-0 bottom-0 my-auto peer-active:text-neutral-content peer-[.active]:text-neutral-content mr-2">
                  {tab.permissions.includes("visitorFullAccess") ? (
                    <div className="tooltip" data-tip="This folder is public.">
                      <UnlockedIcon className="w-5 h-5" />
                    </div>
                  ) : (
                    <>
                      {tab.permissions.includes("visitorReadOnly") ? (
                        <div
                          className="tooltip before:max-w-36"
                          data-tip="This folder is read-only to visitors."
                        >
                          <PartLockedIcon className="w-5 h-5" />
                        </div>
                      ) : (
                        <div
                          className="tooltip"
                          data-tip="This folder is private."
                        >
                          <LockedIcon className="w-5 h-5" />
                        </div>
                      )}
                    </>
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}
