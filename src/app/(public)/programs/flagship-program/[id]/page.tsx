import CourseDetailsClient from "@/src/components/courses/courseDetail";
import { getCoursePrice } from "@/src/lib/coursePrice";
import { getCourseData } from "@/src/lib/courseData";
import type { Metadata } from "next";

// Function to generate metadata dynamically
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const courseId = parseInt(params.id);  // Parse the id as a number
  const data = await getCourseData(courseId);  // Fetch course data using the course id

  if (!data || !data.data) {
    return {
      title: "Course Not Found",
      description: "The course you are looking for does not exist.",
    };
  }

  const courseName = data.data.course_name;

  return {
    title: `Learn ${courseName} | Panaversity Flagship Program`,
    description: `Explore the course ${courseName}, part of Panaversity's Flagship Program, focusing on cutting-edge topics like Generative AI and cloud-native technologies.`,
  };
}

export interface CourseData {
  course_batch_program_id: number;
  is_active: boolean;
  is_registration_open: boolean;
  registration_start_date: string; // ISO date string
  registration_end_date: string; // ISO date string
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

async function fetchCoursePrice(course_batch_program_id: number) {

  const params = {course_batch_program_id: course_batch_program_id}; // Replace with actual course_batch_program_id

  const result = await getCoursePrice(params);

  if (result.type === "success" && result.data) {
    return { price: result.data.amount, currency: result.data.currency };
  } else {
    throw new Error(result.message);
  }
}

// The main server component
const CoursePage = async ({ params }: any) => {
  const { id } = params;
  const c_id = parseInt(id);

  const data = await getCourseData(c_id);


  const { price, currency } = await fetchCoursePrice(data?.data?.course_batch_program_id);
  // const courseData = await data.json();
  return (
    <CourseDetailsClient
      initialPrice={price}
      initialCurrency={currency}
      courseData={data.data}
    />
  );
};

export default CoursePage;
