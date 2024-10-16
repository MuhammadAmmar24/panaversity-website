import { CourseCard } from "@/src/components/programs/CourseCard";
import { Course } from "@/src/lib/schemas/courses";

const CoursesClientNotEnrolled = ({
  initialCourses,
}: {
  initialCourses: Course[];
}) => {
  return (
    <>
      <div className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-[75px] justify-items-center md:justify-items-stretch">
          {initialCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CoursesClientNotEnrolled;
