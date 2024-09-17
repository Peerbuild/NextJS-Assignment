"use client";
// if  you want it to be a server componenet i have to remove the inview animation but thats looks good ins maller mobile screens

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Define the type for a single stat item
type Stat = {
  title: string;
  value: string | number;
};

// Define the props for the StatsClient component
interface StatsClientProps {
  stats: Stat[];
}

export default function StatsClient({ stats }: StatsClientProps) {
  const [isInView, setIsInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target); // Stop observing after animation starts
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is in view
      },
    );

    // Capture the current value of sectionRef in a local variable
    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef); // Use the local variable here
      }
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <motion.div
        className="flex lg:gap-24 md:gap-24 sm:gap-16 justify-center items-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ staggerChildren: 0.5 }}
      >
        {stats.map((stat, index) => (
          <motion.article
            key={stat.title}
            className="flex flex-col items-center text-center mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.5 }}
            aria-labelledby={`stat-title-${index}`}
            aria-describedby={`stat-value-${index}`}
          >
            <h3
              id={`stat-title-${index}`}
              className="text-center text-[#afbbbb] text-xs font-semibold uppercase mb-1"
            >
              {stat.title}
            </h3>
            <p
              id={`stat-value-${index}`}
              className="text-center text-[#afbbbb] text-[40px] sm:text-[30px] md:text-[36px] font-bold"
            >
              {stat.value}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
