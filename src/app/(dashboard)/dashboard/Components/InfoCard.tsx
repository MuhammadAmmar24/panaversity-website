import React from "react";
import { InfoCardProps } from "../utils/types";

const InfoCard: React.FC<InfoCardProps> = ({ title, count, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 flex justify-between items-center w-full h-32 ">
      <div>
        <h2 className="text-gray-600 text-lg font-semibold">{title}</h2>
        <p className="text-gray-400 text-xl mt-2">{count}</p>
      </div>
      <div className="text-3xl text-gray-800">{icon}</div>
    </div>
  );
};

export default InfoCard;