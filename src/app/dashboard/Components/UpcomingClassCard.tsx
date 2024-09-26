import { BrainCircuitIcon } from "lucide-react";
import React from "react";
import { UpcomingClassProps } from "../utils/types";

const UpcomingCard: React.FC<UpcomingClassProps> = ({ title, time }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl flex gap-2">
      <BrainCircuitIcon className="w-12 h-12" />
      {/* Main class information */}
      <div className="">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <p className="text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCard;
