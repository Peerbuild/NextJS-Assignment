"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/header", label: "Header" },
  { href: "/", label: "Home" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/solutions", label: "Solutions" },
  { href: "/admin/contact", label: "Contact us" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/footer", label: "Footer" },
  { href: "/admin/emails", label: "Emails", separator: true },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-1 pt-3 border-r border-t rounded-tr-[10px] border-[#2e2e2e] flex-grow text-[#ecf3f3] text-base font-semibold flex flex-col  gap-2">
      {links.map(({ href, label, separator }, index) => (
        <React.Fragment key={href}>
          {separator && index > 0 && (
            <div className="h-px bg-[#2e2e2e] w-full " />
          )}
          <Link
            href={href}
            className={`px-4 py-2 mx-2 rounded-[7px] transition-colors ${
              pathname === href
                ? "bg-neutral-900 border border-[#2e2e2e]"
                : "hover:bg-neutral-950"
            }`}
          >
            {label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
