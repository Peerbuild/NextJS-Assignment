"use client";
import DashboardLayout from '@/components/layouts/DashBoardLayout';
import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Upload } from "lucide-react";
import { useEdgeStore } from '@/lib/edgestore';
import { useForm } from 'react-hook-form';
import { updateBrandInfo } from '@/app/action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    buttonLink: z.string().min(1, { message: "Button link is required" }),
    brandLogoUrl: z.string().min(1, { message: "Please upload an image" }),
});

export default function Page() {
    const { edgestore } = useEdgeStore();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isuploading, setIsUploading] = useState(false);
    const [logoUrl, setLogoUrl] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [brandLogoUrl, setBrandLogoUrl] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [highlightedFields, setHighlightedFields] = useState({
        email: false,
        buttonLink: false,
        brandLogoUrl: false
    });

    useEffect(() => {
        async function fetchLogo() {
            try {
                const response = await fetch('/api/getlogo');
                const data = await response.json();
                setLogoUrl(data.url);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching logo:", error);
                setLoading(false);
            }
        }

        fetchLogo();
    }, []);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            try {
                setIsUploading(true);
                const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => { console.log(progress); }
                });
                if (res && res.url) {
                    setIsUploading(false);
                    setBrandLogoUrl(res.url);
                }
            } catch (error) {
                setIsUploading(false);
                console.error("File upload failed:", error);
            }
        }
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm<{
        email: string;
        buttonLink: string;
        brandLogoUrl: string;
    }>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            buttonLink: '',
            brandLogoUrl: '',
        }
    });

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('brandLogoUrl', brandLogoUrl);
        formData.append('email', data.email);
        formData.append('buttonLink', data.buttonLink);

        try {
            const result = await updateBrandInfo(formData);
            if (result.success) {
                setLogoUrl(brandLogoUrl);
                reset();
                revalidatePath('/api/getlogo');
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error("Error updating brand info:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleHighlight = (field: keyof typeof highlightedFields) => {
        setHighlightedFields((prev) => ({ ...prev, [field]: true }));
        setTimeout(() => {
            setHighlightedFields((prev) => ({ ...prev, [field]: false }));
        }, 2000);
    };

    const handleValidation = (event: React.FormEvent) => {
        event.preventDefault();
        if (errors.email) handleHighlight("email");
        if (errors.buttonLink) handleHighlight("buttonLink");
        if (!brandLogoUrl) handleHighlight("brandLogoUrl");
        handleSubmit(onSubmit)();
    };

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

                <div className="flex gap-5 justify-between">
                    <div className="flex flex-col space-y-1">
                        <h2 className="text-base text-white font-semibold">Brand Logo</h2>
                        <p className="text-sm text-[#afbbbb]">This will be displayed as the logo in the header.</p>
                    </div>

                    <div className="flex place-items-start gap-6 pr-32">
                        <div className="w-20 h-20 bg-transparent border transition-all duration-200  ease-in-out border-[#2e2e2e] flex items-center justify-center rounded-lg relative">
                            {loading ? (
                                <div className="w-12 h-12 bg-gray-700 animate-pulse rounded-lg"></div>
                            ) : (
                                <Image
                                    src={logoUrl}
                                    alt="Brand Logo"
                                    width={50}
                                    height={60}
                                    priority
                                />
                            )}
                        </div>

                        <div className="flex flex-col items-center">
                            <Button
                                variant="outline"
                                className={`text-white  bg-transparent w-72 h-28 flex flex-col items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200  ${highlightedFields.brandLogoUrl ? 'border-red-500' : 'border-[#2e2e2e]'}`}
                                disabled={isuploading}
                                onClick={handleButtonClick}
                            >
                                {isuploading ? (
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <Image
                                            src="/spinner.svg"
                                            alt="Loading spinner"
                                            width={50}
                                            height={50}
                                            className="animate-spin"
                                        />
                                        <p className="text-xs text-[#888888] font-medium">
                                            Uploading...
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <Upload size={24} className="mb-2" />
                                        <span className="underline text-white text-base font-semibold underline-offset-2">
                                            Click to upload
                                        </span>
                                        <p className="text-xs text-[#888888] font-medium mt-1">
                                            PNG, SVG or JPG
                                        </p>
                                    </>
                                )}
                            </Button>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg, .svg, .webp"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileSelect}
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-700" />

                {/* Form Section */}
                <form onSubmit={handleValidation} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 items-start">
                        <div>
                            <h2 className="text-white text-base font-semibold">Button</h2>
                            <p className="text-sm text-[#afbbbb]">This will be displayed as the call to action button in the header.</p>
                        </div>

                        <div className="flex flex-col gap-4 pr-32">
                            <Input
                                type="email"
                                placeholder="Email"
                                className={`border ${highlightedFields.email ? 'border-red-500' : 'border-[#2e2e2e]'}  transition-all duration-200  ease-in-out text-[#888888]`}
                                {...register('email')}
                            />

                            <div className={`flex items-center border  transition-all duration-200  ease-in-out ${highlightedFields.buttonLink ? 'border-red-500' : 'border-[#2e2e2e]'} rounded-md text-[#888888]`}>
                                <span className="pl-3 pr-1 py-1 bg-[#171717] rounded-l-md">
                                    https://
                                </span>
                                <input
                                    type="text"
                                    placeholder="www.youtube.com"
                                    className="flex-1 bg-transparent border-none outline-none focus:ring-0 pl-2"
                                    {...register('buttonLink')}
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-700" />

                    <div className="flex justify-end space-x-4 pt-4">
                        <Button
                            variant="outline"
                            className="text-[#ecf3f3] border-[#2e2e2e] bg-transparent font-semibold"
                            disabled={isSubmitting}
                            onClick={() => reset()}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="secondary"
                            className={`text-[#062826] font-semibold transition-all duration-300 ease-in-out min-w-[80px] h-[36px] flex items-center justify-center ${isSubmitting && 'cursor-wait'}`}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Image
                                    src="/spinner.svg"
                                    alt="Loading"
                                    width={20}
                                    height={20}
                                    className="animate-spin"
                                />
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
