import { HeroBg } from "@/src/components/ui/heroBg";
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="bg-background relative">
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-5xl pt-[4rem] sm:pt-[6rem] md:pt-[7rem] lg:pt-[8rem]">
          <div className="text-center">
            <h1 className="text-[2rem] xs:text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-poppins font-bold tracking-tight text-textPrimary">
              Revolutionize Your Learning with{" "}
              <span className="text-accent bg-gradient-to-r from-[#0d8f5b] to-accent bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Education
            </h1>
            <p className="mt-6 text-[0.9rem] md:text-[1.1rem] font-inter leading-8 text-textSecondary">
              Master AI with Live, Expert-Led Courses — Tailored for Your{" "}
              <span className="gradient-border2">Success!</span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/programs"
                className="relative inline-flex items-center px-6 py-2.5 sm:px-12 sm:py-4  overflow-hidden text-sm sm:text-[0.9rem] text-textPrimary font-inter bg-accent rounded-[40px] hover:text-textPrimary font-semibold group hover:bg-background border-2 border-accent"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-transparent opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
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
          className="absolute inset-x-0 overflow-hidden mt-[-40rem] sm:mt-[-35rem]  md:mt-[-32rem] lg:mt-[-32rem] xl:mt-[-35rem] sm:ml-[-8rem]  md:ml-[-2rem]  xl:ml-[-6rem] -z-10 "
        >
          <HeroBg />
        </div>
      </div>
    </div>
  );
}
