import CoursesClient from "@/src/components/programs/courses";
import HeaderSection from "@/src/components/ui/HeaderSection";
import { getProgramCoursesWithOpenRegistration } from "@/src/lib/programCourses";
import type { Metadata } from "next";

export const dynamic = "force-static";

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
    <section className="light bg-background text-zinc-900 overflow-x-hidden">
      <div className="w-full mb-32">

        <HeaderSection
          title="Artificial Intelligence Courses"
          description="Certified Agentic and Robotic AI Engineer"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Programs", href: "/programs" },
            { label: "Flagship-Program", href: "/programs/flagship-program" },
          ]}
        />

        <CoursesClient initialCourses={courses} />
      </div>
    </section>
  );
}
