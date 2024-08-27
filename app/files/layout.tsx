import LeftBar from "@/components/leftbar";
import RightMenu from "@/components/right-menu";
import FilesProvider from "./providers";

export default function FilesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-row basis-24 grow min-h-0 ">
      <LeftBar />
      {/* provider 不会占用div */}
      <FilesProvider>
        <div className="grow flex flex-col min-w-0 relative">
          {/* children要放在前面 z-index小 */}
          {children}
          <RightMenu />
          
        </div>
      </FilesProvider>
    </main>
  );
}
