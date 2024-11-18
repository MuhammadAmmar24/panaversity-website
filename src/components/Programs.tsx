import { programs, programsData } from "@/src/constants/programs";
import Image from "next/image";
import Link from "next/link";

const Programs = () => {
  return (
    <section className="mx-auto px-6 py-8 sm:px-6 sm:py-12 md:mt-5 lg:max-w-[930px] lg:px-[0rem] lg:py-16 xl:max-w-[1120px]">
      <div className="mb-6 flex flex-col items-center justify-center text-center sm:mb-8 md:mb-12">
        <h2 className="text-md gradient-border mb-5 mt-5 rounded-[100px] border-b text-center font-medium uppercase tracking-wide text-textPrimary sm:text-lg md:mt-0">
          {programsData.sectionHeading}
        </h2>
        <h3 className="font-poppins text-center text-3xl font-semibold tracking-tighter text-textPrimary sm:text-4xl md:text-5xl">
          {programsData.mainHeading}
        </h3>
      </div>

      {/* Cards */}
      <div className="mt-8 sm:mt-8 md:mt-10">
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <Link
              href={program.link}
              aria-label={`Check out ${program.title}`}
              key={program.id}
              passHref
              target="_blank"
            >
              <div
                className={`duration-400 group relative transform bg-[#f8f8f9] p-6 shadow-lg transition hover:shadow-md ${
                  index === 2
                    ? "sm:col-span-2 sm:mx-auto lg:col-span-1 lg:w-full"
                    : ""
                }`}
              >
                {/* Top Border */}
                <div className="absolute left-0 top-0 h-0.5 w-full origin-center scale-x-0 transform bg-accent transition-transform duration-500 group-hover:scale-x-100"></div>

                {/* Bottom Border */}
                <div className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 transform bg-accent transition-transform duration-500 group-hover:scale-x-100"></div>

                {/* Left Border */}
                <div className="absolute left-0 top-0 h-full w-0.5 origin-center scale-y-0 transform bg-accent transition-transform duration-500 group-hover:scale-y-100"></div>

                {/* Right Border */}
                <div className="absolute right-0 top-0 h-full w-0.5 origin-center scale-y-0 transform bg-accent transition-transform duration-500 group-hover:scale-y-100"></div>

                {/* Card Content */}
                <div className="flex justify-center">
                  <Image
                    src={program.icon}
                    alt={`${program.title} Icon`}
                    loading="lazy"
                    className={`h-auto w-1/5`}
                  />
                </div>
                <h3
                  className={`font-poppins text-center text-[20px] font-bold text-textPrimary sm:pt-6 sm:text-[24px] md:font-medium ${
                    program.title === "GIAIC" ? "md:-mt-4" : ""
                  }`}
                >
                  {program.title}
                </h3>
                <p className="pt-4 text-justify text-[0.8125rem] font-medium leading-6 text-textSecondary">
                  {program.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
