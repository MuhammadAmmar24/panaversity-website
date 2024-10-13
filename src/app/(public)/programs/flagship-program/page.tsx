import { getProgramCoursesWithOpenRegistration } from "@/src/lib/programCourses";
import CoursesClient from "@/src/components/programs/courses";
import type { Metadata } from "next";
import Breadcrumbs from "@/src/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Flagship Program",
  description: `Discover Panaversity's Flagship Program featuring advanced courses on Generative AI, cloud-native technologies, custom GPTs. and AI Agents, Designed for learners aiming to master the future of AI and technology.`,
};

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
        <div className="flex justify-center items-center bg-teamBg bg-cover bg-center">
          <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] min-h-48 sm:min-h-52 md:min-h-72 lg:min-h-[26rem]">
            <div className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0 md:pb-3">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Programs", href: "/programs" },
                  {
                    label: "Flagship-Program",
                    href: "/programs/flagship-program",
                  },
                ]}
              />
            </div>
            <div>
              <h2
                className="text-[1.8rem] sm:text-[2rem] md:text-[3.6rem] -mt-1 px-1 text-background font-bold font-poppins tracking-tighter"
                style={{ wordSpacing: "0.2em" }}
              >
                Our Flagship Program <br /> in Generative AI
              </h2>
              <p className="text-background/60 mb-12 pt-2 px-4 mt-0 max-w-[28rem] mx-auto">
                Our GenAI Program for Innovators and Creators
              </p>
            </div>
          </div>
        </div>

        <CoursesClient initialCourses={courses} />
      </div>
    </section>
  );
}
