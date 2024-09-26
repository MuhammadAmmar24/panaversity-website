import React from "react";
import { CiMobile1 } from "react-icons/ci";
import { CourseCardProps } from "../utils/types";

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  progress,
  lessons,
}) => {
  return (
    <div className="bg-white w-full p-4 rounded-lg shadow-xl">
      <CiMobile1 className="text-4xl " />
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-accent h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-500">
        {progress}/{lessons} Lessons
      </p>
    </div>
  );
};

export default CourseCard;