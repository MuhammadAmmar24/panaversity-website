import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqdata } from "@/constants/faqs";

interface FaqItem {
  question: string;
  answer: string;
}

const Faq = () => {
  return (
    <div className="container mx-auto py-12 w-full">
      <div className="max-w-7xl flex flex-col justify-center items-center mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="inline-block mb-5 text-center rounded-[20px] bg-muted px-3 py-1 text-[0.6rem] md:text-[0.8rem] text-primary">
          Frequently Asked Questions
        </h2>
        <h1 className="text-3xl text-primary text-center font-poppins font-bold tracking-tighter sm:text-4xl md:text-5xl max-w-5xl">
          Find Answers to Your Questions About Panaversity
        </h1>
        <p className="ezy__team6-sub-heading mt-4 text-center">
          Get more information about our innovative AI-powered education
          platform, Generative AI program, and more.
        </p>
      </div>

      <div>
        {faqdata.map((faq: FaqItem, index: number) => (
          <Accordion key={index} className="mt-4">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              className="font-medium text-xl focus-within:bg-primary focus-within:rounded-t-sm focus-within:text-white"
            >
              <h3 className="ml-0 md:ml-20 py-1 md:py-5">{faq.question}</h3>
            </AccordionSummary>
            <AccordionDetails className="px-10 text-lg">
              <p className="ml-0 md:ml-20 font-poppins mt-1">{faq.answer}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Faq;
