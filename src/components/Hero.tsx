
import { HeroBg } from "@/components/ui/heroBg";

export default function Hero() {
  

  return (
    <div className="bg-background">

      <div className="relative isolate px-6  lg:px-8 ">
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div> */}
        <div className="mx-auto max-w-5xl pt-[5rem] sm:pt-[6rem] md:pt-[7rem] lg:pt-[8  rem] " >
   
          <div className="text-center">
            <h1 className="text-[2.6rem] sm:text-[3.4rem] md:text-[4rem]   font-poppins font-extrabold tracking-tight   text-textPrimary ">
              Revolutionize Your Learning with <span className="text-accent bg-gradient-to-r from-[#0d8f5b] to-accent bg-clip-text text-transparent">AI-Powered</span> Education
            </h1>
            <p className="mt-6 text-[0.8rem] md:text-[1.1rem] font-inter text-lg leading-8 text-textSecondary">
            Master AI with Live, Expert-Led Courses — Tailored for  Your <span className=" gradient-border2  ">
             Success!
             </span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="#_" className="relative inline-flex items-center px-12 py-4 overflow-hidden text-lg  text-textPrimary font-inter bg-gradient-to-r from-[#1cd98e] to-accent  rounded-[40px] hover:text-textPrimary font-semibold group hover:bg-gray-50">
<span className="absolute left-0 block w-full h-0 transition-all bg-transparent opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
<span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
<span className="relative ">Start Your AI Journey</span>
</a>
         
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 mt-[-55rem] ml-[-10rem] -z-10 overflow-hidden opacity-[0.4] hidden md:block"
        >
       

        <HeroBg />
         
        </div>
        
        
        
      </div>
    </div>
  )
}
