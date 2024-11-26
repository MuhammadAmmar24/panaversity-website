"use client";
import { stats } from "@/src/constants/counter";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Counters() {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [counters, setCounters] = useState(
    stats.map(() => ({ hasStarted: false, value: 0 })),
  );

  useEffect(() => {
    if (inView) {
      setCounters((prevCounters) =>
        prevCounters.map((counter, index) => ({
          ...counter,
          hasStarted: true,
          value: stats[index].number,
        })),
      );
    }
  }, [inView]);

  return (
    <section ref={ref}>
      <div className="mx-auto">
        <div className="grid grid-cols-1 items-center justify-center gap-2 gap-y-6 px-[7rem] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              className={`relative flex flex-col items-center justify-center ${
                index < stats.length - 1 ? "" : ""
              }`}
              key={index}
            >
              <div className="text-center text-xl font-bold text-primary">
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

              <div className="mt-1 lg:mt-2 text-center">
                <h3 className="text-sm text-gray-700">{item.text}</h3>
              </div>

              {index < stats.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-12 -translate-y-1/2 transform border-r border-gray-300 lg:flex"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
