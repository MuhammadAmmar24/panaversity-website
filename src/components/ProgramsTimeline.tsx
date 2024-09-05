"use client";

import React from "react";
import {
  FaRobot,
  FaBrain,
  FaCogs,
  FaLaptopCode,
  FaLightbulb,
  FaGlobe,
  FaUsers,
} from "react-icons/fa";
import Timeline from "@/components/ui/timelineProgams";

const ProgramsTimeline: React.FC = () => {
  const reasonsData = [
    {
      title: "Generative AI & Cloud Native Basics",
      content: "Foundations of Generative AI, Python, Docker, & GitHub.",
      icon: "Q1",
    },
    {
      title: "Applied Generative AI",
      content: "Develop Custom GPTs and AI Agents using Langchain & CrewAI.",
      icon: "Q2",
    },
    {
      title: "AI-Powered Microservices",
      content:
        "Design and deploy AI microservices using FastAPI and Kubernetes.",
      icon: "Q3",
    },
    {
      title: "Generative AI with PyTorch",
      content: "Build and train advanced AI models like GANs and Transformers.",
      icon: "Q4",
    },
    {
      title: "Fine-Tuning LLMs",
      content:
        "Specialize in fine-tuning and deploying LLMs like Meta LLaMA 3.",
      icon: "Q5",
    },
    {
      title: "Kubernetes & Cloud AI",
      content:
        "Master Kubernetes & Terraform for scalable and secure AI deployments.",
      icon: "Q6",
    },
    {
      title: "Physical AI & Robotics",
      content: "Design and deploy humanoid robots using cutting-edge AI.",
      icon: "Q7",
    },
    {
      title: "Capstone Project",
      content:
        "Apply all your skills in a comprehensive, real-world AI project.",
      icon: "Q8",
    },
  ];

  return (
    <div className="relative w-full py-20 px-6 ">
      <div className="max-w-7xl mx-auto">
        <Timeline data={reasonsData} />
      </div>
    </div>
  );
};

export default ProgramsTimeline;
