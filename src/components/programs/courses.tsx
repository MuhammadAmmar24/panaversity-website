"use client"
import React, { useState } from "react";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link"
// import rabbit from "@/";
import { Course } from "@/src/lib/schemas/courses";
import { CoursesSkeleton } from "@/src/app/(dashboard)/dashboard/Components/Skeleton/CoursesSkeleton";
const CourseCard = ({ course }: { course: Course }) => (
  
  <Link
  href={`/programs/flagship-program/${course.course_id}`}
  >
    <div className="h-fit  flex flex-col bg-background dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:-translate-y-[2px] w-full fold:w-[15rem] mobileM:w-[18rem] xs:w-[23rem] sm:w-full md:w-full pb-[1rem]">
      <div className="h-[14rem] relative">
        <Image
          src={course.media_link}
          alt={course.course_name}
          layout="fill"
          // objectFit="cover"
          className="object-fit"

        />
      </div>
      <div className="h-[8rem] fold:h-[7rem]  p-3 flex flex-col justify-between">
        <div>
          <h4 className=" font-medium text-[1rem]  font-poppins">{course.course_name}</h4>
          <h6 className="text-xs font-medium mt-1 opacity-75">Course - {course.course_id}</h6>
          <p className="text-sm mt-1 line-clamp-2">{course.course_description}</p>
        </div>
      </div>
    </div>
  </Link>
);

const CoursesClient = ({ initialCourses }: { initialCourses: Course[] }) => {
  const [visibleCourses, setVisibleCourses] = useState(6);

  const handleLoadMore = () => {
    setVisibleCourses((prev) => prev + 6);
  };

  return (
    <section className="light bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-x-hidden">
      <div className="w-full mb-32">
        {/* program header */}
        <div className="flex justify-center items-center bg-teamBg bg-cover">
          <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] py-[7rem]">
            <h2
              className="text-[1.8rem] sm:text-[2rem] md:text-[3.6rem] text-background font-bold font-poppins tracking-tighter"
              style={{ wordSpacing: "0.2em" }}
            >
              Our Flagship Program
            </h2>
          </div>
        </div>

        {/* courses */}

      
        <div className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h2 className=" mt-10 mb-10 font-poppins text-md sm:text-lg gradient-border border-black font-medium border-b rounded-[100px]   w-fit  uppercase tracking-wide">APPLIED GEN AI COURSES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-20 justify-items-center md:justify-items-stretch">   
            {initialCourses.slice(0, visibleCourses).map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
      

        {/* Load More Button */}  
        {visibleCourses < initialCourses.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-accent text-white px-6 py-2 rounded hover:bg-accent/90 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesClient;