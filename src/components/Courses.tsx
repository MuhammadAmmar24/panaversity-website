import React from "react";
import Image from "next/image";
import agent from "../../public/course/agents.jpeg"
import humanoid from "../../public/course/Humanoid.jpeg"
import kubernetes from "../../public/course/Kubernetes.jpeg"
import llama_3 from "../../public/course/llama_3.jpeg"
import microservices from "../../public/course/microservices.jpeg"
import python from "../../public/course/python.jpeg"
import pytorch from "../../public/course/pytorch.jpeg"

function GenAICore() {
  return (
    <div className="container mx-auto py-12  w-full">
    <div className="text-3xl text-primary font-bold mb-8 ">
      Master the  Future of AI with Our Comprehensive Curriculum
    </div >
      <h1 className="text-3xl font-bold text-textSecondary text-center mb-8">
        Applied GenAI Core Level (3 Quarters)
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="bg-gray-800 rounded-3xl shadow-md p-6 hover:scale-105 hover:shadow-2xl transition duration-50">
          <h2 className="text-2xl font-bold text-white mb-4">
            Generative AI & Cloud Native Basics
          </h2>
          <p className="text-accent text-sm">First quarter</p>
          <div className="mt-4">
            <Image
              src={python}
              alt="Prompt Engineering and Modern Python"
              className="w-full rounded-md"
            />
            <h1 className="text-white pt-2 ">FOundation of Generative AI , Python, Docker & GitHub </h1>
          </div>
        </div>

        <div className="bg-gray-800  shadow-md p-6 rounded-3xl hover:scale-105 hover:shadow-2xl transition duration-50">
          <h2 className="text-2xl font-bold text-white mb-4">
            Applied Generative AI
          </h2>
          <p className="text-accent text-sm">Second quarter</p>
          <div className="mt-4">
            <Image
              src={agent}
              alt="Developing Multi AI Agent Systems"
              className="w-full rounded-md"
            />
            <h1 className="text-white pt-2 ">Develop Custom GPTs and Ai Agents using Langchain & crew AI.
            </h1>
          </div>
        </div>
        <div className="bg-gray-800 shadow-md p-6 rounded-3xl hover:scale-105 hover:shadow-2xl transition duration-50 -">
          <h2 className="text-2xl font-bold text-white mb-4">
            AI-Powered Microservices
          </h2>
          <p className="text-accent text-sm">Third quarter</p>
          <div className="mt-4">
            <Image
              src={microservices}
              alt="Cloud Native Microservices"
              className="w-full rounded-md"
            />
            <h1 className="text-white pt-2 ">Design and deploy Microservices using FastAPI and Kubernetes
            </h1>
          </div>
        </div>
      </div>


      <h1 className="text-3xl font-bold text-textSecondary text-center mb-8 mt-10">
      Cloud Native GenAI Mastery Level(3 Quarters)
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl -">
        <div className="bg-gray-800  shadow-md p-6 rounded-3xl hover:scale-105 hover:shadow-2xl transition duration-50">
          <h2 className="text-2xl font-bold text-white mb-4">
           Generative AI with pytorch
          </h2>
          <p className="text-accent text-sm">fourth quarter</p>
          <div className="mt-4">
            <Image
              src={pytorch}
              alt="Prompt Engineering and Modern Python"
              className="w-full rounded-md"
            />
            <h1 className="text-white pt-2 ">Build and train advanced AI models like GANs and Transformers.
            </h1>
          </div>
        </div>
        <div className="bg-gray-800  shadow-md p-6 rounded-3xl hover:scale-105 hover:shadow-2xl transition duration-50">
          <h2 className="text-2xl font-bold text-white mb-4">
            Fine-Tuning LLMs
          </h2>
          <p className="text-accent text-sm">fifth quarter</p>
          <div className="mt-4">
            <Image
              src={llama_3}
              alt="Developing Multi AI Agent Systems"
              className="w-full rounded-md"
            />
            <h1 className="text-white pt-2 ">Specilize in fine-tuning and deploying LLms like Meta LLaMA 3
            </h1>
          </div>
        </div>
        <div className="bg-gray-800  shadow-md p-6 rounded-3xl hover:scale-105 hover:shadow-2xl transition duration-50">
          <h2 className="text-2xl font-bold text-white mb-4">
            Kubernetes & Cloud AI
          </h2>
          <p className="text-accent text-sm">sixth quarter</p>
          <div className="mt-4">
            <Image
              src={kubernetes}
              alt="Cloud Native Microservices"
              className="w-full rounded-md"
            />
            <h1 className="text-white pt-2 ">Master Kubernetes & Terraform for scalable and secure AI deployments
            </h1>
          </div>
        </div>
      </div>


      <h1 className="text-3xl font-bold text-textSecondary text-center mb-8 m-10">
      Building the Future: Physical AI and Humanoids (2 Quarters)
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="bg-gray-800  shadow-md p-6 rounded-3xl hover:scale-105 hover:shadow-2xl transition duration-50">
          <h2 className="text-2xl font-bold text-white mb-4">
            Physcical AI & Robotics 
          </h2>
          <p className="text-accent text-sm">seventh quarter</p>
          <div className="mt-4">
            <Image
              src={humanoid}
              alt="Prompt Engineering and Modern Python"
              className="w-full rounded-md"
            />
            <h1 className="text-white pt-2 ">Design and deploy humanoid robots using cutting-edge AI
            </h1>
          </div>
        </div>
        <div className="bg-gray-800  shadow-md p-6 rounded-3xl hover:scale-105 hover:shadow-2xl transition duration-50">
          <h2 className="text-2xl font-bold text-white mb-4">
           Capstone Project
          </h2>
          <p className="text-accent text-sm">eigth quarter</p>
          <div className="mt-4">
            <Image
              src={agent}
              alt="Developing Multi AI Agent Systems"
              className="w-full rounded-md"
            />
            <h1 className="text-white pt-2 ">Apply all your skills in a comprehensive, Real-world AI Project
            </h1>
          </div>
        </div>

      </div>
    </div> 
  );
}

export default GenAICore