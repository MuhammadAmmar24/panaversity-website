"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import rabbit from "@/public/customers/evil-rabbit.png";
import { getProgramCoursesWithOpenRegistration } from "@/src/actions/courses";
import { Course } from "@/src/lib/schemas/courses";

// Skeleton Component
const SkeletonCard = () => {
  return (
    <div className="w-full max-w-sm flex flex-col justify-between overflow-hidden rounded-lg shadow-lg mt-8 h-full animate-pulse bg-gray-200">
      <div>
        <div className="relative h-40 w-full bg-gray-300"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-300 mb-4 rounded"></div>
          <div className="h-4 bg-gray-300 mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 mb-2 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div>
        <hr className="mx-5 mb-4" />
        <div className="px-6 pb-6">
          <div className="w-full h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        <div className="container mx-auto lg:max-w-[950px] xl:max-w-6xl">
          <h2 className="text-black text-2xl mt-8">APPLIED GEN AI COURSES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? // Show 7 skeletons while loading
                Array(7)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : courses.map((course, index) => (
                  <div
                    key={index}
                    className="w-full max-w-sm flex flex-col justify-between overflow-hidden rounded-lg shadow-lg mt-8 h-full"
                  >
                    <div>
                      <div className="relative h-40 w-full">
                        <Image
                          src={rabbit}
                          alt="AI Prompt Interface"
                          className="object-cover h-40 w-96 bg-gray-800"
                        />
                      </div>
                      <div className="p-6">
                        <h2 className="mb-5 text-2xl font-semibold text-gray-800">
                          {course.course_name}
                        </h2>
                        <p className="mb-4 font-semibold">
                          Course - {course.course_id}
                        </p>
                        <p>{course.course_description}</p>
                      </div>
                    </div>
                    <div>
                      <hr className="mx-5 mb-4" />
                      <div className="px-6 pb-6">
                        <button className="w-full rounded-md p-2 font-semibold text-white bg-emerald-500 hover:bg-emerald-600">
                          View Course Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
