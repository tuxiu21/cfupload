"use client";

import { useState } from "react";

export default function Home() {
  const [classNames, setClassNames] = useState(
    "transition ease-in-out delay-150 bg-blue-500 duration-300 ..."
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="btn" onClick={() => setShowModal(true)}>
        open modal
      </button>
      <dialog
        id="my_modal_3"
        className={" modal " + (showModal ? "modal-open" : "")}
      >
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">文件信息</h3>
          {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <small className="text-default-500">容器ID</small>

              {/* <Tooltip content={runCtrsModalInfo.id}>
                                <p className="break-words">
                                  {runCtrsModalInfo.id.length > 10
                                    ? `${runCtrsModalInfo.id.slice(0, 10)}...`
                                    : runCtrsModalInfo.id}
                                </p>
                              </Tooltip> */}
            </div>
            <div className="flex flex-col">
              <small className="text-default-500">创建者</small>
              <p>1212</p>
            </div>
            <div className="flex flex-col">
              <small className="text-default-500">创建者ID</small>
              <p>6754773473</p>
            </div>
            <div className="flex flex-col">
              <small className="text-default-500">网络</small>
              <p>ffdvdbb</p>
            </div>
           
          </div>
        </div>
      </dialog>
    </div>
  );
}
