import CourseDetailsClient from "@/src/components/courses/courseDetail";
import { getCourseData } from "@/src/lib/courseData";
import { getCoursePrice } from "@/src/lib/coursePrice";
import { getProgramCoursesWithOpenRegistration } from "@/src/lib/programCourses";
import type { Metadata } from "next";
import { notFound } from "next/navigation"; // Import the notFound helper

export const revalidate = 7200;

// Function to generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { course_code: string };
}): Promise<Metadata> {
  const courseId = await getCourseIdFromCode(params.course_code); // New function to fetch course_id

  if (!courseId) {
    return {
      title: "Course Not Found",
      description: "The course you are looking for does not exist.",
    };
  }

  const data = await getCourseData(courseId); // Use course_id here

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

async function getCourseIdFromCode(
  course_code: string,
): Promise<number | null> {
  const result = await getProgramCoursesWithOpenRegistration({
    program_id: 1,
    limit: 20,
  });

  if (result.type === "success" && Array.isArray(result.data?.data)) {
    const course = result.data.data.find(
      (course: any) => course.course_code === course_code,
    );
    return course ? course.course_id : null;
  }

  return null; // Return null if course_code not found
}

export async function generateStaticParams() {
  const query = {
    program_id: 1,
    batch_id: 1,
    limit: 10,
  };
  const result = await getProgramCoursesWithOpenRegistration(query);

  if (result.type === "success" && Array.isArray(result.data?.data)) {
    const codeRoutes: string[] = result.data.data
      .filter((course: any) => course.course_code) // Ensure each course has a valid code
      .map((course: any) => course.course_code);

    return codeRoutes.map((course_code: string) => ({
      course_code,
    }));
  }

  return [];
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
  const params = { course_batch_program_id: course_batch_program_id };

  const result = await getCoursePrice(params);

  if (result.type === "success" && result.data) {
    return { price: result.data.amount, currency: result.data.currency };
  } else {
    throw new Error(result.message);
  }
}

export default async function CoursePage({
  params: { course_code },
}: {
  params: { course_code: string };
}) {
  const courseId = await getCourseIdFromCode(course_code);

  if (!courseId) {
    return notFound(); // Handle if no course_id found
  }

  const data = await getCourseData(courseId);
  if (!data || !data.data) {
    return notFound();
  }

  const courseBatchProgramId = data.data.course_batch_program_id;
  if (!courseBatchProgramId) {
    return notFound();
  }

  const { price, currency } = await fetchCoursePrice(courseBatchProgramId);

  return (
    <CourseDetailsClient
      initialPrice={price}
      initialCurrency={currency}
      courseData={data.data}
    />
  );
}
