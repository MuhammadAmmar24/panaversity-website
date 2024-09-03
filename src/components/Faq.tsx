import { faqdata } from "@/constants/faqs";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FaqItem {
  question: string;
  answer: string;
}

const Faq = () => {
  return (
    <div className=" container mx-auto py-12  w-full ">
      <div className="max-w-7xl flex flex-col justify-center items-center mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h1 className="inline-block mb-5 text-center rounded-[20px] bg-muted px-3 py-1 text-[0.6rem] md:text-[0.8rem] text-primary">
          Frequently Asked Questions
        </h1>
        <h1 className="text-3xl text-primary text-center font-poppins font-bold tracking-tighter sm:text-4xl md:text-5xl max-w-5xl">
          Find Answers to Your Questions About Panaversity
        </h1>
        <h2 className="ezy__team6-sub-heading mt-4 text-center">
          Get more information about our innovative AI-powered education
          platform, Generative AI program, and more
        </h2>
      </div>

      <ul>
        {faqdata.map((faq: FaqItem, index: number) => (
          <li>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className="font-medium text-xl focus-within:bg-primary focus-within:rounded-t-sm focus-within:text-white mt-4 "
              >
                <h1 className="ml-0 md:ml-20">{faq.question}</h1>
              </AccordionSummary>
              <AccordionDetails className="px-10 text-lg border-xl">
                <h3 className="ml-0 md:ml-20 font-poppins mt-1">{faq.answer}</h3>
              </AccordionDetails>
            </Accordion>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faq;
