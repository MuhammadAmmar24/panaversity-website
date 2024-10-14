import Image from "next/image";
import { programOverviewData, features } from "@/src/constants/programOverview"
import Link from "next/link";

export default function ProgramOverview() {

  return (
    <section className=" px-2 sm:px-6 xl:px-0  relative bg-white mt-[4rem] sm:mt-[-6rem] md:mt-[0rem] py-[2rem] md:pt-[9rem] z-10  mb-[-3rem] pb-[4rem]">
      <div className="lg:max-w-[950px] xl:max-w-[1140px] mx-auto flex flex-col gap-y-0 xs:gap-y-0 lg:gap-y-12 xl:flex-row items-center justify-between mb-[1rem]">
        {/* Left Section: Text Content */}
        <div className="text-left mb-24 lg:-mt-28 md:mb-0 md:pr-10 xl:w-[612px] animate-fade-in-up px-[1rem]  sm:px-[0.5rem]">
          <h2 className="text-sm sm:text-md md:text-lg text-textPrimary  gradient-border font-semibold border-b w-fit uppercase tracking-wide">
            {programOverviewData.sectionHeading}
          </h2>
          <h3 className="text-2xl xs:text-3xl sm:text-4xl xl:text-4xl/[3.5rem] font-bold text-textPrimary mt-6 leading-tight font-poppins">
            {programOverviewData.mainHeading}
          </h3>
          <p className="mt-6 text-[1rem]/[2] sm:text-md/[2] text-[#031811]/70 font-rubik">
            {programOverviewData.content1}
          </p>
          <p className="mt-4 text-[1rem]/[2] sm:text-md/[2] mb-4 text-[#031811]/70 font-rubik">
            {programOverviewData.content2}
          </p>
          {/* Button Component */}
          <Link
            href="/dashboard"
            className="relative items-center justify-start inline-block px-6 py-3 md:px-4 lg:px-5 lg:py-3  mt-4    overflow-hidden font-bold rounded-full group"
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2  absolute left-0 top-0 bg-accent opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-[0.9rem] lg:text-[0.9rem] text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-textPrimary font-poppins font-medium">
              {programOverviewData.buttonText}
            </span>
            <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
          </Link>
        </div>

        {/* Right Section: Features Grid */}
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-6 xl:w-1/2 xl:pt-0 pt-0 mt-[-3rem] md:mt-[2rem] lg:mt-[0rem]">
          {features.map((feature: any, index: any) => (
            <div
              key={index}
              className="bg-white custom-shadow p-6 rounded-3xl border border-[#000000]/5 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div
                className="flex justify-center items-center mb-4"
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
              <h3 className="text-lg font-semibold text-gray-800 mb-2 font-poppins">
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
