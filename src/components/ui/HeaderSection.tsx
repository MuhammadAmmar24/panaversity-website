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
  <div className="flex items-center justify-center bg-teamBg bg-cover bg-center">
    <div className="bg-blur-[1px] min-h-48 w-full py-2 text-center backdrop-brightness-75 backdrop-opacity-100 sm:min-h-52 sm:py-10 md:min-h-72 lg:min-h-[26rem]">
      <div className="mx-auto px-4 sm:px-6 lg:max-w-[990px] lg:px-8 xl:max-w-[1200px]">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="m-auto mt-8 max-w-[312px] px-4 xs:max-w-[400px] sm:mt-10 sm:max-w-[630px] lg:mt-20 lg:max-w-[760px]">
        <h1 className="font-poppins mx-auto text-[1.8rem] font-bold leading-tight tracking-normal text-background xs:text-[2rem] sm:text-[2.7rem] md:text-[3rem] lg:text-[3.6rem]">
          {title}
        </h1>
        <p className="mx-auto mb-8 mt-0 max-w-[28rem] px-4 pt-2 text-sm text-background/60 xs:text-base md:mb-0 md:text-lg lg:text-xl">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default HeaderSection;
