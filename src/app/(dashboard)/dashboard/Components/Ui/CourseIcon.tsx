"use client";
import React from "react";
import { RiRobot2Line } from "react-icons/ri";
import Link from "next/link";
import { CourseIconsProps } from "../../types/courses";
import { FaArrowRightLong } from "react-icons/fa6";

const CourseIcons: React.FC<CourseIconsProps> = ({ status, youtubeLink, githubLink, zoomLink }) => {
  if (status !== "active") {
    return (
      <div
        className="group flex items-center justify-center gap-2 w-full py-2 bg-gray-400 text-white rounded-lg shadow-md cursor-not-allowed opacity-70"
      >
        <RiRobot2Line className="w-[1.5rem] h-[1.5rem]" />
        <span className="text-base font-semibold">Start Learning</span>
        <FaArrowRightLong className="w-4 h-4" />
      </div>
    );
  }

  return (
    <Link
      href={process.env.NEXT_PUBLIC_PANA_URL!}
      className="group flex items-center justify-center gap-2 w-full py-2 bg-gray-100 border text-textPrimary rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <RiRobot2Line className="w-[1.5rem] h-[1.5rem] text-blue-600" />
      <span className="text-base font-semibold">Start Learning</span>
      <FaArrowRightLong className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
};

export default CourseIcons;
