import Image from "next/image";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialSwiper from "./TestimonialSwiper";
import { testimonialData, testimonialList } from "@/src/constants/testimonials";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="light relative mb-8 bg-white py-8 text-gray-900 sm:py-12 md:mb-0 lg:py-16"
    >
      <Image
        src={"/testimonials/Element1.webp"}
        alt={"Testimonials Image"}
        width={500}
        height={500}
        loading="lazy"
        className="absolute top-[1rem] w-[4rem] pl-[1rem] sm:right-[1rem] sm:w-[5rem] md:top-[2rem] md:w-[6rem] lg:w-[7rem] xl:w-[9rem]"
      />
      <Image
        src={"/testimonials/Element2.webp"}
        alt={"Testimonials Image"}
        width={500}
        height={500}
        loading="lazy"
        className="absolute bottom-[1rem] left-[0.5rem] z-50 w-[4rem] sm:left-[1rem] sm:w-[5rem] md:bottom-[2rem] md:w-[6rem] lg:left-[2rem] lg:w-[8rem] xl:w-[9rem]"
      />

      <div className="lg:-px-1 mx-auto px-4 sm:px-6 lg:max-w-[950px] xl:max-w-[1165px]">
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
