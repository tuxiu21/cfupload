"use client";

import { useState } from "react";
import { FolderIcon, PlusIcon } from "./icons";

export default function FileMenu() {
  const [showCreateTabModal, setShowCreateTabModal] = useState(false);

  const handleCreateTab = () => {
    // console.log('create tab')
    // 打开modal
    setShowCreateTabModal(true);
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
              htmlFor="my-drawer"
            >
              <PlusIcon className="h-5 w-5" />
            </label>
          </div>
          <ul>
            <li>
              <a>All Files</a>
            </li>
            {/* <li>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li> */}
          </ul>
        </li>
      </ul>
      {/* <div className="fixed top-0 left-0 w-dvw h-dvh pointer-events-none">
        <dialog
          className={" modal " + (showCreateTabModal ? "modal-open" : "")}
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
            <h3 className="font-bold text-lg">Log in</h3>
            <div className="flex flex-row gap-2 justify-end">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setShowCreateTabModal(false)}
              >
                Close
              </button>
              <button className="btn btn-sm btn-primary" onClick={() => {}}>
                Sign in
              </button>
            </div>
          </div>
        </dialog>
      </div> */}
    </>
  );
}
