"use client";

import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    number: 21000,
    text: "Active Students",
  },
  {
    number: 7,
    text: "Active Programs ",
  },
  {
    number: 4,
    text: "Global Reach",
  },
  {
    number: 40,
    text: "Expert Instructors",
  },
];

// Animations

const statsContainerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      duration: 0.5,
      ease: "linear",
    },
  },
};

const statsItem = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  },
};

export default function Counters() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section>
      <div className="mx-auto">
        {/* <div className="font-sans text-4xl items-center text-center justify-center my-10"></div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-20 justify-center items-center">
          {stats.map((item, index) => (
            <div
              // variants={statsItem}
              className={`flex flex-col justify-center items-center relative ${
                index < stats.length - 1 ? "" : ""
              }`}
              key={index}
            >
              {/* Number Section */}
              <div
                ref={ref}
                className="font-bold text-xl text-primary text-center"
              >
                {isInView && (
                  <div>
                    <CountUp start={0} end={item.number} duration={3} />+
                  </div>
                )}
              </div>

              {/* Text Section */}
              <div className="text-center mt-2">
                <h4 className="text-sm text-gray-700">{item.text}</h4>
              </div>

              {/* Vertical Line (except for last item) */}
              {index < stats.length - 1 && (
                <div className="absolute lg:flex hidden -right-4 top-1/2 transform -translate-y-1/2 h-12 border-r border-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
