import React from "react";
import Image from "next/image";
import logo from "../../public/logos/logoIcon.png";
import Counters from "./Counters";

export default function About() {
  return (
    <div className="">
      <div className="w-full px-[2rem] md:px-[5rem] lg:px-[1rem] xl:px-[7rem] py-10 flex flex-col md:flex-row items-center justify-center md:gap-[2rem]  ">
        <div className=" ">
          <Image 
          src={logo} 
          width={500}
          height={500} 
          alt={""} 
          className="w-auto max-h-[8rem]  lg:max-h-[45rem] xl:max-h-[32rem"/>
        </div>
        <div className="flex flex-col gap-5  items-center md:items-start
        ">
          <div>
            <h2 className="text-md sm:text-[1rem] gradient-border font-bold border-b  w-fit text-textPrimary uppercase tracking-wide ">
              About Panaversity
            </h2>
          </div>
          <p className="md:text-[1rem] lg:text-[1.1rem] xl:text-[1.2rem] xs:text-lg font-light font-inter text-textSecondary text-center  md:text-left">
            Panaversity is revolutionizing AI education with cutting-edge
            programs in Generative AI and cloud computing, preparing you for the
            $100 trillion AI industry. Our hands-on programs combine advanced
            technology with essential skills and personalized coaching.
            Transform your ambition into success and lead in the AI-driven
            future.
          </p>
        </div>
      </div>
      <div className="px-40">
        <hr className="" />
      </div>
      <div className="py-8">
        <Counters />
      </div>
    </div>
  );
}
