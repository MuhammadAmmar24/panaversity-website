"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles
import { Autoplay, Pagination } from "swiper/modules";
import { testimonialList } from "@/constants/testimonials";

import "swiper/css/navigation";

const Testimonials = () => {
  return (
    <section className="ezy__testimonial24 light py-14 md:py-24 mb-8 md:mb-0 bg-white dark:bg-[#0b1727] text-gray-900 ">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-6 md:mb-12">
          <h2 className="text-md text-textPrimary text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5  uppercase tracking-wide">
            Testimonials
          </h2>
          <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl ">
          Our User’s Speeches About Panaversity
          </h2>
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          //   pagination={{ clickable: true }}
          breakpoints={{
            240: {
              // For medium screens and up
              slidesPerView: 1,
            },
            640: {
              // For medium screens and up
              slidesPerView: 2,
            },
            1024: {
              // For large screens and up
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {testimonialList.flat().map((testimonial, i) => (
            <SwiperSlide key={i}>
              <div className="h-[22rem] xl:h-[22rem] p-6 xl:p-10 border  rounded-[20px]">
                <div className="flex items-center mb-6">
                  <div className="mr-3">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="max-w-full h-auto rounded-full border"
                      width="85"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium">{testimonial.name}</h4>
                    <p className="text-sm mb-2">{testimonial.position}</p>
                  </div>
                </div>
                <p className="opacity-75 mb-2">{testimonial.content}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
