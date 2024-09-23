import React from "react";
import { courseData } from "@/src/constants/programcourses"
import Image from "next/image";
import rabbit from "@/public/customers/evil-rabbit.png"


const courses = () => {
  return (
    <section className=" light bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-x-hidden">
      <div className="w-full mb-32">

        {/* program header */}
        <div className="flex justify-center items-center bg-teamBg bg-cover">
          <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] py-[7rem]">
            <h2 className="text-[1.8rem] sm:text-[2rem] md:text-[3.6rem] text-background font-bold font-poppins tracking-tighter" style={{ wordSpacing: '0.2em' }}>
              BECOME AN AI ENGINEER
            </h2>
          </div>
        </div>

        {/* courses */}
        <div className="container mx-auto lg:max-w-[950px] xl:max-w-6xl">
          <h2 className="text-black text-2xl mt-8 ">APPLIED GEN AI COURSES </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courseData.map((course, index) => (
              <div key={index} className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg mt-8  ">
                <div className="p-0 ">
                  <div className="relative h-40 w-full">
                    <Image
                      src={rabbit}
                      alt="AI Prompt Interface"
                      className="object-cover h-40 w-96 bg-gray-800"
                    />

                  </div>
                </div>
                <div className="p-6">
                  <h2 className="mb-5 text-2xl  font-semibold text-gray-800">{course.title} </h2>
                  <p className="mb-4 font-semibold">{course.quarter}</p>
                  <p className="">
                    {course.description}
                  </p>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <button className="rounded-md p-2 font-semibold text-white bg-emerald-500 hover:bg-emerald-600">Enroll Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )

}

export default courses;