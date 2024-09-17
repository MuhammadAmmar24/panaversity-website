"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const programs = [
  {
    id: "genai",
    title: "GenAI",
    description:
      "Generative Artificial Intelligence program focusing on creating AI systems that can produce original content.",
    fullDescription:
      "This comprehensive course covers the latest advancements in Generative AI, including techniques like GANs, VAEs, and transformer-based models. Students will learn to develop AI systems capable of generating text, images, and other media.",
    duration: "12 weeks",
    level: "Advanced",
  },
  {
    id: "robotics",
    title: "Robotics",
    description:
      "Program dedicated to the design, construction, and use of robots for various applications.",
    fullDescription:
      "Our Robotics program provides hands-on experience in designing and building robots. Topics include mechanical engineering, electronics, control systems, and AI integration. Students will work on projects ranging from simple automated systems to complex autonomous robots.",
    duration: "16 weeks",
    level: "Intermediate to Advanced",
  },
];

export default function ProgramDashboard() {
  const [enrolledPrograms, setEnrolledPrograms] = useState<any>({});
  const router = useRouter();

  const handleEnroll = (id: any) => {
    setEnrolledPrograms((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleViewDetails = (id: any) => {
    router.push(`dashboard/${id}`);
  };

  return (
    <div className="px-28 py-10 flex flex-col gap-5">
      <div className="h-52 grid grid-cols-3 gap-5">
        <div className="p-2 col-span-2 border">
          Student Selected Program Progress
        </div>
        <div className="border p-2">Student Profile</div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="p-2 flex flex-col items-center justify-center text-center mb-6 md:mb-12">
          <h2 className="text-md text-textPrimary mt-5 md:mt-0 text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5 uppercase tracking-wide">
            Programs
          </h2>
          <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl">
            Programs Offered
          </h2>
        </div>
        <div className="p-2 grid grid-cols-2 gap-5 rounded-lg">
          {programs.map((program: any) => (
            <div
              key={program.id}
              className="text-black p-2 shadow-md flex flex-col justify-between"
            >
              <div>
                <h1 className="text-xl font-bold">{program.title}</h1>
                <p>{program.description}</p>
              </div>
              <button
                onClick={() =>
                  enrolledPrograms[program.id]
                    ? handleViewDetails(program.id)
                    : handleEnroll(program.id)
                }
                className={`mt-4 px-4 py-2 rounded ${
                  enrolledPrograms[program.id]
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white transition-colors duration-300`}
              >
                {enrolledPrograms[program.id]
                  ? "View Course Details"
                  : "Enroll"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
