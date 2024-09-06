import React from "react";
import Image from "next/image";
import logo from "../../public/logos/logoIcon.png";
import Counters from "./Counters";

export default function About() {
  return (
    <div>
      <div className="w-full md:px-10 py-10 grid lg:grid-cols-[20%,60%] xs:grid-cols-1 justify-center ">
        <div className="flex px-16 items-center">
          <Image src={logo} alt={""} className=" w-auto h-[10rem]" />
        </div>
        <div className="flex flex-col gap-5 p-10">
          <div>
            <h2 className="text-md sm:text-[1rem] gradient-border font-bold border-b  w-fit text-[#031811] uppercase tracking-wide">
              About Panversity
            </h2>
          </div>
          <p className="md:text-[1.2rem] xs:text-lg font-light font-inter text-textSecondary">
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
