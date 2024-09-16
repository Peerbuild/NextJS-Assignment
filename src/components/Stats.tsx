import React from "react";
import { MotionDiv, MotionArticle } from "./MotionDiv";

export default function Stats() {
  const stats = [
    { title: "SOME STATS", value: "+22k" },
    { title: "MORE STATS", value: "+33k" },
    { title: "LOTS OF STATS", value: "+44k" },
  ];

  return (
    <section className="py-8 px-4" aria-labelledby="stats-heading">
      <div className="max-w-3xl mx-auto">
        <MotionDiv
          className="flex lg:gap-24 md:gap-24 sm:gap-16   justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.5 }}
        >
          {stats.map((stat, index) => (
            <MotionArticle
              key={stat.title}
              className="flex flex-col items-center text-center mx-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                className="text-center text-[#afbbbb] text-[40px]  sm:text-[30px] md:text-[36px] font-bold"
              >
                {stat.value}
              </p>
            </MotionArticle>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
