"use client"
import { useState } from "react";
import { CreditCard, ArrowLeft } from "lucide-react";
import { SheetClose } from "@/src/components/ui/sheet";  // Import SheetClose for arrow button functionality

export default function GetEnrolled() {
  // State for selected options
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const days = ["Saturday - Sunday", "Monday - Tuesday", "Wednesday - Thursday"];
  const timeSlots = ["09:00 am - 01:00 pm", "02:00 pm - 06:00 pm"];
  const paymentMethods = ["Kuickpay", "Stripe"];

  // Check if all options are selected
  const isFormComplete = selectedDay && selectedTimeSlot && selectedPaymentMethod;

  return (
    <div className="bg-white py-8 rounded-3xl shadow-lg container mx-auto lg:max-w-[950px] xl:max-w-6xl">
      {/* Back Arrow Button */}
      <SheetClose asChild>
        <button className="flex items-center mb-10">
          <ArrowLeft className="w-10 h-10 text-black ml-5" />
        </button>
      </SheetClose>

      <div className="px-8 md:px-32">
        <h1 className="text-3xl font-bold mb-8">Get Enrolled Today</h1>

        <p className="text-gray-500 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <div className="space-y-6">
          {/* Select Day Dropdown */}
          <div>
            <label htmlFor="day" className="block text-lg font-semibold mb-2">Day</label>
            <select
              id="day"
              className="block w-full max-w-md p-3 border border-neutral-400 rounded-lg text-gray-700 bg-transparent"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Day
              </option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Select Time Slot Dropdown */}
          <div>
            <label htmlFor="timeSlot" className="block text-lg font-semibold mb-2">Time</label>
            <select
              id="timeSlot"
              className="block w-full max-w-md p-3 border border-neutral-400 rounded-lg text-gray-700 bg-transparent"
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Time
              </option>
              {timeSlots.map((timeSlot) => (
                <option key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
          </div>

          {/* Select Payment Method */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className={`flex items-center justify-between p-3 rounded-lg ${selectedPaymentMethod === method
                      ? "border border-emerald-500"
                      : "border border-gray-300"
                    }`}
                  onClick={() => setSelectedPaymentMethod(method)}
                >
                  <div className="flex items-center">
                    <CreditCard className="w-6 h-6 text-gray-400 mr-3" />
                    <span className="text-gray-700">{method}</span>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full ${selectedPaymentMethod === method ? "bg-emerald-500 flex items-center justify-center" : "border-2 border-gray-300"
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
            className={`w-full py-3 rounded-lg font-semibold ${isFormComplete ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            disabled={!isFormComplete}  // Disable button when form is incomplete
          >
            Get Enrolled
          </button>
        </div>
      </div>
    </div>
  );
}
