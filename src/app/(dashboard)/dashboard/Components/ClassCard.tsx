import React from "react";
import { TimerIcon } from "@radix-ui/react-icons";
import { FaYoutube } from "react-icons/fa6";
import { ClassCardProps } from "../utils/types";
import { BiCalendarAlt } from "react-icons/bi";

const ClassCard: React.FC<ClassCardProps> = ({ title, time }) => {
  return (
    <div className="w-full h-full">
      <div className="bg-white shadow-xl rounded-lg flex flex-col items-start md:flex-row md:items-center md:gap-6 px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        {/* Main class information */}
        <FaYoutube className="w-auto h-10 sm:h-14 md:h-20 lg:h-24 text-red-600" />
        <div className="flex flex-col justify-between gap-1 items-start w-full">
          <div className="text-center font-medium text-lg md:text-xl font-poppins truncate mt-1 md:mt-0">
            {title}
          </div>
          <div className="w-full border-t pt-2 md:pt-3">
            <p className="text-gray-600 flex items-center text-xs sm:text-sm md:text-base">
              Panaversity Urdu
            </p>
            <div className="flex flex-col sm:flex-row sm:gap-10 text-xs sm:text-sm text-gray-500 pt-1">
              <div className="flex items-center gap-2">
                <BiCalendarAlt className="text-sm md:text-base" />
                <p>22 August 2024</p>
              </div>
              <div className="flex items-center gap-2">
                <TimerIcon className="text-sm md:text-base" />
                {time}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
