import React from "react";
import Image from "next/image";
import logo from "../../public/logos/logoIcon.png";
import Counters from "./Counters";

export default function About() {
  return (
    <section className="lg:max-w-[950px] xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-[0rem] py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-[2rem]">
        <div>
          <Image
            src={logo}
            width={500}
            height={500}
            alt={"Panaversity Logo"}
            className="w-auto max-h-[8rem] lg:max-h-[45rem] xl:max-h-[32rem]"
          />
        </div>
        <div className="flex flex-col gap-5 items-center md:items-start mt-6 md:mt-0">
          <h2 className="text-sm sm:text-md md:text-lg text-textPrimary text-center gradient-border font-medium border-b rounded-[100px] mb-3 sm:mb-4 md:mb-5 uppercase tracking-wide px-3 py-1">
            About Panaversity
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-light font-inter text-textSecondary text-center md:text-left">
            Panaversity is revolutionizing AI education with cutting-edge
            programs in Generative AI and cloud computing, preparing you for the
            $100 trillion AI industry. Our hands-on programs combine advanced
            technology with essential skills and personalized coaching.
            Transform your ambition into success and lead in the AI-driven
            future.
          </p>
        </div>
      </div>
      <div className="mt-8 sm:mt-12">
        <hr className="w-full" />
      </div>
      <div className="py-8">
        <Counters />
      </div>
    </section>
  );
}