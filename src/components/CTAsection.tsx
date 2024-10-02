import { ctaData } from "@/src/constants/cta"
import Link from "next/link";

export default function Component() {
  return (
    <div className="bg-white text-center">
      <div className="container mx-auto max-w-[23rem] sm:max-w-[930px] lg:max-w-[930px] xl:max-w-6xl px-4    sm:px-6 md:px-0 py-14 md:py-24 mb-10">
        <div className="bg-custom-bg1 flex flex-col justify-center items-center gap-1 bg-center bg-cover rounded-3xl p-5 md:p-[3rem] lg:p-[5rem] max-w-6xl  md:max-w-[72em] text-center border-2">
          <h2 className="text-[1.4rem] md:text-[2.6rem] font-bold text-white font-poppins mb-4">{ctaData.heading}</h2>
          <p className="text-[0.9rem] md:text-[1rem] mb-6 text-background/90 font-inter">
            {ctaData.subHeading}
          </p>
          {/* Button Component */}
          <Link
            href="/programs/flagship-program"
            className="relative inline-flex items-center px-8 py-2 lg:px-14 lg:py-4 overflow-hidden text-[1rem] text-textPrimary font-inter bg-background rounded-[40px] hover:text-textPrimary font-semibold group hover:bg-accent"
          >
            <span className="absolute left-0 block w-full h-0 transition-all bg-transparent opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <ArrowRightIcon className="w-5 h-5" />
            </span>
            <span className="relative">{ctaData.buttonText}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}