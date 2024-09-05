"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { faqData } from "@/constants/faqs";

export default function Faqs() {
  return (
    <section className="h-screen m-12 mx-auto w-[20rem] sm:w-[35rem] lg:w-[42rem] xl:w-[65rem]">
      <div className="flex flex-col items-center justify-center text-center mb-6 md:mb-12">
          <h2 className="text-md text-textPrimary text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5  uppercase tracking-wide">
            FAQ
          </h2>
          <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl ">
          Top Answered Questions          </h2>
        </div>
      <Accordion variant="light">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            aria-label={item.question}
            title={item.question}
          >
            {item.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
