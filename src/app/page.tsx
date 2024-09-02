import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import ProgramOverview from "@/components/ProgramOverview";
import Team from "@/components/Team";


export default function Home() {
  return (
    <>
      <Hero />
      <ProgramOverview />
      <Courses />
      <Team />
    </>
  );
}
