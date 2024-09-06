import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import CTAsection from "@/components/CTAsection";
import Video from "@/components/Video";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import About from "@/components/About";
import ProgramOverview from "@/components/ProgramOverview";
import Projects from "@/components/Projects";


export default function Home() {
  return (
    <>
      <Hero />
      <Video />
      <ProgramOverview />
      <Courses />
      <Faq />
      <About />
      <Projects />
      <Partners />
      <Testimonials />
      {/* <CTAsection /> */}
    </>
  );
}
