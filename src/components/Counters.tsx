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
    text: "Programs Offered",
  },
  {
    number: 13000,
    text: "Certifications Awarded Annually",
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
      <div className="container mx-auto">
        <div
          // variants={statsContainerVariant}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: true, amount: 0.1 }}
          className="font-sans text-4xl items-center text-center justify-center m-10"
        ></div>

        <div
          // variants={statsContainerVariant}
          // initial="hidden"
          // whileInView={"show"}
          // viewport={{ once: false, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-center items-center"
        >
          {stats.map((item, index) => (
            <div
              // variants={statsItem}
              className={`flex flex-col justify-center items-center relative ${
                index < stats.length - 1 ? "px-6" : ""
              }`}
              key={index}
            >
              {/* Number Section */}
              <div
                ref={ref}
                className="font-bold text-2xl text-primary text-center"
              >
                {isInView && (
                  <CountUp start={0} end={item.number} duration={3} />
                )}
              </div>

              {/* Text Section */}
              <div className="text-center mt-2">
                <h4 className="text-md text-gray-700">{item.text}</h4>
              </div>

              {/* Vertical Line (except for last item) */}
              {index < stats.length - 1 && (
                <div className="absolute lg:flex hidden -right-6 top-1/2 transform -translate-y-1/2 h-12 border-r border-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
