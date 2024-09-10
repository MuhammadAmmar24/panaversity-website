"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonialList } from "@/constants/testimonials";

// Import Swiper types
import type { Swiper as SwiperType } from "swiper/types";

const Testimonials = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleMouseEnter = () => {
    swiperRef.current?.autoplay.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay.start();
  };

  return (
    <section className="bg-white dark:bg-[#0b1727] text-gray-900">
      <div className="container mx-auto max-w-[1250px] px-4 md:px-0 py-14 md:py-18">
        <div className="flex flex-col items-center justify-center text-center mb-6 md:mb-12">
          <h2 className="text-sm sm:text-md md:text-lg text-textPrimary text-center gradient-border font-medium border-b rounded-[100px] mb-3 sm:mb-4 md:mb-5 uppercase tracking-wide px-3 py-1">
            Testimonials
          </h2>
          <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl">
            Our User's Speeches About Panaversity
          </h2>
        </div>

        <div className="mt-8 sm:mt-8 md:mt-10">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              240: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {testimonialList.flat().map((testimonial, i) => (
              <SwiperSlide key={i}>
                <div
                  className=" h-[20rem] md:h-[17rem] lg:h-[18rem] p-6 xl:p-10 border border-gray-200 rounded-[20px] hover:shadow- hover:shadow-accent transition-shadow duration-300"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center text-left mb-6">
                    <div className="mr-3">
                      <img
                        src={testimonial.img}
                        alt={testimonial.name}
                        className="max-w-full h-auto rounded-full border"
                        width="85"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm mb-2">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className=" mb-2 text-[13px] text-textSecondary font-light font-inter">
                    {testimonial.content}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
