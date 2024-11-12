import Image from "next/image";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialSwiper from "./TestimonialSwiper";
import { testimonialData, testimonialList } from "@/src/constants/testimonials";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="light py-8 sm:py-12 lg:py-16 mb-8 md:mb-0 bg-white  text-gray-900 relative"
    >
      <Image
        src={"/testimonials/Element1.webp"}
        alt={"Testimonials Image"}
        width={500}
        height={500}
        loading="lazy"
        className="absolute pl-[1rem] sm:right-[1rem] top-[1rem] md:top-[2rem] w-[4rem] sm:w-[5rem] md:w-[6rem] lg:w-[7rem] xl:w-[9rem]"
      />
      <Image
        src={"/testimonials/Element2.webp"}
        alt={"Testimonials Image"}
        width={500}
        height={500}
        loading="lazy"
        className="absolute left-[0.5rem] sm:left-[1rem] lg:left-[2rem] bottom-[1rem] md:bottom-[2rem] w-[4rem] sm:w-[5rem] md:w-[6rem] lg:w-[8rem] xl:w-[9rem] z-50"
      />

      <div className="lg:max-w-[950px] xl:max-w-[1165px] mx-auto px-4 sm:px-6 lg:-px-1">
        <TestimonialHeader
          sectionHeading={testimonialData.sectionHeading}
          mainHeading={testimonialData.mainHeading}
        />
        <TestimonialSwiper testimonials={testimonialList.flat()} />
      </div>
    </section>
  );
};

export default Testimonials;