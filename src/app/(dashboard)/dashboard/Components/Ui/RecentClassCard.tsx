import { FaGithub, FaYoutube } from "react-icons/fa6";
import { HiMiniCalendar } from "react-icons/hi2";
import { IoIosLink } from "react-icons/io";
import { TbClockHour3 } from "react-icons/tb";
import { ClassCardProps } from "../../types/types";
import Error from "../Error/error_message";

// ClassCard component to display class information
const ClassCard: React.FC<ClassCardProps> = ({ title, time }) => {
  // Error handling: Ensure title and time are provided
  if (!title || !time) {
    return (
      <div className="text-center">
        <Error message="Error loading classes" />
      </div>
    );
  }
  return (
    <article className="h-full w-full">
      {/* Card container with shadow and rounded corners */}
      <div className="flex flex-col items-start rounded-lg bg-white px-4 py-6 shadow-xl sm:px-6 md:flex-row md:items-center md:gap-6 md:py-4 lg:px-8">
        {/* YouTube Icon with link to class video */}
        <FaYoutube
          className="h-10 w-auto text-red-600 sm:h-14 md:h-20 lg:h-24"
          title="Click here to watch the video"
        />

        {/* Class details container */}
        <div className="flex w-full flex-col items-start justify-between gap-1">
          {/* Class Title */}
          <h2 className="font-poppins mt-1 truncate text-center text-lg font-medium md:mt-0 md:text-xl">
            {title}
          </h2>

          {/* Class metadata container */}
          <div className="w-full pt-2">
            {/* Static class category */}
            <p className="flex items-center text-xs text-gray-600 sm:text-sm md:text-base">
              Panaversity Urdu Gen AI & Cloud Services
            </p>

            {/* GitHub and Topics covered section */}
            <div className="mt-2 flex cursor-pointer items-center gap-2 border-t pt-4 hover:underline">
              <FaGithub className="h-6 w-auto" />
              <p className="flex items-center text-xs text-gray-600 sm:text-sm md:text-base">
                Topics Covered
              </p>
              <IoIosLink className="text-blue-500" />
            </div>

            {/* Date and time details */}
            <div className="flex justify-between pt-4 text-xs text-gray-500 sm:text-sm">
              {/* Class date */}
              <div className="flex items-center gap-2">
                <HiMiniCalendar className="text-sm md:text-base" />
                <time dateTime="2024-08-22">22 August 2024</time>
                {/* SEO optimized time element */}
              </div>

              {/* Class duration or time */}
              <div className="flex items-center gap-2">
                <TbClockHour3 className="text-sm md:text-base" />
                <span>{time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ClassCard;
