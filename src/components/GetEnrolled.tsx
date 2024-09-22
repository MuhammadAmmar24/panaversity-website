"use client"
import { useState } from "react";
import { CreditCard } from "lucide-react";

export default function Component() {
  // State for selected options
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const days = ["Saturday _ Sunday", "Monday _ Tuesday", "Wednesday _ Thursday"];
  const timeSlots = ["09:00 am _ 01:00 pm", "02:00 pm _ 06:00 pm"];
  const paymentMethods = ["Kuickpay", "Stripe"];

  // Check if all options are selected
  const isFormComplete = selectedDay && selectedTimeSlot && selectedPaymentMethod;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg container mx-auto lg:max-w-[950px] xl:max-w-6xl">
      <h1 className="text-3xl font-bold text-center mb-8">Get Enrolled</h1>
      
      <div className="space-y-6">
        {/* Select Day */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Select Day</h2>
          <div className="flex flex-wrap gap-3">
            {days.map((day) => (
              <button
                key={day}
                className={`px-4 py-2 rounded-full font-medium ${
                  selectedDay === day ? "bg-accent text-white" : "border border-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Select Time Slot */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Time Slots Available</h2>
          <div className="flex flex-wrap gap-3">
            {timeSlots.map((timeSlot) => (
              <button
                key={timeSlot}
                className={`px-4 py-2 rounded-full font-medium ${
                  selectedTimeSlot === timeSlot ? "bg-accent text-white" : "border border-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedTimeSlot(timeSlot)}
              >
                {timeSlot}
              </button>
            ))}
          </div>
        </div>

        {/* Select Payment Method */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  selectedPaymentMethod === method
                    ? "border border-accent"
                    : "border border-gray-300"
                }`}
                onClick={() => setSelectedPaymentMethod(method)}
              >
                <div className="flex items-center">
                  <CreditCard className="w-6 h-6 text-gray-400 mr-3" />
                  <span className="text-gray-700">{method}</span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full ${
                    selectedPaymentMethod === method ? "bg-accent flex items-center justify-center" : "border-2 border-gray-300"
                  }`}
                >
                  {selectedPaymentMethod === method && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enroll Button */}
        <button
          className={`w-full py-3 rounded-lg font-semibold ${
            isFormComplete ? "bg-accent text-white hover:bg-emerald-500" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isFormComplete}  // Disable button when form is incomplete
        >
          Get Enrolled
        </button>
      </div>
    </div>
  );
}
