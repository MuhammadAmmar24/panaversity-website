"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import type { Swiper as SwiperType } from "swiper/types";

interface TestimonialSwiperProps {
  testimonials: Array<{
    name: string;
    position: string;
    img: string;
    content: string;
  }>;
}

const TestimonialSwiper = ({ testimonials }: TestimonialSwiperProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleMouseEnter = () => {
    swiperRef.current?.autoplay.stop();
  };

  const handleMouseLeave = () => {
    swiperRef.current?.autoplay.start();
  };

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 2, spaceBetween: 20 },
        1280: { slidesPerView: 3, spaceBetween: 40 },
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {testimonials.map((testimonial, i) => (
        <SwiperSlide key={i}>
          <TestimonialCard
            testimonial={testimonial}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSwiper;
