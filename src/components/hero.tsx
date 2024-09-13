import React from 'react';
import NavBar from './NavBar';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { EmailSubscriptionForm } from './customInput';
import { MotionDiv, MotionH1, MotionP } from './MotionDiv';
import Stats from './Stats';

// Define static animation variants
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
        <section className="relative min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,_#031615_5%,_#021211_10%,_#010808_25%,_#000000_60%,_#000000_100%)] text-white overflow-hidden" aria-labelledby="hero-heading">
            <div className="absolute inset-0 pointer-events-none">
                <div className="grid-pattern h-full w-full opacity-100" />
            </div>
            <header>
                <NavBar />
            </header>
            <div className="flex-grow flex flex-col justify-center items-center z-10 px-4 py-16">
                <div className="text-center max-w-3xl mx-auto">
                    <MotionDiv
                        className="h-6 pl-1 pr-3 py-1 bg-gradient-to-r from-black to-[#062826] rounded-full border border-[#183d3b] inline-flex items-center gap-3 mb-4"
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
                            <span className="text-[#062826] text-xs font-semibold leading-none">Pill Text Main</span>
                        </div>
                        <span className="text-[#ecf3f3] text-xs font-normal leading-none">Pill Text Subtitle</span>
                        <ArrowRight size={18} />
                    </MotionDiv>
                    <MotionH1
                        id="hero-heading"
                        className="text-5xl sm:text-6xl text-[#afbbbb] font-semibold mb-6 leading-tight"
                        initial="hidden"
                        animate="visible"
                        variants={slideInVariants(1)} // Pass static value here
                    >
                        One Line Long Header
                    </MotionH1>
                    <MotionP
                        className="text-[#afbbbb] text-base font-normal mb-8 max-w-lg mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={slideInVariants(2)} // Pass static value here
                    >
                        We hope this project will be fairly simple for you to build. We really hope that
                        you can definitely bring this design to life!
                    </MotionP>
                    <MotionDiv
                        className="max-w-sm mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={slideInVariants(3)} // Pass static value here
                    >
                        <EmailSubscriptionForm />
                    </MotionDiv>
                </div>
            </div>
            <footer>
                <Stats />
            </footer>
        </section>
    );
}
