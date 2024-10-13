import { FaGithub, FaYoutube } from "react-icons/fa6";
import { ClassCardProps } from "../../types/types";
import { IoIosLink } from "react-icons/io";
import { HiMiniCalendar } from "react-icons/hi2";
import { TbClockHour3 } from "react-icons/tb";
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
    <article className="w-full h-full">
      {/* Card container with shadow and rounded corners */}
      <div className="bg-white shadow-xl rounded-lg flex flex-col items-start md:flex-row md:items-center md:gap-6 px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        {/* YouTube Icon with link to class video */}
        <FaYoutube
          className="w-auto h-10 sm:h-14 md:h-20 lg:h-24 text-red-600"
          title="Click here to watch the video"
        />

        {/* Class details container */}
        <div className="flex flex-col justify-between gap-1 items-start w-full">
          {/* Class Title */}
          <h2 className="text-center font-medium text-lg md:text-xl font-poppins truncate mt-1 md:mt-0">
            {title}
          </h2>

          {/* Class metadata container */}
          <div className="w-full pt-2 md:pt-3">
            {/* Static class category */}
            <p className="text-gray-600 flex items-center text-xs sm:text-sm md:text-base">
              Panaversity Urdu
            </p>

            {/* GitHub and Topics covered section */}
            <div className="flex items-center gap-2 hover:underline border-t mt-2 pt-1 cursor-pointer">
              <FaGithub />
              <p className="text-gray-600 flex items-center text-xs sm:text-sm md:text-base">
                Topics Covered
              </p>
              <IoIosLink className="text-blue-500" />
            </div>

            {/* Date and time details */}
            <div className="flex flex-col sm:flex-row sm:gap-10 text-xs sm:text-sm text-gray-500 pt-1">
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
