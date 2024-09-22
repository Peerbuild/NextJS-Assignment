"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Stat = {
  title: string;
  value: string | number;
};

export default function Stats() {
  const stats: Stat[] = [
    { title: "SOME STATS", value: "+22k" },
    { title: "MORE STATS", value: "+33k" },
    { title: "LOTS OF STATS", value: "+44k" },
  ];
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      className="py-8 px-4"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-3xl mx-auto">
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
              role="article"
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
    </section>
  );
}
