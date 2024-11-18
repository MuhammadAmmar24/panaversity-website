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
        className="-mb-2 flex w-full items-center justify-between px-2 py-4 focus:outline-none md:px-4 md:py-5"
        onClick={onToggle}
      >
        <span className="sm:text-md font-poppins mr-2 text-left text-sm font-semibold text-textPrimary md:text-[1.19rem]">
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
        <div className="font-inter content px-2 pb-4 text-xs text-textSecondary sm:px-4 sm:pb-5 sm:text-sm md:text-[0.999rem]">
          <RenderHTML html={answer} />
        </div>
      </div>
    </div>
  );
}

function RenderHTML({ html }: { html: string }) {
  return <div className="" dangerouslySetInnerHTML={{ __html: html }} />;
}
