import React from 'react';
import Image from 'next/image';
import { programsData } from "@/constants/programs";


const Programs = () => {


  return (
    <div className='w-full  bg-background p mx-auto xl:px-24 py-[5rem] flex flex-col items-center justify-center'>
      <h2 className="text-sm sm:text-md md:text-lg text-textPrimary text-center gradient-border font-medium border-b rounded-[100px] mb-3 sm:mb-4 md:mb-5 uppercase tracking-wide px-3 py-1">
        PROGRAMS
      </h2>
      <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-textPrimary font-poppins font-semibold tracking-tighter text-center'>Active Programs</h1>
      <p className='text-[0.8rem] md:text-[0.9rem] text-center font-inter text-textSecondary tracking-tight font-light pt-5 px-[1.75rem] md:px-[18rem]'>
        Panaversity is launched to transform AI education across South Asia. Building on our success in Pakistan, we’re expanding to empower the next generation of tech leaders. Discover our active programs shaping the future of AI.
      </p>
      
      {/* Cards */}
      <div className='pt-12 sm:pt-16 px-5 xs:px-10 sm:px-5 md:px-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 justify-center  '>
        {programsData.map((program) => (
          <div
            key={program.id}
            className='  w-full bg-background border-2 border-gray-200 hover:border-accent shadow-sm rounded-2xl p-6 transform transition duration-500  hover:shadow-md '
          >
            <div className='flex justify-center  '>
              <Image
                src={program.icon}
                alt={`${program.title} Icon`}
                priority
                className='w-1/4 h-auto   rounded-full '
              />
            </div>
            <h1 className='pt-3 font-poppins sm:pt-6 font-bold text-[20px] sm:text-[24px] text-center text-[#031811]'>
              {program.title}
            </h1>
            <p className='pt-4 font-light font-inter text-[13px] text-center text-[#031811B2]'>
              {program.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
