import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import CTAsection from "@/components/CTAsection";
import Video from "@/components/Video";
import Testimonials from "@/components/Testimonials";
import Programs from "@/components/Programs";
import About from "@/components/About";
import ProgramOverview from "@/components/ProgramOverview";
import Projects from "@/components/Projects";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  return (
    <>
      <Hero />
      <Video />
      <ProgramOverview />
      <Courses />
      <About />
      <Projects />
      <Programs />
      <Testimonials />
       <Faq />
      <CTAsection />
       <ScrollToTopButton />
    </>
  );
}
