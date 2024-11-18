"use client";
import { faqData } from "@/src/constants/faqs";
import { useState } from "react";
import { FaqItem } from "../../types/faq";
import AccordionItem from "./FaqItem";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:max-w-[950px] lg:px-[0rem] lg:py-16 xl:max-w-6xl"
    >
      <div className="mb-6 flex flex-col items-center justify-center text-center sm:mb-8 md:mb-12">
        <h2 className="text-md gradient-border mb-5 mt-5 rounded-[100px] border-b text-center font-medium tracking-wide text-textPrimary sm:text-lg md:mt-0">
          FAQs
        </h2>
        <h2 className="font-poppins text-center text-3xl font-semibold tracking-tighter text-textPrimary sm:text-4xl md:text-5xl">
          Top Answered Questions
        </h2>
      </div>

      <div className="mt-8 space-y-4 sm:mt-8 md:mt-10">
        {faqData.map((item: FaqItem, index: number) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
