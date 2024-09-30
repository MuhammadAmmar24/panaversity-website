import React from "react";
import { TimerIcon } from "@radix-ui/react-icons";
import { FaYoutube } from "react-icons/fa6";
import { ClassCardProps } from "../types/types";
import { BiCalendarAlt } from "react-icons/bi";

const ClassCard: React.FC<ClassCardProps> = ({ title, time }) => {
  return (
    <article className="w-full h-full">
      <div className="bg-white shadow-xl rounded-lg flex flex-col items-start md:flex-row md:items-center md:gap-6 px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        {/* YouTube Icon */}
        <FaYoutube className="w-auto h-10 sm:h-14 md:h-20 lg:h-24 text-red-600" />

        {/* Class details container */}
        <div className="flex flex-col justify-between gap-1 items-start w-full">
          {/* Class Title */}
          <h2 className="text-center font-medium text-lg md:text-xl font-poppins truncate mt-1 md:mt-0">
            {title}
          </h2>

          {/* Class metadata (border and additional information) */}
          <div className="w-full border-t pt-2 md:pt-3">
            <p className="text-gray-600 flex items-center text-xs sm:text-sm md:text-base">
              Panaversity Urdu {/* Static class category */}
            </p>

            {/* Date and time details */}
            <div className="flex flex-col sm:flex-row sm:gap-10 text-xs sm:text-sm text-gray-500 pt-1">
              {/* Class date */}
              <div className="flex items-center gap-2">
                <BiCalendarAlt className="text-sm md:text-base" />
                <time dateTime="2024-08-22">22 August 2024</time>{" "}
                {/* SEO optimized time element */}
              </div>

              {/* Class duration or time */}
              <div className="flex items-center gap-2">
                <TimerIcon className="text-sm md:text-base" />
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
