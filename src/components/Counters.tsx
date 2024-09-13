<<<<<<< HEAD
"use client";
import CountUp from "react-countup";
import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import { stats } from "@/constants/counter"; // Adjust the path
=======
"use client"
import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { stats } from '@/constants/counter';
>>>>>>> 522c1384bc82d26895e3269e637c38356c7beb5b

export default function Counters() {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [counters, setCounters] = useState(stats.map(() => ({ hasStarted: false, value: 0 })));

  useEffect(() => {
    if (inView) {
      setCounters(prevCounters =>
        prevCounters.map((counter, index) => ({
          ...counter,
          hasStarted: true,
          value: stats[index].number,
        }))
      );
    }
  }, [inView]);

  return (
    <section ref={ref}>
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-[7rem] justify-center items-center">
          {stats.map((item, index) => (
            <div
              className={`flex flex-col justify-center items-center relative ${
                index < stats.length - 1 ? "" : ""
              }`}
              key={index}
            >
<<<<<<< HEAD
              {/* Number Section */}
              <VisibilitySensor
                onChange={onVisibilityChange}
                partialVisibility
                active={!hasCounted} // Disable VisibilitySensor after counting once
              >
                {(
                  { isVisible }: { isVisible: boolean } // Added type definition here
                ) => (
                  <div className="font-bold text-xl text-primary text-center">
                    {hasCounted && isVisible && (
                      <CountUp start={0} end={item.number} duration={3} />
                    )}
                    +
                  </div>
                )}
              </VisibilitySensor>
=======
              <div className="font-bold text-xl text-primary text-center">
                <CountUp
                  start={0}
                  end={counters[index].value}
                  duration={3}
                  useEasing={true}
                  useGrouping={true}
                  separator=","
                  preserveValue={true}
                >
                  {({ countUpRef }) => (
                    <div>
                      <span ref={countUpRef} />
                      {counters[index].hasStarted && "+"}
                    </div>
                  )}
                </CountUp>
              </div>
>>>>>>> 522c1384bc82d26895e3269e637c38356c7beb5b

              <div className="text-center mt-2">
                <h3 className="text-sm text-gray-700">{item.text}</h3>
              </div>

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