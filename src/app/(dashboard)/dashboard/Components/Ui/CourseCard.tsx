import React from "react";
import { CiMobile1 } from "react-icons/ci";
import { CourseCardProps } from "../../types/types";

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  progress,
  lessons,
}) => {
  return (
    <section className="w-full h-full">
      {/* Section heading */}
      <h1 className="font-medium text-start text-xl md:text-2xl font-poppins mb-4">
        Enrolled Courses
      </h1>

      {/* Course card grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Individual course card */}
        <article className="bg-white rounded-lg shadow-xl px-4 sm:px-8 py-5">
          {/* Icon and action button row */}
          <div className="flex justify-between items-center mb-6">
            <CiMobile1 className="text-4xl bg-gray-200 rounded-full w-auto md:h-12 p-[8px]" />

            {/* Pay button */}
            <button className="md:text-[15px] font-medium md:font-semibold text-[10px] text-red-600 h-6 md:h-8 border border-red-600 rounded-full px-1 py-1 md:px-2 hover:text-white hover:bg-red-600 shadow-lg">
              Pay to Proceed
            </button>
          </div>

          {/* Course title */}
          <h2 className="font-poppins font-medium text-lg md:text-xl mb-2">
            {title}
          </h2>

          {/* Progress bar and lesson details */}
          <div className="flex items-center gap-6">
            {/* Progress bar container */}
            <div className="flex-1 bg-gray-200 rounded-full h-2 md:h-4">
              <div
                className="bg-accent h-2 md:h-4 rounded-full"
                style={{
                  width: `${progress}%`,
                }} /* Dynamic width based on progress */
              ></div>
            </div>

            {/* Progress and lessons text */}
            <p className="text-gray-500 text-xs sm:text-sm md:text-lg">
              <span className="text-black">{progress}/</span>
              {lessons} Lessons
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CourseCard;