import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CourseCardProps {
  title: string;
  image: string;
  content: { quarter: string; title: string; description: string }[];
}

export default function CourseCard({ title, image, content }: CourseCardProps) {
  return (
    <Card className="w-full max-w-5xl mx-auto bg-inherit border-none shadow-none">
      <CardContent className="p-2 fold:p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 space-y-4">
        {content.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-white/40 w-full fold:max-w-[250px] xs:max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] mx-auto text-center py-4 fold:py-5 xs:py-6 sm:py-7 md:py-8 lg:py-10 xl:py-12 border-white/40 border bg-white/10 backdrop-blur-sm rounded-2xl p-2 fold:p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14"
          >
            <div className="w-full flex flex-col gap-1 items-center">
              <h3 className="text-xs fold:text-sm xs:text-lg md:text-2xl xl:text-3xl  luppercase font-poppins tracking-tight text-white">
                {item.title}
              </h3>
              <div className="font-poppins text-gray-950 bg-accent text-xs sm:text-sm md:text-lg font-bold px-4 fold:px-5 xs:px-6 sm:px-7 md:px-8 lg:px-9 xl:px-10 py-1 my-1 rounded-lg">
                {item.quarter}
              </div>
              <p className="text-xs sm:text-sm md:text-lg xl:text-xl text-white/40 mt-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
