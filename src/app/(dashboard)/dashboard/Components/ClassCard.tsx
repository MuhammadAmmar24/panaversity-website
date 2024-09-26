import { BrainCircuitIcon } from "lucide-react";
import React from "react";

interface ClassCardProps {
  title: string;
  time: string;
  image?: string;
  lessons?: string;
  assignment?: string;
}

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  time,
  // image,
  lessons,
  assignment,
}) => {
  return (
    <div className="bg-white w-3/4 p-4 rounded-lg shadow-md flex flex-col md:flex-row md:justify-center items-start gap-4">
      {/* Main class information */}
      <BrainCircuitIcon  className="size-16 text-accent"/>
      <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <p className="text-gray-500">{time}</p>

          {/* Conditionally render lessons and assignments if provided */}
          {lessons && <p className="text-gray-500">Lessons: {lessons}</p>}
          {assignment && (
            <p className="text-gray-500">Assignment: {assignment}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
