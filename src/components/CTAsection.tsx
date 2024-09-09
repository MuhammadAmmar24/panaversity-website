/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GPqLMBBpOv2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { ctaData } from "@/constants/cta"

export default function Component() {
  return (
    <div className="flex justify-center items-center h-[35em] sm:h-[25em] md:h-[40em] px-6 sm:px-[4rem] md:px[5rem]  mt-2 bg-background  text-center ">
      <div className="bg-custom-bg1 flex flex-col justify-center items-center gap-1 bg-center bg-cover rounded-3xl p-5  md:p-[3rem] lg:p-[5rem] max-w-3xl md:max-w-[72em] text-center border-2 ">
        <h2 className="text-[1.4rem] md:text-[2.6rem] font-bold text-white font-poppins mb-4">{ctaData.heading}</h2>
        <p className="text-[0.9rem] md:text-[1rem] mb-6 text-background/90 font-inter">
          {ctaData.subHeading}
        </p>
         {/* Button Component */}
         <a
                href="#_"
                className="relative inline-flex items-center px-14 py-4 overflow-hidden text-[1rem] text-textPrimary font-inter bg-background  rounded-[40px] hover:text-textPrimary font-semibold group hover:bg-accent "
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-transparent opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative ">Get Started</span>
              </a>
      </div>
    </div>
  )
}

function ArrowRightIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}