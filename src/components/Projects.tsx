"use client";
import React, { useRef, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {projectsData, projects} from "@/src/constants/projects";
import Image from "next/image";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import SwiperCore from "swiper";

// Define the ref type properly
export default function Projects() {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
    }
  }, []);

  const swiperParams = useMemo(
    () => ({
      slidesPerView: 1,
      spaceBetween: 30,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      modules: [Autoplay, Navigation],
    }),
    []
  );

  return (
    <div className="bg-[#fcfcff] py-5 md:px-10 px-6 mt-10 flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="flex justify-center">
          <div className="flex flex-col items-center justify-center text-center mb-6 md:mb-12">
            <h2 className="text-md text-textPrimary text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5 uppercase tracking-wide">
              {projectsData.sectionHeading}
            </h2>
            <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl">
              {projectsData.mainHeading}
            </h2>
          </div>
        </div>

        <div>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            modules={[Autoplay, Navigation]}
            className="projectsSwiper"
          >
            {projects.map((data: any, index: number) => (
              <SwiperSlide
                key={index}
                className="flex flex-col border rounded-lg p-2"
              >
                <div className="w-full h-[180px] relative">
                  <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    loading="lazy" // Lazy load images for better performance
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="text-left mt-2">
                  <h3 className="text-lg font-bold">{data.title}</h3>
                  <p className="text-sm">{data.description}</p>
                  <div className="flex flex-wrap">
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

        <div className="w-full flex justify-center">
          {projects.length > 3 && (
            <div className="flex gap-10 w-full justify-center my-4 mb-10 md:mb-0">
              {/* Previous Button */}
              <button
                aria-label="go to previous"
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
                aria-label="go to next"
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
      </div>
    </div>
  );
}