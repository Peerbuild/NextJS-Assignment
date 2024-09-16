import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6">
      <Link href="/">
        <div className="flex items-center">
          <div className="p-3 rounded-full">
            <Image
              src="/Logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </div>
          <h1 className="text-center text-[#ecf3f3] text-base font-semibold ">
            PeerBuild
          </h1>
        </div>
      </Link>
      <ul className="lg:flex hidden  space-x-8 text-base text-[#afbbbb]">
        <li>
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300">
            Solutions
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300">
            Contact us
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-300">
            Blog
          </a>
        </li>
      </ul>
      <Button
        variant="default"
        className="bg-[#e5ecec] text-[#062826] hover:bg-[#d1d8d8] transition-colors"
      >
        Join Discord
      </Button>
    </nav>
  );
}
