import { CourseCard } from "@/src/components/programs/CourseCard";
import { Course } from "@/src/lib/schemas/courses";

const CoursesClientNotEnrolled = ({
  initialCourses,
}: {
  initialCourses: Course[];
}) => {
  return (
    <>
      <div className="mx-auto mt-8 px-4 sm:px-6 lg:max-w-[990px] lg:px-8 xl:max-w-[1200px]">
        <div className="grid grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 md:justify-items-stretch md:gap-[75px] xl:grid-cols-3">
          {initialCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CoursesClientNotEnrolled;
