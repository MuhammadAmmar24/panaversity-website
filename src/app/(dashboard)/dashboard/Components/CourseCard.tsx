import React from "react";
import { CiMobile1 } from "react-icons/ci";
import { CourseCardProps } from "../utils/types";

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  progress,
  lessons,
}) => {
  return (
    <div className="xl:w-2/4 w-full h-full">
      <h1 className="text-center font-medium sm:text-start text-xl sm:text-2xl md:text-3xl font-poppins mb-4">
        Enrolled Courses
      </h1>
      <div className="bg-white h-44 rounded-lg shadow-xl px-8 py-5">
        <div className="flex justify-between items-center">
          <CiMobile1 className="text-4xl bg-gray-200 rounded-full w-auto md:h-12 md:mb-4 mb-2 p-[8px] " />
          <button  className="md:text-[15px] font-medium md:font-semibold text-[10px] text-red-600 h-6 md:h-8 border border-red-600 rounded-full px-1 py-1 md:px-2 hover:text-white hover:bg-red-600 shadow-lg">Pay to Proceed</button>
        </div>
        <h2 className="font-poppins font-medium md:text-lg mb-6 sm:mb-4">
          {title}
        </h2>
        <div className="flex items-center gap-6">
          {/* Progress bar */}
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div
              className="bg-accent h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-sm md:text-lg">
            <span className="text-black">{progress}/</span>
            {lessons} Lessons
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;