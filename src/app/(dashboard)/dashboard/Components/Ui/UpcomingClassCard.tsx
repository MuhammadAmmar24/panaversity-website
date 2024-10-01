import React from "react";
import { UpcomingClassProps } from "../../types/types";
import { FiCalendar, FiClock } from "react-icons/fi";
import { SiZoom } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { DiGithubFull } from "react-icons/di";
import Link from "next/link";

const UpcomingCard: React.FC<UpcomingClassProps> = ({ title, time, date }) => {
  return (
    <article className="w-full h-full">
      <div className="bg-white rounded-lg shadow-xl flex flex-col justify-between gap-2 px-4 sm:px-6 md:px-8 py-5">
        {/* Class Topic and Information */}
        <div className="flex flex-col flex-wrap">
          <div className="md:text-xl font-poppins truncate flex gap-x-2 flex-wrap">
            <div className="font-medium">Topic Name:</div>
            <div className="truncate">{title}</div>
          </div>
          <span className="text-gray-600 text-sm sm:text-md md:text-lg mt-2">
            Class 001
          </span>
        </div>

        {/* Useful Links (GitHub/Zoom) */}
        <div className="flex flex-col">
          {/* GitHub Topics Link */}
          <Link
            href="#"
            className="flex items-center gap-3 hover:underline cursor-pointer"
          >
            <DiGithubFull className="w-auto h-14 sm:h-14 md:h-16" />
            {/* <FaGithub className="w-auto h-6 sm:h-8" /> */}
            <span className="text-gray-600 text-xs sm:text-md md:text-lg">
              Topics to be covered
            </span>
            <IoIosLink className="text-blue-500 h-5 sm:h-6 w-auto" />
          </Link>

          {/* Zoom Class Link */}
          <Link
            href="#"
            className="flex items-center gap-3 hover:underline cursor-pointer"
          >
            <SiZoom className="w-auto h-16 text-blue-600" />
            <span className="text-gray-600 text-xs sm:text-md md:text-lg">
              Zoom Class Link
            </span>
            <IoIosLink className="text-blue-500 h-5 w-auto sm:h-6" />
          </Link>
        </div>

        {/* Date and Time Information */}
        <div className="flex justify-between items-center border-t text-gray-500 text-xs sm:text-sm md:text-base pt-4">
          {/* Date */}
          <div className="flex items-center gap-2">
            <FiCalendar className="w-4 sm:w-5 h-4 sm:h-5" />
            <time dateTime={date}>{date}</time>{" "}
            {/* SEO-optimized time element */}
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <FiClock className="w-4 sm:w-5 h-4 sm:h-5" />
            <time>{time}</time> {/* Ensure consistent time element usage */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default UpcomingCard;
