"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Faqs() {
  interface FAQItem {
    question: string;
    answer: string;
  }

  const faqData: FAQItem[] = [
    {
      question: "What is Panaversity?",
      answer: "Panaversity is an innovative online university that uses AI-powered education, including Custom GPTs, to provide personalized, interactive learning experiences tailored to each student’s needs."
    },
    {
      question: "What will I learn in the Generative AI program?",
      answer: "The program covers foundational to advanced topics in Generative AI, Cloud Native technologies, and Physical AI, including Custom GPT development, AI-powered microservices, and humanoid robotics."
    },
    {
      question: "What are Custom GPTs?",
      answer: "Custom GPTs are AI-powered mentors designed to guide you through your coursework, providing personalized assistance, instant feedback, and a dynamic learning experience."
    },
    {
      question: "How does the AI Mentor work?",
      answer: "The AI Mentor adapts to your learning pace, offering real-time interaction, customized quizzes, and assessments to help you master each topic effectively."
    },
    {
      question: "What are the admission requirements?",
      answer: "Applicants should have a basic understanding of Python and cloud-native tools. Prior experience with AI or data science is advantageous but not required."
    },
    {
      question: "What is the structure of the program?",
      answer: "The program is divided into 21 months, covering foundational and advanced levels across 8 quarters. Each quarter focuses on specific skills in AI and cloud technologies."
    },
    {
      question: "How much does the program cost?",
      answer: "The tuition fee is $29.95 per quarter, with payments due every three months."
    },
    {
      question: "Are there any hands-on projects?",
      answer: "Yes, the program includes real-world projects and a capstone project in the final quarter, allowing you to apply your skills to practical challenges."
    },
    {
      question: "Can I study at my own pace?",
      answer: "Yes, the program offers flexible learning options, allowing you to progress through the material at a pace that suits your schedule."
    }
  ];

  return (
    <section className="h-screen m-12 mx-auto w-[20rem] sm:w-[35rem] lg:w-[42rem] xl:w-[65rem]">
      <div className="flex items-center justify-center text-center mb-6 md:mb-12">
        <div className="max-w-xl">
          <hr className="w-20 mb-4 border-gray-300 dark:border-gray-600 mx-auto" />
          <h2 className="text-[32px] font-bold">FAQs</h2>
        </div>
      </div>
      <Accordion variant="light">
        {faqData.map((item, index) => (
          <AccordionItem key={index} aria-label={item.question} title={item.question}>
            {item.answer}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}