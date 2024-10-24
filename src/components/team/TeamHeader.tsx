import Breadcrumbs from "@/src/components/ui/Breadcrumbs";

const TeamHeader = () => (
  <div className="flex justify-center items-center bg-teamBg bg-cover bg-center">
    <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] min-h-48 sm:min-h-52 md:min-h-72 lg:min-h-[26rem]">
      <div className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-3">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Our Team", href: "/team" },
          ]}
        />
      </div>

      <div className="max-w-[312px] xs:max-w-[400px] sm:max-w-[630px] md:pb-6 lg:max-w-[760px] mx-auto">
        <h1 className="text-[1.8rem] xs:text-[2rem] sm:text-[2.7rem] md:text-[3rem] lg:text-[3.6rem] -mt-4 text-background font-bold font-poppins tracking-normal leading-2 mx-auto">
          Meet The Visionaries Behind Panaversity
        </h1>
        <p className="text-background/60 mb-14 md:mb-0 pt-2 px-4 mt-0 max-w-[28rem] mx-auto">
          Discover the Experts Shaping the Future of AI Education
        </p>
      </div>
    </div>
  </div>
);

export default TeamHeader;
