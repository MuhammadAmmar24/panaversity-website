import { Pencil1Icon, TimerIcon } from "@radix-ui/react-icons";
import { Book, BrainCircuitIcon } from "lucide-react";
import React from "react";
import { ClassCardProps } from "../utils/types";

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  time,
  lessons,
  assignment,
}) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl flex items-start gap-4 w-full md:max-w-full">
      {/* Main class information */}
      <BrainCircuitIcon className="w-12 h-12 text-accent" />
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2 ">{title}</h2>
        <div className="flex flex-col md:flex-row justify-start gap-2 md:gap-4">
          <p className="text-gray-500 flex items-center gap-2">
            <TimerIcon />
            {time}
          </p>

          {/* Conditionally render lessons and assignments if provided */}
          {lessons && (
            <p className="text-gray-500 flex items-center gap-2">
              <Book />
              Lessons: {lessons}
            </p>
          )}
          {assignment && (
            <p className="text-gray-500 flex items-center gap-2">
              <Pencil1Icon />
              Assignment: {assignment}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;