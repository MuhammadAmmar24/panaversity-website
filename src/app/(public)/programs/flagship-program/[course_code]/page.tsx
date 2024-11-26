import CourseDetails from "@/src/components/courses/courseDetail";
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


  const data = await getCourseData(params.course_code); // Use course_id here

  if (!data || !data.data) {
    return {
      title: "Course Not Found",
      description: "The course you are looking for does not exist.",
    };
  }

  const courseName = data.data.course_name;

  return {
    title: `Learn ${courseName} | Panaversity Flagship Program`,
    description: `Explore the course ${courseName}, part of Panaversity's Flagship Program, focusing on cutting-edge topics like Agentic AI and cloud-native technologies.`,
  };
}

export async function generateStaticParams() {
  const query = {
    program_id: 1,
    limit: 20,
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


async function fetchCoursePrice(course_code: string) {

  const result = await getCoursePrice(course_code);

  if (result.type === "success" && result.data) {
    return result.data;
  } else {
    throw new Error(result.message);
  }
}

export default async function CoursePage({
  params: { course_code },
}: {
  params: { course_code: string };
}) {

  const data = await getCourseData(course_code);
  if (!data || !data.data) {
    return notFound();
  }

  const price = await fetchCoursePrice(course_code);


  return (
    <CourseDetails
      coursePrice={price}
      courseData={data.data}
    />
  );
}
