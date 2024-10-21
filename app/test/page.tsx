"use client";

import { cache } from "react";
import { getTabList } from "@/app/action-cached";

export default function TestPage() {
  const testCache = cache(() => {});
  return (
    <>
      {/* <div className="w-20 h-20 bg-sky-300 hover:bg-sky-700">
        <button
          className="btn btn-primary"
          onClick={async () => {
            const taskMap = await getTabList();
            console.log(taskMap);
          }}
        >
          test
        </button>
        <div className=" w-10 h-10 bg-red-200 hover:bg-red-800"></div>
        
      </div> */}
      <div className="tooltip tooltip-accent mt-10 ml-10" data-tip="copy">
          <button
            className="btn btn-sm btn-square btn-neutral cursor-copy"
            aria-label="copy"
          >
            <svg
              className="h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path d="M 16 3 C 14.742188 3 13.847656 3.890625 13.40625 5 L 6 5 L 6 28 L 26 28 L 26 5 L 18.59375 5 C 18.152344 3.890625 17.257813 3 16 3 Z M 16 5 C 16.554688 5 17 5.445313 17 6 L 17 7 L 20 7 L 20 9 L 12 9 L 12 7 L 15 7 L 15 6 C 15 5.445313 15.445313 5 16 5 Z M 8 7 L 10 7 L 10 11 L 22 11 L 22 7 L 24 7 L 24 26 L 8 26 Z"></path>
            </svg>
          </button>
        </div>

        <div className="h-40 w-40 bg-black">
          
        </div>


    </>
  );
}
