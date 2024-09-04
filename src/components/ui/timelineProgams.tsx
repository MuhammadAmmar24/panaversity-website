"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
}

const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full text-black font-sans px-4 md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-16 sm:py-20 px-4 md:px-8 lg:px-10 flex flex-col justify-center items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block mb-5 rounded-[20px] bg-muted w-fit px-3 py-1 text-[0.6rem] md:text-[0.8rem] text-primary"
        >
          Courses
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-2xl text-primary text-center font-poppins font-bold tracking-tighter sm:text-4xl md:text-5xl max-w-5xl"
        >
          Master the Future of AI with Our Comprehensive Curriculum
        </motion.p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={
              scrollDirection === "down"
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: index * 0.2,
            }}
            className={`flex flex-col md:flex-row justify-start items-center pt-8 sm:pt-12 md:pt-24 md:gap-10 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Icon and Line */}
            <div className="relative flex items-center justify-center z-10 w-full md:w-1/2 mb-6 md:mb-0">
              <motion.div
                whileHover={{ scale: 1.05}}
                className="h-12 w-12 sm:h-14 sm:w-14 md:h-20 md:w-20 rounded-full bg-accent flex items-center justify-center shadow-2xl transform transition-transform duration-300 ease-in-out"
              >
                <motion.div
                  // whileHover={{ rotate: -15 }}
                  className="text-primary hover:text-accent hover:bg-white w-[90%] rounded-full h-[90%] flex items-center justify-center text-2xl font-semibold sm:text-3xl md:text-4xl"
                >
                  {item.icon}
                </motion.div>
              </motion.div>
            </div>

            {/* Content Card */}
            <div
              className={`relative flex justify-center items-center  w-full md:w-1/2 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl bg-[#F9FAFB] transform transition-transform duration-500 ease-in-out ${
                index % 2 === 0 ? "text-right" : "text-left"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={
                  scrollDirection === "down"
                    ? { opacity: 1, x: 0 }
                    : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2 sm:mb-4">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base md:text-lg">
                  {item.content}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Central Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 overflow-hidden w-[2px] sm:w-[3px] md:w-[4px] bg-gray-50 rounded-full shadow-md"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] sm:w-[3px] md:w-[4px] bg-primary rounded-full shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
