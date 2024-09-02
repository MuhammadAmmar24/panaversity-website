import Courses from "@/components/Courses";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Faq from "@/components/Faq";
import CTAsection from "@/components/CTAsection";
export default function Home() {
  return (
    <>
      <Hero />
      <Courses />
      <Team />
      <Footer />
      <Faq />
      <CTAsection />
    </>
  );
}