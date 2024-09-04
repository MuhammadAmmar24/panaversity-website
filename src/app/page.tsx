import Courses from "@/components/Courses";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProgramOverview from "@/components/ProgramOverview";
import Faq from "@/components/Faq";
import CTAsection from "@/components/CTAsection";
import Video from "@/components/Video";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import About from "@/components/About";
import ProgramsTimeline from "@/components/ProgramsTimeline";
import WhyLearnGenerativeAI from "@/components/WhyLearnGenAI";
import Footer2 from "@/components/Footer2";

export default function Home() {
  return (
    <>
      <Hero />
      <Video />
      <About />
      <Partners />
      {/* <ProgramOverview /> */}
      <WhyLearnGenerativeAI />
      <ProgramsTimeline />
      <Courses />
      <Faq />
      <Testimonials />
      <CTAsection />
      <Footer />
      <Footer2 />
    </>
  );
}