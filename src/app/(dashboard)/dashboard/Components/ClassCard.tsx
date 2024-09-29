import React from "react";
import { TimerIcon } from "@radix-ui/react-icons";
import { FaYoutube } from "react-icons/fa6";
import { ClassCardProps } from "../utils/types";
import { BiCalendar, BiCalendarAlt } from "react-icons/bi";
import { IoCalendarNumber } from "react-icons/io5";

const ClassCard: React.FC<ClassCardProps> = ({ title, time }) => {
  return (
    <div className=" w-full h-full">
      <div className="bg-white shadow-xl rounded-lg flex flex-col items-start md:flex-row md:items-center md:gap-10 px-4 sm:px-8 py-5 ">
        {/* Main class information */}
        <FaYoutube className="w-auto md:h-24 h-10 text-red-600 items-start" />
        <div className="flex flex-col justify-between gap-1 items-start">
          <div className="text-center text-lg md:text-xl font-poppins">{title}</div>
          <div className=" md:gap-6">
            <p className="text-gray-600 flex items-center gap-2">
              Panaversity Urdu
            </p>
            <div className="flex gap-10 lg:gap-10 text-sm">
              <div className="flex gap-2 items-center">
                <BiCalendarAlt />
                <p className="text-gray-700">22 August 2024</p>
              </div>
              <p className="text-gray-700 flex items-center gap-2 md:justify-center md:items-center">
                <TimerIcon />
                {time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
