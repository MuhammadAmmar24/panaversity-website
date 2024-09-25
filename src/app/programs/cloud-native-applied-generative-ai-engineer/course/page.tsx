import { getCoursePrice } from "@/src/actions/courses";
import CourseDetailsClient from "@/src/components/courses/courseDetail";

async function fetchCoursePrice() {
  const params = { course_batch_program_id: 1 }; // Replace with actual course_batch_program_id
  const result = await getCoursePrice(params);

  if (result.type === "success" && result.data) {
    return { price: result.data.amount, currency: result.data.currency };
  } else {
    throw new Error(result.message);
  }
}

export default async function CourseDetails() {
  const { price, currency } = await fetchCoursePrice();

  // return <CourseDetailsClient courseData={{ price, currency }} />;
}