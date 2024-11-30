import { aboutData } from "@/src/constants/about";
import Image from "next/image";
import logo from "../../public/logos/logoIcon.webp";
import Counters from "./Counters";

export default function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:max-w-[950px] lg:px-[0rem] lg:py-16 xl:max-w-6xl">
        <div className="flex flex-col items-center justify-center md:flex-row md:gap-[2rem]">
          <div>
            <Image
              src={logo}
              width={500}
              height={500}
              alt={"Panaversity Logo"}
              className="max-h-[8rem] w-auto md:max-h-[45rem] xl:max-h-[32rem]"
            />
          </div>
          <div className="mt-6 flex flex-col items-center gap-5 md:mt-0 md:items-start">
            <h2 className="sm:text-md gradient-border mb-3 rounded-[100px] border-b text-center text-sm font-medium uppercase tracking-wide text-textPrimary sm:mb-4 md:mb-5 md:text-lg">
              {aboutData.sectionHeading}
            </h2>
            <p className="font-inter text-left text-sm font-light text-textSecondary sm:text-base md:text-left md:text-lg">
              {aboutData.content}
            </p>
          </div>
        </div>
        <div className="mt-8 sm:mt-12">
          <hr className="w-full" />
        </div>
        <div className="py-8">
          <Counters />
        </div>
      </div>
    </section>
  );
}
