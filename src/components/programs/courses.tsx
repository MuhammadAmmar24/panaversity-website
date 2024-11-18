import { Course } from "@/src/lib/schemas/courses";
import { CourseCard } from "./CourseCard";

const CoursesClient = ({ initialCourses }: { initialCourses: Course[] }) => {
  return (
    <>
      <div className="mx-auto mt-8 px-4 sm:px-6 lg:max-w-[990px] lg:px-8 xl:max-w-[1200px]">
        <h2 className="font-poppins text-md gradient-border mb-10 mt-10 w-fit rounded-[100px] border-b border-black font-medium uppercase tracking-wide sm:text-lg">
          Artificial Intelligence Courses
        </h2>
        <div className="grid grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 md:justify-items-stretch md:gap-[75px] xl:grid-cols-3">
          {initialCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CoursesClient;
