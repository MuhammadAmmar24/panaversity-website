import React from "react";
import { UpcomingClassProps } from "../utils/types";
import { FiZoomIn, FiGithub, FiCalendar, FiClock } from "react-icons/fi"; // Importing icons from react-icons
import { SiZoom } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";

const UpcomingCard: React.FC<UpcomingClassProps> = ({ title, time, date }) => {
  return (
    <div className=" w-full h-full">
      <div className="bg-white rounded-lg shadow-xl flex flex-col justify-between gap-1 px-4 sm:px-8 py-5 ">
        {/* Topic and Class Info */}
        <div className="flex flex-col">
          <h2 className="text-lg md:text-xl font-medium font-poppins truncate">Topic Name: {title}</h2>
          <span className="text-gray-600 md:text-lg">Class 001</span>
        </div>

        {/* Links */}
        <div className="flex flex-col">
          {/* Zoom link */}
          <div className="flex fle-col items-center gap-2 cursor-pointer">
            <SiZoom className="w-auto h-14 md:h-20 text-blue-600" /> {/* Zoom icon */}
            <span className="md:text-md text-gray-600">Get Zoom Class Link</span>
            <span>
              <IoIosLink className="text-blue-500 h-6 w-auto" />
            </span>
          </div>
          {/* GitHub/Topics Link */}
          <div className="flex items-center gap-2 cursor-pointer">
            <FaGithub className="w-12 h-16 "
            />
            {/* GitHub icon */}
            <span className="md:text-md text-gray-600">Topics to be covered</span>
            <span>
              <IoIosLink className="text-blue-500 h-6 w-auto" />
            </span>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex justify-between items-center border-t pt-4 text-gray-500 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <FiCalendar className="w-5 h-5" /> {/* Calendar icon */}
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="w-5 h-5" /> {/* Clock icon */}
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCard;
