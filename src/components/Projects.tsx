"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
// import the dummy projects data
import projects from "@/constants/dummyProjects";
import Image from "next/image";
// import the icons
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";

export default function Projects() {
  // Create a reference for the swiper instance
  const swiperRef: any = useRef();
          
  return (
    <div className="py- px-2 mt-10 flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between">
          {/* Heading */}
          <div className="mb-5">
            <div className="w-full flex justify-center">
              <h2 className="text-md w-fit text-textPrimary text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-2  uppercase tracking-wide">
                Our Work
              </h2>
            </div>
            <h1 className="text-primary text-center text-3xl font-bold pl-2">
              Projects
            </h1>
          </div>
          {/* Custom Forward and Backward Buttons */}
          <div className="flex justify-between w-20 mb-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold h-fit w-fit py-2 px-[0.6rem] rounded-full"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <FaArrowLeftLong className="w-3" />
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold h-fit w-fit py-2 px-[0.6rem] rounded-full"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <FaArrowRight className="w-3" />
            </button>
          </div>
        </div>
        {/* Projects Column */}
        <div>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={3} // Default value for large screens
            spaceBetween={5}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              // Define breakpoints for different screen sizes
              320: {
                slidesPerView: 1, // For screens 640px and above (small devices)
              },
              640: {
                slidesPerView: 2, // For screens 768px and above (medium devices)
              },
              1024: {
                slidesPerView: 3, // For screens 1024px and above (large devices)
              },
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {projects.map((data: any, index: number) => (
              <SwiperSlide key={index} className="flex border rounded-lg p-2">
                <div className="w-[100%] h-32">
                  <div className="min-w-[100%] min-h-[96%]">
                    <Image
                      src={data.image}
                      alt={data.title}
                      width={300}
                      height={200}
                      className="object-cover rounded-lg min-w-[98%] min-h-32"
                    />
                  </div>
                </div>
                <div className="text-left mt-2">
                  <h1 className="text-lg font-bold">{data.title}</h1>
                  <p className="text-sm">{data.description}</p>
                  <div className="flex">
                    {data.tags.map((tag: any, tagIndex: number) => (
                      <p
                        key={tagIndex}
                        className={`text-xs mr-2 font-semibold ${tag?.color}`}
                      >
                        {tag.tag}
                      </p>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
