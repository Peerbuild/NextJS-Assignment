import DashboardLayout from "../../../components/layouts/DashBoard";
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Upload } from "lucide-react"

export default function Page() {
    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-3xl ml-4">
                <h1 className="text-3xl font-bold">Header</h1>
                <p className="text-sm text-[#afbbbb]">Update the content of the header (navbar) of the site.</p>

                <hr className="border-[#2e2e2e]" />

                <div className="flex gap-5 justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Brand Logo</h2>
                        <p className="text-sm text-[#afbbbb]">This will be displayed as the logo in the header.</p>
                    </div>

                    <div className="flex place-items-start gap-6">
                        <div className="w-20 h-20 bg-transparent border border-[#2e2e2e] flex items-center justify-center rounded-lg overflow-hidden">
                            <Image src="/Logo.svg" alt="Brand Logo" width={50} height={60} />
                        </div>
                        <div className="flex flex-col items-center ">
                            <Button variant="outline" className="text-white border-[#2e2e2e] bg-transparent  w-72 h-28 flex flex-col items-center justify-center">
                                <Upload size={24} className="mb-2" />
                                <span className="underline text-white text-base font-semibold underline-offset-2">Click to upload</span>
                            <p className="text-xs text-[#888888] font-medium mt-1">PNG, SVG or JPG</p>
                            </Button>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-700" />

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Button</h2>
                    <p className="text-sm text-gray-400">This will be displayed as the call to action button in the header.</p>
                    <Input type="email" placeholder="Email" className="bg-black border-gray-600 text-white" />
                    <Input type="url" placeholder="https:// www.youtube.com" className="bg-black border-gray-600 text-white" />
                </div>

                <hr className="border-gray-700" />

                <div className="flex justify-end space-x-4 pt-4">
                    <Button variant="outline" className="text-white border-gray-600 hover:bg-gray-800">Cancel</Button>
                    <Button className="bg-white text-black hover:bg-gray-200">Save Changes</Button>
                </div>
            </div>
        </DashboardLayout>
    )
}