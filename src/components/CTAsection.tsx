/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GPqLMBBpOv2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { ctaData } from "@/constants/cta"

export default function Component() {
  return (
    <div className="flex justify-center items-center h-[35em] sm:h-[25em]  md:h-[40rem] px-6 sm:px-[4rem] md:px[5rem] -mt-20 bg-background">
      <div className="bg-custom-bg1 flex flex-col justify-center items-center gap-1 bg-center bg-cover rounded-3xl p-5  md      :p-[3rem] lg:p-[5rem] max-w-3xl md:max-w-4xl text-center">
        <h2 className="text-[1.4rem] md:text-[2.2rem] font-bold text-white font-poppins mb-4">{ctaData.heading}</h2>
        <p className="text-[0.9rem] md:text-[1rem] mb-6 text-background font-inter">
          {ctaData.subHeading}
        </p>
        <Button variant="outline" className="bg-background text-[#186449] hover:bg-[#218360] hover:text-background px-6 py-2 lg:px-8 md:py-6 rounded-3xl">
          Get Started <ArrowRightIcon className="ml-2" />
        </Button>
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