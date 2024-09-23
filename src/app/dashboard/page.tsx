"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Importing styles for the progress bar

// Sample programs data
const programs = [
  {
    id: "genai",
    title: "GenAI",
    description:
      "Generative Artificial Intelligence program focusing on creating AI systems that can produce original content.",
    fullDescription:
      "This comprehensive course covers the latest advancements in Generative AI, including techniques like GANs, VAEs, and transformer-based models. Students will learn to develop AI systems capable of generating text, images, and other media.",
    quarter: "7 Quarters",
    level: "Intermediate to Advanced",
    progress: 75, // Example progress
  },
  {
    id: "robotics",
    title: "Robotics",
    description:
      "Program dedicated to the design, construction, and use of robots for various applications.",
    fullDescription:
      "Our Robotics program provides hands-on experience in designing and building robots. Topics include mechanical engineering, electronics, control systems, and AI integration. Students will work on projects ranging from simple automated systems to complex autonomous robots.",
    quarter: "7 Quarters",
    level: "Intermediate to Advanced",
    progress: 50, // Example progress
  },
];

// Component to display individual student progress
const StudentProgress = ({ program }: any) => {
  return (
    <div className="p-4 bg-white rounded-lg flex items-center gap-4">
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{program.title}</h3>
        <p>{program.fullDescription}</p>
      </div>
      <div className="w-20 h-20">
        <CircularProgressbar
          value={program.progress}
          text={`${program.progress}%`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: `rgba(62, 152, 199, ${program.progress / 100})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
    </div>
  );
};

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
    <div className="px-28 py-10 flex flex-col gap-10">
      <div className="h-52 grid grid-cols-3 gap-5">
        {/* Student Progress Section */}
        <div className="p-4 col-span-2 shadow-lg bg-white rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            Student Selected Program Progress
          </h2>
          <div className="space-y-4">
            {programs
              .filter((program) => enrolledPrograms[program.id]) // Show only enrolled programs
              .map((program) => (
                <StudentProgress key={program.id} program={program} />
              ))}
            {Object.keys(enrolledPrograms).length === 0 && (
              <p className="text-gray-500">No programs enrolled yet.</p>
            )}
          </div>
        </div>

        {/* Student Profile */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <div className="py-4 w-full flex justify-center">
            <FaUser className="w-20 h-20 text-gray-600" />
          </div>
          <div className="flex w-full flex-col justify-center">
            <h2 className="text-center font-semibold text-lg">
              Husnain Khalid
            </h2>
            <button className="py-2 text-white rounded-md w-full bg-green-500 hover:bg-green-600 mt-2">
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Programs Offered Section */}
      <div className="flex flex-col gap-5">
        <div className="p-2 flex flex-col items-center justify-center text-center mb-6 md:mb-12">
          <h2 className="text-md text-textPrimary mt-5 md:mt-0 text-center sm:text-lg gradient-border font-medium border-b rounded-[100px] mb-5 uppercase tracking-wide">
            Programs
          </h2>
          <h2 className="text-3xl text-textPrimary font-poppins font-semibold tracking-tighter text-center sm:text-4xl md:text-5xl">
            Programs Offered
          </h2>
        </div>

        {/* Programs List */}
        <div className="grid grid-cols-2 gap-5">
          {programs.map((program) => (
            <div
              key={program.id}
              className="p-4 bg-white shadow-lg rounded-lg flex flex-col gap-4 justify-between"
            >
              <div>
                <h1 className="text-xl font-bold">{program.title}</h1>
                <p>{program.description}</p>
              </div>
              <div className="flex w-full justify-between py-2">
                <div className="text-sm font-semibold">{program.level}</div>
                <div className="text-sm flex gap-2 px-1 items-center">
                  <div className="bg-blue-500 rounded-full w-2 h-2"></div>
                  <h2 className="font-semibold">{program.quarter}</h2>
                </div>
              </div>
              <button
                onClick={() =>
                  enrolledPrograms[program.id]
                    ? handleViewDetails(program.id)
                    : handleEnroll(program.id)
                }
                className={`px-4 py-2 rounded ${
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
