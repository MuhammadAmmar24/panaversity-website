import Courses from "@/components/Courses";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProgramOverview from "@/components/ProgramOverview";
import Team from "@/components/Team";
import Faq from "@/components/Faq";
import CTAsection from "@/components/CTAsection";
import Video from "@/components/Video";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <Video />
      <Partners />
      <ProgramOverview />
      <Courses />
      <Team />
      <Faq />
      <CTAsection />
      <Footer />
    </>
  );
}