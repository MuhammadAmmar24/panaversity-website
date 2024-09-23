"use client";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Modal from "../../../components/Modal"; // Import the Modal component

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Payment method state (Stripe or Kuickpay)
  const [paymentMethod, setPaymentMethod] = useState<string>("Stripe");

  const handleQuarterClick = (quarter: string) => {
    setSelectedQuarter(quarter);
    setIsModalOpen(true); // Open the modal
  };

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
        programName: program.title,
        paymentMethod, // Send the selected payment method
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

        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedQuarter={selectedQuarter!}
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          isButtonDisabled={isButtonDisabled}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
