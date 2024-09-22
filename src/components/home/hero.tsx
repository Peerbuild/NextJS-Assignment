import React from "react";
import NavBar from "../NavBar";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { EmailSubscriptionForm } from "./EmailInput";
import { MotionDiv, MotionH1, MotionP } from "../MotionDiv";
import Stats from "../Stats";
import BackgroundLayout from "@/components/layouts/BackGround";

const slideInVariants = (i: number) => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
});

export default function HeroSection() {
  return (
    <BackgroundLayout>
      <header className="py-14">
        <NavBar />
      </header>

      <div className="flex-grow flex flex-col justify-center items-start z-10 px-4 py-16 space-y-8">
        <div className="text-start max-w-3xl mx-auto flex flex-col md:items-center items-start justify-center lg:mt-0 mt-10 space-y-6 ">
          <MotionDiv
            className="h-auto pl-1 pr-3 py-1 bg-gradient-to-r from-black to-[#062826] rounded-full border border-[#183d3b] inline-flex items-center gap-3 md:mb-2 mb-0"
            initial="hidden"
            animate="visible"
            variants={slideInVariants(0)}
          >
            <div className="px-2 py-[2px] bg-[#ecf3f3] rounded-full flex items-center gap-1">
              <div className="w-4 h-4 relative object-contain flex-shrink-0">
                <Image src="/star.svg" alt="Star Icon" width={18} height={18} />
              </div>
              <span className="text-[#062826]  text-xs font-semibold leading-none">
                Pill Text Main
              </span>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <span className="text-[#ecf3f3] text-xs font-normal leading-none">
                Pill Text Subtitle
              </span>
              <MoveRight aria-hidden="true" size={18} />
            </div>
          </MotionDiv>

          <MotionH1
            id="hero-heading"
            className="!mt-0 text-5xl sm:text-6xl text-[#afbbbb] font-semibold lg:leading-normal leading-relaxed text-start md:text-center md:px-12"
            initial="hidden"
            animate="visible"
            variants={slideInVariants(1)}
          >
            One Line Long Header
          </MotionH1>

          <MotionP
            className="text-[#afbbbb] leading-6 text-base font-normal max-w-lg mx-auto text-start md:text-center"
            initial="hidden"
            animate="visible"
            variants={slideInVariants(2)}
          >
            We hope this project will be fairly simple for you to build. We
            really hope that you can definitely bring this design to life!
          </MotionP>

          <MotionDiv
            className="max-w-sm md:mx-auto "
            initial="hidden"
            animate="visible"
            variants={slideInVariants(3)}
          >
            <EmailSubscriptionForm />
          </MotionDiv>
        </div>
      </div>

      <footer className="lg:mt-10 md:mt-48 mt-8">
        <Stats />
      </footer>
    </BackgroundLayout>
  );
}
