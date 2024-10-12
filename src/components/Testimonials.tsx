"use client"
import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper/modules";
import { testimonialData, testimonialList } from "@/src/constants/testimonials";

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
    <section id="testimonials" className="light py-8 sm:py-12 lg:py-16 mb-8 md:mb-0 bg-white dark:bg-[#0b1727] text-gray-900 relative">
      <Image
        src={"/testimonials/Element1.png"}
        alt={""}
        width={500}
        height={500}
        loading="lazy"
        className='absolute pl-[1rem] sm:right-[1rem] top-[1rem] md:top-[2rem] w-[4rem] sm:w-[5rem] md:w-[6rem] lg:w-[7rem] xl:w-[9rem]'
      />
      <Image
        src={"/testimonials/Element2.png"}
        alt={""}
        width={500}
        height={500}
        loading="lazy"
        className='absolute left-[0.5rem] sm:left-[1rem] lg:left-[2rem] bottom-[1rem] md:bottom-[2rem] w-[4rem] sm:w-[5rem] md:w-[6rem] lg:w-[8rem] xl:w-[9rem] z-50'
      />
      <div className="lg:max-w-[950px] xl:max-w-[1165px] mx-auto px-4 sm:px-6 lg:-px-1">
        <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-md text-textPrimary mt-5 md:mt-0 text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5 uppercase tracking-wide">
            {testimonialData.sectionHeading}
          </h2>
          <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl">
            {testimonialData.mainHeading}
          </h2>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 40,
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
              <div className="testimonial-card p-6 border rounded-[20px] shadow-md"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center text-left mb-6">
                  <div className="mr-3 w-20">
                    <Image
                      src={testimonial.img}
                      alt={testimonial.name}
                      loading="lazy"
                      width={300}
                      height={300}
                      className="rounded-full border"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium font-poppins">{testimonial.name}</h3>
                    <p className="text-sm md:text-xs mb-2">{testimonial.position}</p>
                  </div>
                </div>
                <p className="opacity-75 mb-2 text-base">{testimonial.content}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;