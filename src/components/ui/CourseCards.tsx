import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  image: string;
  content: { quarter: string; title: string; description: string }[];
}

export default function CourseCard({ title, image, content }: CourseCardProps) {
  return (
    <Card className="w-full max-w-4xl md:max-w-5xl bg-inherit border-none shadow-none">
      <CardContent className="p-6 space-y-4 md:space-y-6">
        {content.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-white/40 max-w-lg mx-auto text-center py-4 lg:px-8 border-white/40 border bg-white/10 backdrop-blur-sm rounded-[20px] p-4 md:p-10 lg:p-12`}
          >
            <div className="w-full flex flex-col gap-1 items-center">
              <h3
                className={`text-xl uppercase text-center font-poppins tracking-tight text-white`}
              >
                {item.title}
              </h3>
              <div
                className={`font-poppins text-gray-950 tracking-tight bg-accent text-sm font-bold px-5 py-[0.2rem] my-1 rounded`}
              >
                {item.quarter}
              </div>
              <p className={`text-base text-center font-poppins mt-2 text-white/40`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
