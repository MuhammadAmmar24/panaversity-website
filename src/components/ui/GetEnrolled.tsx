"use client";
import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import { getTimeSlotsForCourseBatchProgram } from "@/src/actions/courses"; // Import the function

export default function GetEnrolled() {
  // State for time slots and selected options
  const [classTimeSlots, setClassTimeSlots] = useState<any[]>([]); // Class time slots fetched from API
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  const paymentMethods = ["Kuickpay", "Stripe"];

  // Fetch time slots when the component mounts
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const query = { course_batch_program_id: 1 }; // Replace with actual course_batch_program_id
        const result = await getTimeSlotsForCourseBatchProgram(query);

        if (result.type === "success" && result.data) {
          setClassTimeSlots(result.data.class_time_slots);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };

    fetchTimeSlots();
  }, []);

  // Get unique days for the day dropdown
  const uniqueDays = Array.from(
    new Set(classTimeSlots.map((slot) => slot.time_slot_day))
  );

  // Get time slots for the selected day
  const timeSlotsForSelectedDay = classTimeSlots
    .filter((slot) => slot.time_slot_day === selectedDay)
    .map((slot) => `${slot.slot_start_time} - ${slot.slot_end_time}`);

  // Check if day and time are selected
  const isDayAndTimeSelected = selectedDay && selectedTimeSlot;

  // Check if all options are selected
  const isFormComplete = isDayAndTimeSelected && selectedPaymentMethod && isEnrolled;

  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  return (
    <div className="rounded-3xl container mx-auto max-w-full">
      <div className="px-2 ">
        <h1 className="text-3xl font-bold mb-8 mt-5">Get Enrolled Today</h1>

        <p className="text-gray-500 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="space-y-5">
          {/* Select Day Dropdown */}
          <div>
            <label htmlFor="day" className="block text-lg font-semibold mb-2">
              Day
            </label>
            <select
              id="day"
              className="block w-full max-w-md p-3 border border-neutral-400 rounded-lg text-gray-700 bg-transparent"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Day
              </option>
              {uniqueDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          {/* Select Time Slot Dropdown */}
          <div>
            <label
              htmlFor="timeSlot"
              className="block text-lg font-semibold mb-2"
            >
              Time
            </label>
            <select
              id="timeSlot"
              className="block w-full max-w-md p-3 border border-neutral-400 rounded-lg text-gray-700 bg-transparent"
              value={selectedTimeSlot}
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              disabled={!selectedDay} // Disable until a day is selected
            >
              <option value="" disabled hidden>
                Select Time
              </option>
              {timeSlotsForSelectedDay.map((timeSlot) => (
                <option key={timeSlot} value={timeSlot}>
                  {timeSlot}
                </option>
              ))}
            </select>
          </div>

          {/* Get Enrolled Button */}
          <button
            className={`w-full py-3 rounded-lg font-semibold ${
              isDayAndTimeSelected
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isDayAndTimeSelected}
            onClick={handleEnroll}
          >
            Get Enrolled
          </button>

          {/* Select Payment Method */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div
                  key={method}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    selectedPaymentMethod === method
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
                    className={`w-6 h-6 rounded-full ${
                      selectedPaymentMethod === method
                        ? "bg-emerald-500 flex items-center justify-center"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    {selectedPaymentMethod === method && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pay Now Button */}
          <button
            className={`w-full py-3 rounded-lg font-semibold ${
              isFormComplete
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}