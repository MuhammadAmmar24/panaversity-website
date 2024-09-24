import { getProgramCoursesWithOpenRegistration } from "@/src/actions/courses";
import { Course } from "@/src/lib/schemas/courses";
import CoursesClient from '@/src/components/programs/courses';

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

export default async function Courses() {
  const courses = await fetchCourses();

  return <CoursesClient initialCourses={courses} />;
}