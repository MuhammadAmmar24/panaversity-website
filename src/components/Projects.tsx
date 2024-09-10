"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import projects from "@/constants/dummyProjects";
import Image from "next/image";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";

export default function Projects() {
  const swiperRef: any = useRef();

  return (
    <div className="py- px-2 my-10 flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between">
          <div className="mb-5">
            <div className="w-full flex justify-center">
              <h2 className="text-md w-fit text-textPrimary text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-2 uppercase tracking-wide">
                Our Work
              </h2>
            </div>
            <h1 className="text-primary text-center text-3xl font-bold pl-2">
              Projects
            </h1>
          </div>

          {projects.length > 4 && (
            <div className="flex justify-between w-28 mb-4">
              {/* Previous Button */}
              <button
                className="relative flex items-center justify-center w-10 h-10 overflow-hidden font-bold rounded-full group"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-accent opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
                <FaArrowLeftLong className="relative w-4 h-4 text-gray-800 group-hover:text-textPrimary" />
                <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
              </button>

              {/* Next Button */}
              <button
                className="relative flex items-center justify-center w-10 h-10 overflow-hidden font-bold rounded-full group"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-accent opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
                <FaArrowRight className="relative w-4 h-4 text-gray-800 group-hover:text-textPrimary" />
                <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
              </button>
            </div>
          )}
        </div>

        <div className="pt-5 pb-10">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={4} // Show four slides on large screens
            spaceBetween={5}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4, // Show four slides on large screens
              },
            }}
            modules={[Autoplay]}
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
                      className="object-cover rounded-lg min-w-[100%] min-h-32"
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
