import { getProgramCoursesWithOpenRegistration } from "@/src/lib/programCourses";
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

  return (

    <section className="light bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-x-hidden">
    <div className="w-full mb-32">
      {/* program header */}
      <div className="flex justify-center items-center bg-teamBg bg-cover">
        <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] py-[7rem]">
          <h2
            className="text-[1.8rem] sm:text-[2rem] md:text-[3.6rem] text-background font-bold font-poppins tracking-tighter"
            style={{ wordSpacing: "0.2em" }}
          >
            Our Flagship Program
          </h2>
        </div>
      </div>

      <CoursesClient initialCourses={courses} />
    </div>
  </section>
  
  
  );
    
};