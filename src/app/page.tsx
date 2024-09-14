'use client'
import { lazy, useEffect, useState } from "react";
import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import CTAsection from "@/components/CTAsection";;
import Testimonials from "@/components/Testimonials";
import Programs from "@/components/Programs";
import About from "@/components/About";
import ProgramOverview from "@/components/ProgramOverview";
import Projects from "@/components/Projects";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import VideoSkeleton from "@/components/ui/skeletons/VideoSkeleton";
import { Suspense } from "react";
import Loading from "./loading";

const Video = lazy(() => import('@/components/Video'))

export default function Home() {

  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const timer = setTimeout(() => {
      setLoading(false)
    },3000);

    return () => clearTimeout(timer)
    
  }, [])

  if(loading){
    return <Loading/>
  }

  return (
    <>
        <Hero />
        <Suspense fallback={<VideoSkeleton/>}>
          <Video />
        </Suspense>

      <ProgramOverview />
      <Courses />
      <About />
      <Projects />
      <Programs />
      <Testimonials />
      <Faq />
      <CTAsection />
      <VideoSkeleton/>
      <ScrollToTopButton />
    </>
  );
}
