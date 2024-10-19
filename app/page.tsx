import Link from "next/link";
import { FileUploadIcon, FolderIcon, LockedIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello Here</h1>
          <p className="py-6">Easily upload, organize, and share your files.</p>

          <Link href="/files" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
