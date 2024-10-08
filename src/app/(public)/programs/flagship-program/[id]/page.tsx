import CourseDetailsClient from "@/src/components/courses/courseDetail";
import { getCoursePrice } from "@/src/lib/coursePrice";
import { getCourseData } from "@/src/lib/courseData";

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
const CoursePage = async ({ params }: any) => {
  const { id } = params;
  const c_id = parseInt(id);

  const data = await getCourseData(c_id);
  // console.log(data);

  const { price, currency } = await fetchCoursePrice();
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
