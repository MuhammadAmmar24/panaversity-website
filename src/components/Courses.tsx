"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { courseData } from "@/constants/courses";
import CourseCard from "@/components/ui/CourseCards"; // Import the new component

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
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
