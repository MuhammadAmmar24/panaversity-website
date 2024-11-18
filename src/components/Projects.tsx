"use client";
import { projects, projectsData } from "@/src/constants/projects";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Define the ref type properly
export default function Projects() {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
    }
  }, []);

  return (
    <div className="mt-10 flex justify-center bg-[#fcfcff] px-6 py-5 md:px-10">
      <div className="w-full max-w-6xl">
        <div className="flex justify-center">
          <div className="mb-6 flex flex-col items-center justify-center text-center md:mb-12">
            <h2 className="text-md gradient-border mb-5 rounded-[100px] border-b text-center font-medium uppercase tracking-wide text-textPrimary sm:text-lg">
              {projectsData.sectionHeading}
            </h2>
            <h2 className="font-poppins text-center text-3xl font-semibold tracking-tighter text-textPrimary sm:text-4xl md:text-5xl">
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
                className="flex flex-col rounded-lg border p-2"
              >
                <div className="relative h-[180px] w-full">
                  <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    loading="lazy" // Lazy load images for better performance
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="mt-2 text-left">
                  <h3 className="text-lg font-bold">{data.title}</h3>
                  <p className="text-sm">{data.description}</p>
                  <div className="flex flex-wrap">
                    {data.tags.map((tag: any, tagIndex: number) => (
                      <p
                        key={tagIndex}
                        className={`mr-2 text-xs font-semibold ${tag?.color}`}
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

        <div className="flex w-full justify-center">
          {projects.length > 3 && (
            <div className="my-4 mb-10 flex w-full justify-center gap-10 md:mb-0">
              {/* Previous Button */}
              <button
                aria-label="go to previous"
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full font-bold"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-accent opacity-[3%]"></span>
                <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-accent opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
                <FaArrowLeftLong className="relative h-4 w-4 text-gray-800 group-hover:text-textPrimary" />
                <span className="absolute inset-0 rounded-full border-2 border-accent"></span>
              </button>

              {/* Next Button */}
              <button
                aria-label="go to next"
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full font-bold"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <span className="absolute left-0 top-0 h-32 w-32 -translate-y-2 translate-x-12 rotate-45 bg-accent opacity-[3%]"></span>
                <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-accent opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
                <FaArrowRight className="relative h-4 w-4 text-gray-800 group-hover:text-textPrimary" />
                <span className="absolute inset-0 rounded-full border-2 border-accent"></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
