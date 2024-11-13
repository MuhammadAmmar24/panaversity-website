import Breadcrumbs from "@/src/components/ui/Breadcrumbs";
import React from "react";

interface HeaderSectionProps {
  title: React.ReactNode;
  description: string;
  breadcrumbs: { label: string; href: string }[];
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  title,
  description,
  breadcrumbs,
}) => (
  <div className="flex justify-center items-center bg-teamBg bg-cover bg-center">
    <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] min-h-48 sm:min-h-52 md:min-h-72 lg:min-h-[26rem] py-2 sm:py-10">
      <div className="lg:max-w-[990px] xl:max-w-[1200px] px-4 sm:px-6 lg:px-8 mx-auto">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="max-w-[312px] xs:max-w-[400px] sm:max-w-[630px] lg:max-w-[760px] m-auto mt-8 sm:mt-10 lg:mt-20 px-4">
        <h1 className="text-[1.8rem] xs:text-[2rem] sm:text-[2.7rem] md:text-[3rem] lg:text-[3.6rem] leading-tight  text-background font-bold font-poppins tracking-normal mx-auto">
          {title}
        </h1>
        <p className="text-background/60 mb-8 md:mb-0 pt-2 px-4 mt-0 max-w-[28rem] mx-auto text-sm xs:text-base md:text-lg lg:text-xl">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default HeaderSection;
