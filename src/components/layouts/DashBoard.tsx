import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <Image src="/logo.png" alt="Logo" width={50} height={50} />
                </div>
                <nav className="mt-8">
                    <Link href="/" className="block py-2 px-4 hover:bg-gray-700">Home</Link>
                    <Link href="/products" className="block py-2 px-4 hover:bg-gray-700">Products</Link>
                    <Link href="/solutions" className="block py-2 px-4 hover:bg-gray-700">Solutions</Link>
                    <Link href="/contact" className="block py-2 px-4 hover:bg-gray-700">Contact us</Link>
                    <Link href="/blog" className="block py-2 px-4 hover:bg-gray-700">Blog</Link>
                </nav>
            </aside>

            {/* Main content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <div className="flex items-center">
                            <span className="mr-4">Welcome, User</span>
                            <Image src="/profile-pic.png" alt="Profile" width={40} height={40} className="rounded-full" />
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;