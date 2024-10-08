import { getProgramCoursesWithOpenRegistration } from "@/src/lib/programCourses";
import CoursesClientNotEnrolled from "./CoursesClientNotEnrolled";

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

export default async function NotEnrolledCourses() {
  const courses = await fetchCourses();

  return (
    <section className="light bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-x-hidden">
      <div className="">
        <CoursesClientNotEnrolled initialCourses={courses} />
      </div>
    </section>
  );
}
