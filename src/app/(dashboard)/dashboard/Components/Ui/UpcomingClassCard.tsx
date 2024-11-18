import Link from "next/link";
import { DiGithubFull } from "react-icons/di";
import { FaGithub } from "react-icons/fa";
import { HiMiniCalendar } from "react-icons/hi2";
import { IoIosLink } from "react-icons/io";
import { SiZoom } from "react-icons/si";
import { TbClockHour3 } from "react-icons/tb";
import { UpcomingClassProps } from "../../types/types";
import Error from "../Error/error_message";

// UpcomingCard component to display upcoming class information
const UpcomingCard: React.FC<UpcomingClassProps> = ({ title, time, date }) => {
  // Basic validation to handle missing props
  if (!title || !time || !date) {
    return <Error message="can't load the title time & date" />;
  }

  return (
    <article className="h-full w-full">
      {/* Card container */}
      <div className="flex flex-col justify-between gap-2 rounded-lg bg-white px-4 py-6 shadow-xl sm:px-6 lg:px-8 lg:py-12">
        {/* Class Topic and Information */}
        <div className="flex flex-col flex-wrap">
          <div className="font-poppins flex flex-col flex-wrap gap-1 truncate md:text-xl">
            {/* Topic name */}
            <div className="font-medium">Topic Name:</div>
            <div className="truncate">{title}</div>
          </div>
          {/* Static class ID */}
          <span className="sm:text-md mt-2 text-sm text-gray-600 md:text-lg">
            Class 001
          </span>
        </div>

        {/* Links section (GitHub/Zoom) */}
        <div className="flex flex-col">
          {/* GitHub link */}
          <Link
            href="#"
            className="flex cursor-pointer items-center gap-3 hover:underline"
          >
            <FaGithub className="h-6 w-auto sm:h-8" />
            <DiGithubFull className="h-14 w-auto sm:h-14 md:h-16" />
            <span className="sm:text-md text-xs text-gray-600 md:text-lg">
              Topics to be covered
            </span>
            <IoIosLink className="h-5 w-auto text-blue-500 sm:h-6" />
          </Link>

          {/* Zoom class link */}
          <Link
            href="#"
            className="flex cursor-pointer items-center gap-3 hover:underline"
          >
            <div className="flex w-[92px] justify-center sm:w-[108px]">
              <SiZoom className="h-14 w-auto text-blue-600 sm:h-14 md:h-20" />
            </div>
            <span className="sm:text-md text-xs text-gray-600 md:text-lg">
              Zoom Class Link
            </span>
            <IoIosLink className="h-5 w-auto text-blue-500 sm:h-6" />
          </Link>
        </div>

        {/* Date and Time Information */}
        <div className="-mt-4 flex items-center justify-between border-t pt-4 text-xs text-gray-500 sm:text-base lg:text-base">
          {/* Date section */}
          <div className="flex items-center gap-2">
            <HiMiniCalendar className="h-4 w-4 sm:h-5 sm:w-5" />
            <time dateTime={date}>{date}</time> {/* Display class date */}
          </div>

          {/* Time section */}
          <div className="flex items-center gap-2">
            <TbClockHour3 className="h-4 w-4 sm:h-5 sm:w-5" />
            <time>{time}</time> {/* Display class time */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default UpcomingCard;
