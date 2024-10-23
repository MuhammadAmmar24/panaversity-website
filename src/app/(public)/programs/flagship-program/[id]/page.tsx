import CourseDetailsClient from "@/src/components/courses/courseDetail";
import { getCourseData } from "@/src/lib/courseData";
import { getCoursePrice } from "@/src/lib/coursePrice";
import { getProgramCoursesWithOpenRegistration } from "@/src/lib/programCourses";
import type { Metadata } from "next";

// export const revalidate = 604800;
export const dynamic = 'force-static'



// Function to generate metadata dynamically
export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const courseId = parseInt(params.id); // Parse the id as a number
  const data = await getCourseData(courseId); // Fetch course data using the course id

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

export async function generateStaticParams() {
  const query = {
    program_id: 1,
    batch_id: 1,
    limit: 10,
  };
  const result = await getProgramCoursesWithOpenRegistration(query);

  if (result.type === "success" && result.data) {
    const idRoutes: number[] = result?.data?.data.map(
      (course: any) => course.course_id
    );
    return idRoutes?.map((course_id: number) => ({
      id: course_id.toString(),
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
  const params = { course_batch_program_id: course_batch_program_id }; // Replace with actual course_batch_program_id

  const result = await getCoursePrice(params);

  if (result.type === "success" && result.data) {
    return { price: result.data.amount, currency: result.data.currency };
  } else {
    throw new Error(result.message);
  }
}

export default async function CoursePage(
  props: {
    params: Promise<{ id: number }>;
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const data = await getCourseData(id);

  const { price, currency } = await fetchCoursePrice(
    data?.data?.course_batch_program_id
  );

  return (
    <CourseDetailsClient
      initialPrice={price}
      initialCurrency={currency}
      courseData={data.data}
    />
  );
}
