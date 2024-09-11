import React from 'react';
import Image from 'next/image';
import { programsData } from "@/constants/programs";

const Programs = () => {
  return (
    <section className="lg:max-w-[930px] xl:max-w-[1120px] mx-auto px-6 sm:px-6 lg:px-[0rem] py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-sm sm:text-md md:text-lg text-textPrimary text-center gradient-border font-medium border-b rounded-[100px] mb-3 sm:mb-4 md:mb-5 uppercase tracking-wide px-3 py-1">
          PROGRAMS
        </h2>
        <h1 className='text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl'>
          Active Programs
        </h1>
      </div>
      
      {/* Cards */}
      <div className='mt-8 sm:mt-8 md:mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'>
          {programsData.map((program, index) => (
            <div
              key={program.id}
              className={`w-full bg-[#f8f8f9] border-2 border-gray-200 hover:shadow-accent shadow-sm rounded-2xl p-6 transform transition duration-400 hover:shadow-md
                ${index === 2 ? 'sm:col-span-2 sm:w-[calc(50%-0.75rem)] sm:mx-auto lg:col-span-1 lg:w-full' : ''}`}
            >
              <div className='flex justify-center'>
                <Image
                  src={program.icon}
                  alt={`${program.title} Icon`}
                  priority
                  className={`w-1/5 h-auto `}
                />
              </div>
              <h3 className={`font-poppins sm:pt-6 font-bold md:font-medium text-[20px] sm:text-[24px] text-center text-textPrimary ${program.title === "GIAIC" ? 'md:-mt-4' : ''}`}>
                {program.title}
              </h3>
              <p className='pt-4 font-medium font-inter text-[0.8125rem] leading-6 text-center text-textSecondary/80'>
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;