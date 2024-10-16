import { AccordionItemProps } from "@/src/types/faq";
import { useRef } from "react";

export default function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`border-b ${isOpen ? "border-accent" : "border-gray-200"}`}>
      <button
        className="w-full py-4 md:py-5 -mb-2 px-2 md:px-4 flex justify-between items-center focus:outline-none"
        onClick={onToggle}
      >
        <span className="font-semibold text-sm sm:text-md md:text-[1.19rem] text-textPrimary font-poppins text-left mr-2">
          {question}
        </span>
        <span
          className={`flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
        }}
      >
        <div className="pb-4 sm:pb-5 px-2 sm:px-4 text-textSecondary font-inter text-xs sm:text-sm md:text-[0.999rem]">
          {answer}
        </div>
      </div>
    </div>
  );
}
