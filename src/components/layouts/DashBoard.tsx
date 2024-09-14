import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const links = [
    { href: '/', label: 'Home' },
    {href :'/header', label: 'Header'},
    { href: '/products', label: 'Products' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/contact', label: 'Contact us' },
    { href: '/blog', label: 'Blog' },
    { href: '/emails', label: 'Emails' }
];

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-[#000101]">
            {/* Sidebar */}
            <aside className="w-48 h-full bg-[#000101] text-white flex flex-col">
                <div className="py-4 flex justify-center items-center gap-2">
                    <Image src="/Logo.svg" alt="PeerBuild" width={40} height={40} />
                    <h2 className="text-[#ecf3f3] text-base font-semibold">PeerBuild</h2>
                </div>

                <nav className="mt-1 pt-3 border-r rounded-tr-lg border-t border-[#2e2e2e] flex-grow text-[#ecf3f3] text-base font-semibold flex flex-col pl-6 gap-3">
                    {links.map(({ href, label }) => (
                        <Link key={href} href={href}>
                            {label}
                        </Link>
                    ))}
                </nav>
            </aside>



            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-[#000101] shadow-md">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold text-[#ecf3f3]">Dashboard</h1>
                        <p>
                            <span className="text-[#afbbbb] text-base font-normal">
                                Let&apos;s update the content on
                            </span>
                            <span className="text-[#ecf3f3] text-base font-normal inline-flex items-center ml-1">
                                peerbuild.tech
                                <ExternalLink
                                    strokeWidth={3.3}
                                    size={17}
                                    className="ml-1" />
                            </span>
                        </p>
                    </div>
                </header>

                    {/* Page content */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 max-w-screen-2xl"> 
                        <div className="container bg-[#000101]  mx-auto px-6 py-8 text-[#ecf3f3]">
                            {children}
                        </div>
                    </main>
            </div>
        </div>
    );
};

export default DashboardLayout;