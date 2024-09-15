import DashboardLayout from '@/components/layouts/DashBoardLayout';
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Upload } from "lucide-react";

export default function Page() {
    return (
        <DashboardLayout>
            <div className="space-y-4 ml-4 pr-24 w-full">
                <div>
                    <h1 className="text-2xl font-bold">Header</h1>
                    <p className="text-sm text-[#afbbbb]">
                        Update the content of the header (navbar) of the site.
                    </p>
                </div>
                <hr className="border-[#2e2e2e]" />

                {/* Logo Section */}
                <div className="flex gap-5 justify-between ">
                    <div className="flex flex-col space-y-1">
                        <h2 className="text-base text-white font-semibold ">Brand Logo</h2>
                        <p className="text-sm text-[#afbbbb]">
                            This will be displayed as the logo in the header.
                        </p>
                    </div>

                    <div className="flex place-items-start gap-6 pr-32">
                        <div className="w-20 h-20 bg-transparent border border-[#2e2e2e] flex items-center justify-center rounded-lg ">
                            <Image src="/Logo.svg" alt="Brand Logo" width={50} height={60} />
                        </div>
                        <div className="flex flex-col items-center ">
                            <Button
                                variant="outline"
                                className="text-white border-[#2e2e2e] bg-transparent w-72 h-28 flex flex-col items-center justify-center hover:bg-[#2e2e2e] hover:text-white transition-colors duration-200"
                            >
                                <Upload size={24} className="mb-2" />
                                <span className="underline text-white text-base font-semibold underline-offset-2">
                                    Click to upload
                                </span>
                                <p className="text-xs text-[#888888] font-medium mt-1">
                                    PNG, SVG or JPG
                                </p>
                            </Button>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-700" />

                {/* Button Section */}
                <div className="grid grid-cols-2 gap-4 items-start">
                    {/* Left side: Heading and subheading */}
                    <div>
                        <h2 className="text-white text-base font-semibold">Button</h2>
                        <p className="text-sm text-[#afbbbb]">
                            This will be displayed as the call to action button in the header.
                        </p>
                    </div>

                    {/* Right side: Inputs */}
                    <div className="flex flex-col gap-4 pr-32">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="border-[#2e2e2e] text-[#888888]"
                        />
                        <div className="flex items-center border border-[#2e2e2e] rounded-md text-[#888888]">
                            <span className="pl-3 pr-1 py-1 bg-[#171717] rounded-l-md">
                                https://
                            </span>
                            <input
                                type="text"
                                placeholder="www.youtube.com"
                                className="flex-1 bg-transparent border-none outline-none focus:ring-0 pl-2 "
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-700" />

                {/* Save/Cancel Buttons */}
                <div className="flex justify-end space-x-4 pt-4 ">
                    <Button
                        variant={'outline'}
                        className="text-[#ecf3f3] border-[#2e2e2e] bg-transparent font-semibold"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="secondary"
                        className="text-[#062826] font-semibold"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
