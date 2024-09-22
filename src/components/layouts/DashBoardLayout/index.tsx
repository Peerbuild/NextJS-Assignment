"use client";
import React, { useState } from "react";
import Image from "next/image";
import SidebarNav from "./SideBarNav";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`absolute md:mt-0 mt-3 left-0 top z-50 h-full text-white flex flex-col bg-[#000101] lg:fixed lg:w-48 lg:translate-x-0 lg:mt-0 
          transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
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
        <SidebarNav />
      </aside>

      {/* Custom toggle button for small screens */}
      <button
        onClick={toggleSidebar}
        className={`absolute top-1/2 transform -translate-y-1/2 z-50 lg:hidden py-5 h-16 bg-[#1e1e1e] inline-flex items-center justify-center 
          rounded-tr-lg rounded-br-lg transition-transform duration-300 ease-in-out`}
        style={{
          left: isSidebarOpen ? "66%" : "0.5rem", // Syncs with sidebar
        }}
      >
        <div className="w-6 h-6">
          {isSidebarOpen ? (
            <ChevronLeft size={20} stroke="#ecf3f3" strokeWidth={3.3} />
          ) : (
            <ChevronRight size={20} stroke="#ecf3f3" strokeWidth={3.3} />
          )}
        </div>
      </button>

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:pl-48 h-screen overflow-y-auto">
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
