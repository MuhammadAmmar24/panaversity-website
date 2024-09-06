"use client";import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { faqData } from "@/constants/faqs";

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle accordion open/close
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center mb-6 md:mb-12">
        <h2 className="text-md text-textPrimary text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5 uppercase tracking-wide">
          FAQ
        </h2>
        <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl">
          Top Answered Questions
        </h2>
      </div>

      <Accordion variant="light" className="mt-10">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            aria-label={item.question}
            indicator={(isOpen) => (
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`} // Rotate arrow based on isOpen state
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Arrow pointing downwards by default */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            )}
            title={
              <div className="flex justify-between items-center cursor-pointer">
                <span className="font-semibold text-md md:text-lg text-[#031811]">
                  {item.question}
                </span>
              </div>
            }
            className="border-b border-gray-200"
          >
            <div className="text-[#031811B2] text-sm md:text-md -mt-3">
              {item.answer}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
