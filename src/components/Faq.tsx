"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { faqData } from "@/constants/faqs";

export default function Faqs() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center mb-6 md:mb-12">
        <h2 className="text-md text-textPrimary text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5  uppercase tracking-wide">
          FAQ
        </h2>
        <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl ">
          Top Answered Questions
        </h2>
      </div>
      <Accordion variant="light" className="mt-10 ">
        {faqData.map((item, index) => (
          <AccordionItem
            className="border-b border-gray-200"
            key={index}
            aria-label={item.question}
            title={
              <span className="font-semibold text-[#031811]">
                {item.question}
              </span>
            }
          >
            <div className="text-[#031811B2] text-sm">{item.answer}</div>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}