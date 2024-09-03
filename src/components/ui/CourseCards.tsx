import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  image: string;
  content: { quarter: string; title: string; description: string }[];
}

export default function CourseCard({ title, image, content }: CourseCardProps) {
  return (
    <Card className="w-full max-w-4xl bg-primary border-none shadow-none">
      <CardContent className="p-6 space-y-4">
        {content.map((item, index) => {
          // Determine the background and text color based on index
          const isEven = index % 2 === 0;
          const bgColor = isEven ? "bg-white" : "bg-black";
          const textColor = isEven ? "text-primary" : "text-white";
          const quarterBgColor = isEven ? "bg-primary" : "bg-accent";
          const quarterTextColor = isEven ? "text-white" : "text-black";

          return (
            <div
              key={index}
              className={`flex flex-col items-center ${bgColor} ${textColor} rounded-lg p-4`}
            >
              <div className="w-full flex flex-col items-center">
                <h1
                  className={`text-2xl uppercase text-center font-anton md:tracking-tight tracking-normal ${textColor}`}
                >
                  {item.title}
                </h1>
                <div
                  className={`font-poppins tracking-tight ${quarterBgColor} ${quarterTextColor} text-sm font-bold px-5 py-[0.2rem] my-1 rounded`}
                >
                  {item.quarter}
                </div>
                <p
                  className={`text-base text-center font-poppins mt-2 ${textColor}`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
