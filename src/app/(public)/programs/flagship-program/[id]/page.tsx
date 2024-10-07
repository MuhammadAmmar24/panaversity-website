// / src/app/programs/flagship-program/[id]/page.tsx
import React from "react";
import CourseDetailsClient from "@/src/components/courses/courseDetail";
import { getProgramCoursesWithOpenRegistration } from "@/src/actions/courses";
import { getCoursePrice } from "@/src/actions/courses";

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
  pre_requisite: string[];
  media_link: string;
}

// Fetch course data function
async function fetchCourses() {
  const query = {
    program_id: 1,
    batch_id: 1,
    limit: 10,
  };

  const result = await getProgramCoursesWithOpenRegistration(query);

  if (result.type === "success" && result.data) {
    return result.data.data;
  } else {
    throw new Error(result.message);
  }
}

async function fetchCoursePrice() {
  const params = { course_batch_program_id: 1 }; // Replace with actual course_batch_program_id
  const result = await getCoursePrice(params);

  if (result.type === "success" && result.data) {
    return { price: result.data.amount, currency: result.data.currency };
  } else {
    throw new Error(result.message);
  }
}

// The main server component
const CoursePage = async ({ params }:any) => {
  const { id } = params;
  const c_id = parseInt(id);
  const data = await fetch(`https://enrollment.graybush-f94f1a24.eastus.azurecontainerapps.io/api/v1/data/course-batch-program/${c_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
      },
      cache: 'no-store'
    }
  )
  const { price, currency } = await fetchCoursePrice();
  const courseData = await data.json();
  return <CourseDetailsClient initialPrice={price} initialCurrency={currency} courseData={courseData} />;
};

export default CoursePage;