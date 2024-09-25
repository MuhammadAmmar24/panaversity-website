// src/app/programs/flagship-program/[id]/page.tsx

import React from "react";
import CourseDetailsClient from "@/src/components/courses/courseDetail";
// import { CourseData } from "@/src/types/CourseData";
import { notFound } from "next/navigation";

// Define the props interface
interface CoursePageProps {
  params: {
    id: string;
  };
}
export interface CourseData {
  course_batch_program_id: number;
  is_active: boolean;
  is_registration_open: boolean;
  registration_start_date: string; // ISO date string
  registration_end_date: string;   // ISO date string
  course_id: number;
  batch_id: number;
  course_code: string;
  course_name: string;
  course_initials: string;
  course_description: string;
  course_outcomes: string[];
  long_description: string;
  pre_requisite: string;
  media_link: string;
}
// Fetch course data function
const fetchCourseData = async (id: string): Promise<CourseData> => {
  try {
    const res = await fetch(
      `https://enrollment.graybush-f94f1a24.eastus.azurecontainerapps.io/api/v1/data/course-batch-program/1`,
                  
      {
        // Optional: Adjust cache settings as needed
        cache: "no-store", // Ensures fresh data on every request
      }
    );
    
    if (!res.ok) {
      // If the response is not ok, trigger the 404 page
      notFound();
    }

    const data: CourseData = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    // On error, trigger the 404 page or a custom error page
    notFound();
  }
};

// The main server component
const CoursePage = async ({ params }: CoursePageProps) => {
  const { id } = params;

  const courseData = await fetchCourseData(id);

  return <CourseDetailsClient courseData={courseData} />;
};

export default CoursePage;
