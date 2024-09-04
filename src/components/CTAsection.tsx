/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GPqLMBBpOv2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#2d8659] text-white rounded-3xl p-10 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Ready To Start Creating Stunning Images With Power AI?</h2>
        <p className="text-lg mb-6">
          Sign up today and unlock the full potential of our tool. With a range processing techniques and features at
          your fingertips, you'll be amazed what you will achieve.
        </p>
        <Button variant="outline" className="bg-white text-[#2d8659] px-6 py-2 rounded-full">
          Get Started <ArrowRightIcon className="ml-2" />
        </Button>
      </div>
    </div>
  )
}

function ArrowRightIcon(props) {
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