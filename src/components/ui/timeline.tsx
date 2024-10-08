"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { timelineContent } from "@/src/constants/courses";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-custom-bg bg-cover font-sans md:px-10 z-0"
      ref={containerRef}
    >
      <div className="max-w-6xl flex flex-col justify-center items-center mx-auto px-4 md:px-0">
        <h2 className="text-md sm:text-lg gradient-border font-medium border-b rounded-[100px] pt-10 mb-5 w-fit text-white uppercase tracking-wide">
          {timelineContent.sectionHeading}
        </h2>
        <h2 className="text-3xl text-white font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl mb-[3rem] md:mb-0 ">
          {timelineContent.mainHeading}{" "}
          {/* Use the content from the data file */}
        </h2>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-center pt-10 md:pt-40 xl:gap-[220px] lg-gap-40"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-5 absolute left-[15px] lg:-left-[6] xl:left-[70px] w-5 rounded-full bg-accent/20 backdrop-blur-md flex justify-center items-center ">
                <div className="md:h-2 md:w-2 h-2 w-2 rounded-full dark:bg-neutral-800 p-2" />
              </div>
              <h2 className="hidden md:block pl-10 lg:pl-12 xl:pl-32 text-start text-white font-bold text-lg md:text-3xl xl:text-4xl md:max-w-xl xl:max-w-full">
                {item.title}
              </h2>
            </div>

            <div className="relative pl-12 pr-4 md:pl-4 w-full">
              <h2 className="md:hidden  block text-2xl mb-4 text-left font-bold text-white">
                {item.title}
              </h2>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-6  lg:left-6 xl:left-20 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-accent via-[#16a673] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
