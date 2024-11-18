import CourseCard from "@/src/components/ui/CourseCards";
import { Timeline } from "@/src/components/ui/timeline";
import { courseData } from "@/src/constants/courses";

export default function Courses() {
  const data = courseData.map((course) => ({
    title: course.title,
    content: <CourseCard content={course.content} />,
  }));

  return (
    <div className="mx-auto mt-6 flex w-full items-center justify-center pt-6">
      {" "}
      <Timeline data={data} />
    </div>
  );
}
