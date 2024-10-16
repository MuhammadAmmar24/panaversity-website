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
      className="lg:max-w-[950px] xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-[0rem] py-8 sm:py-12 lg:py-16"
    >
      <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8 md:mb-12">
        <h2 className="text-md text-textPrimary mt-5 md:mt-0 text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5 tracking-wide">
          FAQs
        </h2>
        <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl">
          Top Answered Questions
        </h2>
      </div>

      <div className="mt-8 sm:mt-8 md:mt-10 space-y-4">
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
