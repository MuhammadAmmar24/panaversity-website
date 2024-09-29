import { Pencil1Icon, TimerIcon } from "@radix-ui/react-icons";
import { Book, BrainCircuitIcon } from "lucide-react";
import React from "react";
import { ClassCardProps } from "../utils/types";
import { FaYoutube } from "react-icons/fa6";

const ClassCard: React.FC<ClassCardProps> = ({ title, time }) => {
  return (
    <div className="xl:w-2/4 w-full h-full">
      <div className="bg-white shadow-xl rounded-lg flex flex-col md:flex-row md:justify-start md:gap-10 md:p-8 justify-center items-center">
        {/* Main class information */}
        <FaYoutube className="w-auto md:h-24 h-16 text-red-600" />
        <div className="flex flex-col gap-1 md:items-start items-center">
          <div className="text-center md:text-2xl">{title}</div>
          <div className="md:flex md:gap-6">
            <p className="text-gray-500 flex items-center gap-2">
              Panaversity Urdu
            </p>
            <p className="text-gray-500 flex items-center gap-2 md:justify-center md:items-center">
              <TimerIcon />
              {time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
