"use client";
import React, { useState } from "react";
import Image from "next/image";
import SidebarNav from "./SideBarNav";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={`flex h-screen overflow-y-auto  ${isSidebarOpen ? "overflow-hidden" : "overflow-x-hidden"}`}
    >
      {/* Sidebar */}
      <aside
        className={`absolute z-50 h-full text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-full bg-[#000101]"
        } lg:translate-x-0 lg:relative lg:w-48`}
        style={{ width: isSidebarOpen ? "66%" : "" }}
      >
        <Link href="/" className="hidden lg:block">
          <div className="py-4 flex justify-center items-center gap-2">
            <Image src="/Logo.svg" alt="PeerBuild" width={40} height={40} />
            <h2 className="text-[#ecf3f3] text-base font-semibold">
              PeerBuild
            </h2>
          </div>
        </Link>
        <SidebarNav isSidebarOpen={isSidebarOpen} />
      </aside>

      {/* Custom toggle button for small screens */}
      <button
        onClick={toggleSidebar}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-50 lg:hidden w-6 h-12 bg-[#1e1e1e] text-white flex items-center justify-center"
        style={{
          borderTopRightRadius: "9999px",
          borderBottomRightRadius: "9999px",
        }}
      >
        <div className="w-2 h-4 flex flex-col justify-between">
          <div
            className={`w-1.5 h-1.5 bg-white rounded-full transform transition-transform ${isSidebarOpen ? "rotate-45 translate-y-0.5" : "-rotate-45 -translate-y-0.5"}`}
          ></div>
          <div
            className={`w-1.5 h-1.5 bg-white rounded-full transform transition-transform ${isSidebarOpen ? "-rotate-45 -translate-y-0.5" : "rotate-45 translate-y-0.5"}`}
          ></div>
        </div>
      </button>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen lg:pl-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#000101] shadow-md">
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
        {/* Page content */}
        <main className="flex-1">
          <div className="mx-auto bg-[#000101] h-full w-full p-4 md:p-6 2xl:p-10 text-[#ecf3f3]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
