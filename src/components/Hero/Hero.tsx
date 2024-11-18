import { HeroBg } from "@/src/components/Hero/heroBg";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative bg-background">
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-5xl pt-[4rem] sm:pt-[6rem] md:pt-[7rem] lg:pt-[8rem]">
          <div className="text-center">
            <h1 className="font-poppins text-[2rem] font-bold tracking-tight text-textPrimary xs:text-[2.5rem] sm:text-[3rem] md:text-[4rem]">
              Learn Agentic AI in{" "}
              <span className="bg-gradient-to-r from-[#0d8f5b] to-accent bg-clip-text text-accent text-transparent">
                Live Online Classes
              </span>{" "}
              by Experts
            </h1>
            <p className="font-inter mt-6 text-[0.9rem] leading-8 text-textSecondary md:text-[1.1rem]">
              Master Agentic AI augmented with our Personalized, AI-Powered
              Platform — Tailored for Your{" "}
              <span className="gradient-border2">Success!</span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/programs"
                aria-label="Go to programs page"
                className="font-inter group relative inline-flex items-center overflow-hidden rounded-[40px] border-2 border-accent bg-accent px-6 py-2.5 text-sm font-semibold text-textPrimary hover:bg-background hover:text-textPrimary sm:px-12 sm:py-4 sm:text-[0.9rem]"
              >
                <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-transparent opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
                <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-300 group-hover:translate-x-0">
                  <svg
                    className="hidden h-5 w-5 sm:flex"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">Start Your AI Journey</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -z-10 mt-[-30rem] overflow-hidden xs:mt-[-34.5rem] sm:ml-[-8rem] sm:mt-[-33rem] md:ml-[-2rem] md:mt-[-32rem] lg:mt-[-34.5rem] xl:ml-[-6rem] xl:mt-[-37rem]"
        >
          <HeroBg />
        </div>
      </div>
    </div>
  );
}
