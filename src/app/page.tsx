import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import CTAsection from "@/components/CTAsection";
import Video from "@/components/Video";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import About from "@/components/About";
import WhyLearnGenerativeAI from "@/components/WhyLearnGenAI";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Video />
      <About />
      <Partners />
      <WhyLearnGenerativeAI />
      <Courses />
      <Faq />
      <Testimonials />
      <CTAsection />
      <Footer />
    </>
  );
}