import redirectHard, { getVisitorTabs } from "@/app/action";
import { getTabList } from "@/app/action-cached";
import { verifySessionAction } from "@/app/action-cached";
import { LockedIcon, LoginIcon } from "@/components/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import path from "path";

export default async function Page() {
  const { isAuth, username } = await verifySessionAction();

  if (isAuth) {
    const tabList = await getTabList();
    redirect(path.join("/files", tabList[0].urlName));
  }

  const tabs = await getVisitorTabs();

  if (tabs.length === 0) {
    return (
      <div className="grow flex flex-col items-center justify-center">
        <LoginIcon className="w-24 h-24 " />
        <h1 className="text-2xl font-bold">Login Required
        </h1>
        <p className="text-center">
          You need to be logged in to access this page.
        </p>
        <Link href="/login" className="btn btn-primary btn-wide mt-4 ">Login Now</Link>
      </div>
    );
  } else {
    redirect(path.join("/files", tabs[0].urlName));
  }
}
