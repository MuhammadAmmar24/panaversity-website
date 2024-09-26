"use client";
import React, { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import { CardData } from "../utils/types";
import { FaCheckSquare, FaSquare, FaExclamationCircle } from "react-icons/fa";

const CourseOverview: React.FC = () => {
  // State to hold the dynamic data for the cards
  const [cardData, setCardData] = useState<CardData[]>([]);

  // Simulate fetching dynamic data from a backend
  useEffect(() => {
    // This would be replaced by your actual API call in a real-world scenario
    const fetchData = async () => {
      const data: CardData[] = [
        { title: "Total Enrolled", count: 5, icon: <FaSquare className="" /> },
        {
          title: "Completed",
          count: 3,
          icon: <FaCheckSquare className="text-accent" />,
        },
        {
          title: "Payment Pending",
          count: 2,
          icon: <FaExclamationCircle className="text-red-500" />,
        },
      ];
      setCardData(data);
    };

    fetchData();
  }, []);

  return (
    <div className=" flex flex-col items-center mb-20 md:flex md:justify-center md:flex-row gap-6 mt-6 ">
      {cardData.map((card, index) => (
        <InfoCard
          key={index}
          title={card.title}
          count={card.count}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default CourseOverview;