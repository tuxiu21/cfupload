import LeftBar from "@/components/leftbar";
import RightMenu from "@/components/right-menu";
import FilesProvider from "./providers";
import { getTabList, verifySessionAction } from "@/app/action-cached";
import { getVisitorTabs } from "@/app/action";

export default async function FilesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const { isAuth, username } = await verifySessionAction();
  let tabs;
  if (!isAuth) {
    tabs=await getVisitorTabs();
  }else{
    tabs=await getTabList()
  }


  return (
    <main className="flex flex-row basis-24 grow min-h-0 ">
      <LeftBar tabs={tabs} isAuth={isAuth}/>
      {/* provider 不会占用div */}
      <FilesProvider>
        <div className="grow flex flex-col min-w-0 relative">
          {/* children要放在前面 z-index小 */}
          {children}
          <RightMenu tabs={tabs} isAuth={isAuth}/>
          
        </div>
      </FilesProvider>
    </main>
  );
}
