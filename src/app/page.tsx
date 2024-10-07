import Courses from "@/src/components/Courses";
import Hero from "@/src/components/Hero";
import Faq from "@/src/components/Faq";
import CTAsection from "@/src/components/CTAsection";
import Video from "@/src/components/Video";
import Testimonials from "@/src/components/Testimonials";
import Programs from "@/src/components/Programs";
import About from "@/src/components/About";
import ProgramOverview from "@/src/components/ProgramOverview";
import Projects from "@/src/components/Projects";
import ScrollToTopButton from "@/src/components/ScrollToTopButton";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}
