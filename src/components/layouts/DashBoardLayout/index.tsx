import React from "react";
import Image from "next/image";
import SidebarNav from "./SideBarNav";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-x-hidden overflow-y-auto">
      {/* Sidebar */}
      <aside className="absolute left-0 top-0 z-99999 w-48 h-full bg-[#000101] text-white flex flex-col overflow-y-hidden">
        <Link href="/">
          <div className="py-4 flex justify-center items-center gap-2">
            <Image src="/Logo.svg" alt="PeerBuild" width={40} height={40} />
            <h2 className="text-[#ecf3f3] text-base font-semibold">
              PeerBuild
            </h2>
          </div>
        </Link>
        <SidebarNav />
      </aside>

      {/* Main content area */}
      <div className="pl-48 flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="sticky top-0 z-999 z-40 bg-[#000101] shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#ecf3f3]">Dashboard</h1>
              <p>
                <span className="text-[#afbbbb] text-base font-normal">
                  Let&apos;s update the content on
                </span>
                <a
                  href="https://peerbuild.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ecf3f3] text-base font-normal inline-flex items-center ml-1 hover:underline"
                >
                  peerbuild.tech
                  <ExternalLink strokeWidth={3.3} size={17} className="ml-1" />
                </a>
              </p>
            </div>

            <div>
              <Image
                src="/avatar.png"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Page content with scrolling only in children */}
        <main className="flex-1">
          <div className="mx-auto bg-[#000101] h-full w-full p-4 md:p-6 2xl:p-10 text-[#ecf3f3]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
