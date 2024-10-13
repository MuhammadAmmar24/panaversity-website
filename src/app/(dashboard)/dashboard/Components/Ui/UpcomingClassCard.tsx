import { UpcomingClassProps } from "../../types/types";
import { SiZoom } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { DiGithubFull } from "react-icons/di";
import { HiMiniCalendar } from "react-icons/hi2";
import { TbClockHour3 } from "react-icons/tb";
import Link from "next/link";
import Error from "../Error/error_message";

// UpcomingCard component to display upcoming class information
const UpcomingCard: React.FC<UpcomingClassProps> = ({ title, time, date }) => {
  // Basic validation to handle missing props
  if (!title || !time || !date) {
    return (
      <Error message="can't load the title time & date"/>
    );
  }

  return (
    <article className="w-full h-full">
      {/* Card container */}
      <div className="bg-white rounded-lg shadow-xl flex flex-col justify-between gap-2 px-4 sm:px-6 md:px-8 py-14">
        {/* Class Topic and Information */}
        <div className="flex flex-col flex-wrap">
          <div className="md:text-xl font-poppins truncate flex gap-x-2 flex-wrap">
            {/* Topic name */}
            <div className="font-medium ">Topic Name:</div>
            <div className="truncate">{title}</div>
          </div>
          {/* Static class ID */}
          <span className="text-gray-600 text-sm sm:text-md md:text-lg mt-2">
            Class 001
          </span>
        </div>

        {/* Links section (GitHub/Zoom) */}
        <div className="flex flex-col">
          {/* GitHub link */}
          <Link
            href="#"
            className="flex items-center gap-3 hover:underline cursor-pointer"
          >
            <FaGithub className="w-auto h-6 sm:h-8" />
            <DiGithubFull className="w-auto h-14 sm:h-14 md:h-16" />
            <span className="text-gray-600 text-xs sm:text-md md:text-lg">
              Topics to be covered
            </span>
            <IoIosLink className="text-blue-500 h-5 sm:h-6 w-auto" />
          </Link>

          {/* Zoom class link */}
          <Link
            href="#"
            className="flex items-center gap-3 hover:underline cursor-pointer"
          >
            <div className="w-[108px] flex justify-center">
              <SiZoom className="w-auto h-14 sm:h-14 md:h-20 text-blue-600" />
            </div>
            <span className="text-gray-600 text-xs sm:text-md md:text-lg">
              Zoom Class Link
            </span>
            <IoIosLink className="text-blue-500 h-5 w-auto sm:h-6" />
          </Link>
        </div>

        {/* Date and Time Information */}
        <div className="flex justify-between items-center border-t text-gray-500 text-xs sm:text-sm md:text-base pt-4 -mt-4">
          {/* Date section */}
          <div className="flex items-center gap-2">
            <HiMiniCalendar className="w-4 sm:w-5 h-4 sm:h-5" />
            <time dateTime={date}>{date}</time> {/* Display class date */}
          </div>

          {/* Time section */}
          <div className="flex items-center gap-2">
            <TbClockHour3 className="w-4 sm:w-5 h-4 sm:h-5" />
            <time>{time}</time> {/* Display class time */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default UpcomingCard;
