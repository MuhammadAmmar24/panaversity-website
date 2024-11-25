import About from "@/src/components/About";
import Courses from "@/src/components/Courses";
import CTAsection from "@/src/components/CTAsection";
import Faq from "../components/Faq/Faq";
import Footer from "@/src/components/Footer/Footer";
import Hero from "@/src/components/Hero/Hero";
import Video from "@/src/components/Hero/Video";
import Navbar from "@/src/components/Navbar/Navbar";
import ProgramOverview from "@/src/components/ProgramOverview";
import Programs from "@/src/components/Programs";
import ScrollToTopButton from "@/src/components/ScrollToTopButton";
import Testimonials from "../components/Testimonials/Testimonials";

export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Video />
      <ProgramOverview />
      <Courses />
      <About />
      <Programs />
      <Testimonials />
      <Faq />
      <CTAsection />
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
