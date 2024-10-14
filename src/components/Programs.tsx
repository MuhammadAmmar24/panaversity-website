import React from "react";
import Image from "next/image";
import Link from "next/link";
import { programsData, programs } from "@/src/constants/programs";

const Programs = () => {
  return (
    <section className=" lg:max-w-[930px] xl:max-w-[1120px] mx-auto px-6 sm:px-6 lg:px-[0rem] py-8 sm:py-12 lg:py-16 md:mt-5 " >
      <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-md text-textPrimary mt-5 md:mt-0 text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5 uppercase tracking-wide">
          {programsData.sectionHeading}
        </h2>
        <h3 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl">
          {programsData.mainHeading}
        </h3>
      </div>

      {/* Cards */}
      <div className="mt-8 sm:mt-8 md:mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {programs.map((program, index) => (
            <Link href={program.link} key={program.id} passHref target="_blank">
              <div
                className={`relative bg-[#f8f8f9] group shadow-md p-6 transform transition duration-400 hover:shadow-md
              ${index === 2
                    ? "sm:col-span-2 sm:mx-auto lg:col-span-1 lg:w-full"
                    : ""
                  }`}
              >
                {/* Top Border */}
                <div className="absolute  top-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"></div>

                {/* Bottom Border */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"></div>

                {/* Left Border */}
                <div className="absolute top-0 left-0 h-full w-0.5 bg-accent transform scale-y-0 origin-center transition-transform duration-500 group-hover:scale-y-100"></div>

                {/* Right Border */}
                <div className="absolute top-0 right-0 h-full w-0.5 bg-accent transform scale-y-0 origin-center transition-transform duration-500 group-hover:scale-y-100"></div>

                {/* Card Content */}
                <div className="flex justify-center">
                  <Image
                    src={program.icon}
                    alt={`${program.title} Icon`}
                    loading="lazy"
                    className={`w-1/5 h-auto`}
                  />
                </div>
                <h3
                  className={`font-poppins sm:pt-6 font-bold md:font-medium text-[20px] sm:text-[24px] text-center text-textPrimary ${program.title === "GIAIC" ? "md:-mt-4" : ""
                    }`}
                >
                  {program.title}
                </h3>
                <p className="pt-4 font-medium font-inter text-[0.8125rem] leading-6 text-center text-textSecondary/80">
                  {program.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;