import { features, programOverviewData } from "@/src/constants/programOverview";
import Image from "next/image";
import Link from "next/link";

export default function ProgramOverview() {
  return (
    <section className="relative z-10 mb-[-3rem] mt-[4rem] bg-white px-2 py-[2rem] pb-[4rem] sm:mt-[-6rem] sm:px-6 md:mt-[0rem] md:pt-[12rem] xl:px-0">
      <div className="mx-auto mb-[1rem] flex flex-col items-center justify-between gap-y-0 xs:gap-y-0 lg:max-w-[950px] lg:gap-y-12 xl:max-w-[1140px] xl:flex-row">
        {/* Left Section: Text Content */}
        <div className="animate-fade-in-up mb-24 px-[1rem] text-left sm:px-[0.5rem] md:mb-0 md:pr-10 lg:-mt-28 xl:w-[612px]">
          <h2 className="sm:text-md gradient-border w-fit border-b text-sm font-semibold uppercase tracking-wide text-textPrimary md:text-lg">
            {programOverviewData.sectionHeading}
          </h2>
          <h3 className="font-poppins mt-6 text-2xl font-bold leading-tight text-textPrimary xs:text-3xl sm:text-4xl xl:text-4xl/[3.5rem]">
            {programOverviewData.mainHeading}
          </h3>
          <p className="sm:text-md/[2] font-rubik mt-6 text-[1rem]/[2] text-[#031811]/70">
            {programOverviewData.content1}
          </p>
          <p className="sm:text-md/[2] font-rubik mb-4 mt-4 text-[1rem]/[2] text-[#031811]/70">
            {programOverviewData.content2}
          </p>
          {/* Button Component */}
          <Link
            href="/dashboard"
            aria-label="Go to dashboard"
            className="group relative mt-4 inline-block items-center justify-start overflow-hidden rounded-full px-6 py-3 font-bold md:px-4 lg:px-5 lg:py-3"
          >
            <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-accent opacity-[3%]"></span>
            <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-accent opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
            <span className="font-poppins relative w-full text-left text-[0.9rem] font-medium text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-textPrimary lg:text-[0.9rem]">
              {programOverviewData.buttonText}
            </span>
            <span className="absolute inset-0 rounded-full border-2 border-accent"></span>
          </Link>
        </div>

        {/* Right Section: Features Grid */}
        <div className="mt-[-3rem] grid grid-cols-1 gap-6 px-4 pt-0 sm:grid-cols-2 md:mt-[2rem] lg:-mt-[2rem] xl:w-1/2 xl:pt-0">
          {features.map((feature: any, index: any) => (
            <div
              key={index}
              className="custom-shadow rounded-3xl border border-[#000000]/5 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div
                className="mb-4 flex items-center justify-center"
                style={{
                  backgroundColor: feature.bgColor,
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                }}
              >
                <Image
                  src={feature.icon}
                  alt={`${feature.title} Icon`}
                  width={feature.iconSize.width}
                  height={feature.iconSize.height}
                />
              </div>
              <h3 className="font-poppins mb-2 text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
