import React from "react";
import { Timeline } from "@/src/components/ui/timeline";
import { courseData } from "@/src/constants/courses";
import CourseCard from "@/src/components/ui/CourseCards"; 

export default function Courses() {
  const data = courseData.map((course) => ({
    title: course.title,
    content: (
      <CourseCard
        title={course.title}
        image={course.image}
        content={course.content}
      />
    ),
  }));

  return (
    <div className="w-full flex justify-center items-center mx-auto mt-6 pt-6"> {/* Centering and padding */}
      <Timeline data={data} />
    </div>
  );
}
