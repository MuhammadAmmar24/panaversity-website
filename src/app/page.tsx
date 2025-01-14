import About from "@/src/components/About";
import Courses from "@/src/components/CoursesOffered";
import CTAsection from "@/src/components/CTAsection";
import Footer from "@/src/components/Footer/Footer";
import Hero from "@/src/components/Hero/Hero";
import Video from "@/src/components/Hero/Video";
import Navbar from "@/src/components/Navbar/Navbar";
import ProgramOverview from "@/src/components/ProgramOverview";
import Programs from "@/src/components/Programs";
import Faq from "../components/Faq/Faq";
import Testimonials from "../components/Testimonials/Testimonials";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { VisitorAgent } from "../components/VisitorAgent/ChatBot";

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
      {/* <ScrollToTopButton /> */}
      {/* <WhatsAppIcon /> */}
      <VisitorAgent />
      <Footer />
    </>
  );
}
