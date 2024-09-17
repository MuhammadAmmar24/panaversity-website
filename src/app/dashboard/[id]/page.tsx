"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const programs = [
  {
    id: "genai",
    title: "GenAI",
    description:
      "Generative Artificial Intelligence program focusing on creating AI systems that can produce original content.",
    fullDescription:
      "This comprehensive course covers the latest advancements in Generative AI, including techniques like GANs, VAEs, and transformer-based models. Students will learn to develop AI systems capable of generating text, images, and other media.",
    quaters: [
      "Quarter 1",
      "Quarter 2",
      "Quarter 3",
      "Quarter 4",
      "Quarter 5",
      "Quarter 6",
      "Quarter 7",
    ],
    level: "Advanced",
  },
  {
    id: "robotics",
    title: "Robotics",
    description:
      "Program dedicated to the design, construction, and use of robots for various applications.",
    fullDescription:
      "Our Robotics program provides hands-on experience in designing and building robots. Topics include mechanical engineering, electronics, control systems, and AI integration. Students will work on projects ranging from simple automated systems to complex autonomous robots.",
    quaters: [
      "Quarter 1",
      "Quarter 2",
      "Quarter 3",
      "Quarter 4",
      "Quarter 5",
      "Quarter 6",
      "Quarter 7",
    ],
    level: "Intermediate to Advanced",
  },
];

export default function CourseDetails({ params }: any) {
  const { id } = params;

  const program: any = programs.find((p: any) => p.id === id);

  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // State to track form values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // State to track whether the Pay Now button should be enabled
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Function to handle quarter card click
  const handleQuarterClick = (quarter: string) => {
    setSelectedQuarter(quarter);
    setIsFormVisible(true);
  };

  // Function to validate the form fields
  useEffect(() => {
    if (fullName && email && phoneNumber) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [fullName, email, phoneNumber]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: "price_1Pt9ZzJkhXgr5TBKDwJoygWN",
        fullName,
        email,
        phoneNumber,
        selectedQuarter,
        programName: program.title, // Include the program name
      }),
    });

    const session = await response.json();
    const stripe = await stripePromise;

    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    }
  };

  if (!program) {
    return <div>Course not found</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-6xl py-10">
        <h1 className="text-3xl font-bold mb-4">{program.title}</h1>
        <p className="text-xl mb-4">{program.description}</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-2xl font-semibold mb-2">Course Details</h2>
          <p>{program.fullDescription}</p>
        </div>
        <h2 className="text-2xl font-bold mt-6">Quarters</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {program.quaters.map((quarter: any, index: any) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer"
              onClick={() => handleQuarterClick(quarter)}
            >
              <h3 className="text-lg font-semibold mb-2">{quarter}</h3>
              <p className="text-gray-600">Click to register for {quarter}.</p>
            </div>
          ))}
        </div>

        {isFormVisible && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">
              Register for {selectedQuarter}
            </h2>
            <form className="space-y-4" onSubmit={handleCheckout}>
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 ${
                  isButtonDisabled ? "bg-gray-400" : "bg-blue-500"
                } text-white font-semibold rounded-md ${
                  !isButtonDisabled && "hover:bg-blue-600"
                }`}
                disabled={isButtonDisabled}
              >
                Pay Now
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
