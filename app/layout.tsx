import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Providers from "./providers";
import LeftBar from "@/components/leftbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // data-theme="dark"
      suppressHydrationWarning={true}
    >
      <body className={inter.className}>
        <Providers>
          <div className="h-dvh">
            
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
