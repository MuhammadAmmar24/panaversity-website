import { BrainCircuitIcon } from "lucide-react";
import React from "react";

interface UpcomingClassProps {
  title: string;
  time: string;
}

const UpcomingCard: React.FC<UpcomingClassProps> = ({ title, time }) => {
  return (
    <div className="bg-white w-3/4 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start gap-4">
      <BrainCircuitIcon className="md:size-12 size:10" />
      {/* Main class information */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <p className="text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCard;
