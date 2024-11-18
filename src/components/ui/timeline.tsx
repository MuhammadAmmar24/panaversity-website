"use client";
import { timelineContent } from "@/src/constants/courses";
import { TimelineEntry } from "@/src/types/timeline";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
      className="z-0 w-full bg-custom-bg bg-cover font-sans md:px-10"
      ref={containerRef}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 md:px-0">
        <h2 className="text-md gradient-border mb-5 w-fit rounded-[100px] border-b pt-10 font-medium uppercase tracking-wide text-white sm:text-lg">
          {timelineContent.sectionHeading}
        </h2>
        <h2 className="font-poppins mb-[3rem] text-center text-3xl font-semibold tracking-tighter text-white sm:text-4xl md:mb-0 md:text-5xl">
          {timelineContent.mainHeading}{" "}
          {/* Use the content from the data file */}
        </h2>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="lg-gap-40 flex justify-center pt-10 md:pt-40 xl:gap-[220px]"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-[15px] flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 backdrop-blur-md lg:-left-[6] xl:left-[70px]">
                <div className="h-2 w-2 rounded-full p-2 md:h-2 md:w-2" />
              </div>
              <h2 className="hidden pl-10 text-start text-lg font-bold text-white md:block md:max-w-xl md:text-3xl lg:pl-12 xl:max-w-full xl:pl-32 xl:text-4xl">
                {item.title}
              </h2>
            </div>

            <div className="relative w-full pl-12 pr-4 md:pl-4">
              <h2 className="mb-4 block text-left text-2xl font-bold text-white md:hidden">
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
          className="absolute left-6 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] lg:left-6 xl:left-20"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-accent from-[0%] via-[#16a673] via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
