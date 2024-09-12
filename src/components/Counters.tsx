"use client";
import CountUp from "react-countup";
import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import { stats } from "@/constants/counter"; // Adjust the path

export default function Counters() {
  const [hasCounted, setHasCounted] = useState(false);

  const onVisibilityChange = (isVisible: boolean) => {
    if (isVisible && !hasCounted) {
      setHasCounted(true);
    }
  };

  return (
    <section>
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-[7rem] justify-center items-center">
          {stats.map((item, index) => (
            <div
              className={`flex flex-col justify-center items-center relative ${
                index < stats.length - 1 ? "" : ""
              }`}
              key={index}
            >
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

              {/* Text Section */}
              <div className="text-center mt-2">
                <h3 className="text-sm text-gray-700">{item.text}</h3>
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
