import React from "react";
import { UpcomingClassProps } from "../utils/types";
import { FiCalendar, FiClock } from "react-icons/fi";
import { SiZoom } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { DiGithubFull } from "react-icons/di";

const UpcomingCard: React.FC<UpcomingClassProps> = ({ title, time, date }) => {
  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-lg shadow-xl flex flex-col justify-between gap-4 px-4 sm:px-6 md:px-8 py-5">
        {/* Topic and Class Info */}
        <div className="flex flex-col">
          <h2 className="text-md sm:text-lg md:text-xl font-medium font-poppins truncate">
            Topic Name: {title}
          </h2>
          <span className="text-gray-600 text-sm sm:text-md md:text-lg">
            Class 001
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {/* Zoom link */}
          <div className="flex items-center gap-3 cursor-pointer">
            <SiZoom className="w-auto h-14 text-blue-600" />
            <span className="text-gray-600 text-sm sm:text-md md:text-lg">
                  Get Zoom Class Link
            </span>
            <IoIosLink className="text-blue-500 h-5 w-auto sm:h-6" />
          </div>

          {/* GitHub/Topics Link */}
          <div className="flex items-center gap-3 cursor-pointer">
            <DiGithubFull className="w-auto h-12 sm:h-14 md:h-16" />
            <FaGithub className="w-auto h-6 sm:h-8" />
            <span className="text-gray-600 text-sm sm:text-md md:text-lg">
              Topics to be covered
            </span>
            <IoIosLink className="text-blue-500 h-5 sm:h-6 w-auto" />
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex justify-between items-center border-t pt-4 text-gray-500 text-xs sm:text-sm md:text-base">
          <div className="flex items-center gap-2">
            <FiCalendar className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="w-4 sm:w-5 h-4 sm:h-5" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCard;
