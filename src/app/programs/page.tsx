"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import rabbit from "@/public/customers/evil-rabbit.png";
import { getProgramCoursesWithOpenRegistration } from "@/src/actions/courses";
import { Course } from "@/src/lib/schemas/courses";

// Skeleton Component
const SkeletonCard = () => {
  return (
    <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)] h-64 animate-pulse flex flex-col bg-gray-200 rounded-xl shadow-xl overflow-hidden">
      <div className="h-1/2 bg-gray-300"></div>
      <div className="h-1/2 p-4">
        <div className="h-5 bg-gray-300 mb-2 rounded"></div>
        <div className="h-3 bg-gray-300 mb-2 rounded w-1/2"></div>
        <div className="h-3 bg-gray-300 mb-2 rounded"></div>
        <div className="h-8 bg-gray-300 mt-2 rounded"></div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }: { course: Course }) => (
  <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)] h-[18rem] flex flex-col bg-background dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
    <div className="h-1/2 relative">
      <Image
        src={rabbit}
        alt={course.course_name}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="h-1/2 p-3 flex flex-col justify-between">
      <div>
        <h4 className="text-base font-medium mb-1">{course.course_name}</h4>
        <h6 className="text-xs font-medium opacity-75">Course - {course.course_id}</h6>
        <p className="text-xs mt-1 line-clamp-2">{course.course_description}</p>
      </div>
      <button className="w-full mt-1 rounded-md p-1.5 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600">
        View Course Detail
      </button>
    </div>
  </div>
);


const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCourses, setVisibleCourses] = useState(6);

  useEffect(() => {
    const fetchCourses = async () => {
      const query = {
        program_id: 1,
        batch_id: 1,
        limit: 10,
      };

      const result = await getProgramCoursesWithOpenRegistration(query);

      if (result.type === "success" && result.data) {
        setCourses(result.data.data);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const handleLoadMore = () => {
    setVisibleCourses((prev) => prev + 6);
  };

  if (error) {
    return <p>Error fetching courses: {error}</p>;
  }

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
              BECOME AN AI ENGINEER
            </h2>
          </div>
        </div>

        {/* courses */}
        <div className="container mx-auto px-4 sm:px-6 md:px-7 lg:px-8 xl:px-16 mt-8">
          <h2 className="text-black text-2xl mt-8 mb-4">APPLIED GEN AI COURSES</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <SkeletonCard key={index} />
                  ))
              : courses.slice(0, visibleCourses).map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
          </div>
        </div>

        {/* Load More Button */}
        {visibleCourses < courses.length && (
          <div className="flex justify-center mt-8">
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

export default Courses;