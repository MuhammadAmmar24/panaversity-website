import { ctaData } from "@/src/constants/cta";
import Link from "next/link";

export default function Component() {
  return (
    <div className="bg-white text-center">
      <div className="container mx-auto mb-10 max-w-[25rem] px-4 py-14 sm:max-w-[930px] sm:px-6 md:px-0 md:py-24 lg:max-w-[930px] xl:max-w-6xl">
        <div className="flex max-w-6xl flex-col items-center justify-center gap-1 rounded-3xl border-2 bg-custom-bg1 bg-cover bg-center p-10 text-center md:max-w-[72em] md:p-[3rem] lg:p-[5rem]">
          <h2 className="font-poppins mb-4 text-[1.4rem] font-bold text-white md:text-[2.6rem]">
            {ctaData.heading}
          </h2>
          <p className="font-inter mb-6 text-[0.9rem] text-background/90 md:text-[1rem]">
            {ctaData.subHeading}
          </p>
          {/* Button Component */}
          <Link
            href="/programs/flagship-program"
            aria-label="Go to programs page"
            className="font-inter group relative inline-flex items-center overflow-hidden rounded-[40px] bg-background px-8 py-2 text-[1rem] font-semibold text-textPrimary hover:bg-accent hover:text-textPrimary md:px-14 md:py-4"
          >
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-transparent opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
            <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-300 group-hover:translate-x-0">
              <ArrowRightIcon className="h-5 w-5" />
            </span>
            <span className="relative">{ctaData.buttonText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hidden h-5 w-5 md:flex"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
