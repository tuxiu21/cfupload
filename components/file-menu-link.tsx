"use client";

import { useTabPath } from "@/hooks";
import { Tab } from "@/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function FileMenuLink({ tab }: { tab: Tab }) {
  const { tabUrlName, urlParentPath } = useTabPath();
  const drawerToggleLabel = useRef<HTMLLabelElement>(null);

  // 为了防止水和问题
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={
        !mounted
          ? "relative block p-0 peer"
          : "relative block p-0 peer" +
            (tabUrlName === tab.urlName ? " active " : "")
      }
    >
      <label
        htmlFor="my-drawer"
        ref={drawerToggleLabel}
        className="hidden"
      ></label>
      {/* <Link
        href={"/files/" + tab.urlName}
        className="block w-full px-4 py-2 whitespace-nowrap max-w-40 truncate"
        onClick={() => {
          drawerToggleLabel.current?.click();
        }}
      >
        {tab.tabName}
      </Link> */}
      <Link
        href={"/files/" + tab.urlName}
        className="block w-full px-4 py-2 sm:hidden whitespace-nowrap max-w-40 truncate"
        onClick={() => {
          drawerToggleLabel.current?.click();
        }}
      >
        {tab.tabName}
      </Link>
      <Link
        href={"/files/" + tab.urlName}
        className="block w-full px-4 py-2 max-sm:hidden whitespace-nowrap max-w-40 truncate"
      >
        {tab.tabName}
      </Link>
    </div>
  );
}
