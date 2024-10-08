import { Course } from "@/src/lib/schemas/courses";
import { CourseCard } from "./CourseCard";

const CoursesClient = ({ initialCourses }: { initialCourses: Course[] }) => {

  return (
    <>
      <div className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className=" mt-10 mb-10 font-poppins text-md sm:text-lg gradient-border border-black font-medium border-b rounded-[100px]   w-fit  uppercase tracking-wide">
          APPLIED GEN AI COURSES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-[75px] justify-items-center md:justify-items-stretch">
          {initialCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>

    </>
  );
};

export default CoursesClient;
