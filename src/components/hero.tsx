import React from 'react';
import NavBar from './NavBar';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import { EmailSubscriptionForm } from './customInput';
import { MotionDiv, MotionH1, MotionP } from './MotionDiv';
import Stats from './Stats';
import BackgroundLayout from '@/components/layouts/BackGround';

const slideInVariants = (i: number) => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.5,
            duration: 0.8,
            ease: 'easeInOut',
        },
    },
});

export default function HeroSection() {
    return (
        <BackgroundLayout>
            <header className="py-14"> 
                <NavBar />
            </header>

            <div className="flex-grow flex flex-col justify-center items-center z-10 px-4 py-16 space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-6"> 
                    <MotionDiv
                        className="h-6 pl-1 pr-3 py-1 bg-gradient-to-r from-black to-[#062826] rounded-full border border-[#183d3b] inline-flex items-center gap-3 mb-2"
                        initial="hidden"
                        animate="visible"
                        variants={slideInVariants(0)}
                    >
                        <div className="px-2 py-0.5 bg-[#ecf3f3] rounded-full flex items-center gap-1">
                            <div className="w-4 h-4 relative flex-shrink-0">
                                <Image
                                    src="/star.svg"
                                    alt="Star Icon"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <span className="text-[#062826] text-xs font-semibold leading-none">
                                Pill Text Main
                            </span>
                        </div>
                        <span className="text-[#ecf3f3] text-xs font-normal leading-none">
                            Pill Text Subtitle
                        </span>
                        <MoveRight size={18} />
                    </MotionDiv>

                    <MotionH1
                        id="hero-heading"
                        className="text-5xl sm:text-6xl text-[#afbbbb] font-semibold leading-tight"
                        initial="hidden"
                        animate="visible"
                        variants={slideInVariants(1)}
                    >
                        One Line Long Header
                    </MotionH1>

                    <MotionP
                        className="text-[#afbbbb] text-base font-normal max-w-lg mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={slideInVariants(2)}
                    >
                        We hope this project will be fairly simple for you to build. We really hope that you can definitely bring this design to life!
                    </MotionP>

                    <MotionDiv
                        className="max-w-sm mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={slideInVariants(3)}
                    >
                        <EmailSubscriptionForm />
                    </MotionDiv>
                </div>  
            </div>

            <footer className="mt-10">
                <Stats />
            </footer>
        </BackgroundLayout>
    );
}
