"use client";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay'; // Import autoplay styles
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css/navigation';
const testimonialList = [
  [
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
      name: "Aksay Kumar",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
      name: "Sara Tailor",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
      name: "John Leo",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
  ],
  [
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
      name: "Aksay Kumar",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
      name: "Sara Tailor",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
      name: "John Leo",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
  ],
  [
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
      name: "Aksay Kumar",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
      name: "Sara Tailor",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
    {
      img: "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
      name: "John Leo",
      position: "CEO & Founder at EasyFrontend",
      content:
        "It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you. It’s easier to reach your savings goals when you have the right savings account. Take a look and find the right one for you.",
    },
  ],
];

const Testimonials = () => {
  return (
    <section className="ezy__testimonial24 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center text-center mb-6 md:mb-12">
          <div className="max-w-xl">
            <hr className="w-20 mb-4 border-gray-300 dark:border-gray-600 mx-auto" />
            <h2 className="text-[2.5rem] font-bold">What They Say</h2>
          </div>
        </div>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
        //   pagination={{ clickable: true }}
          breakpoints={{
            240: { // For medium screens and up
                slidesPerView: 1,
              },
            640: { // For medium screens and up
              slidesPerView: 2,
            },
            1024: { // For large screens and up
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