import LeftBar from "@/components/leftbar";

export default function FilesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-row basis-24 grow min-h-0 ">
      <LeftBar />
      {children}
    </main>
  );
}
