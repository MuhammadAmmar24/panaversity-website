"use client";
import { useState, useEffect } from "react";
// import { CreditCard } from "lucide-react";
import { getTimeSlotsForCourseBatchProgram } from "@/src/actions/courses"; // Import the function

export default function GetEnrolled() {
  // State for time slots and selected options
  const [classTimeSlots, setClassTimeSlots] = useState<any[]>([]); // Class time slots fetched from API
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [seats, setSeats] = useState<number | null>(null);
  const [remainingSeats, setRemainingSeats] = useState<number | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const paymentMethods = ["Kuickpay", "Stripe"];
  const [focusedInput, setFocusedInput] = useState("");

  // Fetch time slots when the component mounts
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const query = { course_batch_program_id: 1 }; // Replace with actual course_batch_program_id
        const result = await getTimeSlotsForCourseBatchProgram(query);

        if (result.type === "success" && result.data) {
          setClassTimeSlots(result.data.class_time_slots);

          // Check if class_time_slots array is not empty
          if (
            result.data.class_time_slots !== undefined &&
            result.data.class_time_slots.length > 0
          ) {
            const slot = result.data.class_time_slots[0]; // Using the first slot as an example
            const totalSeats = slot.total_seats;
            const bookedSeats = slot.booked_seats; // Replace with actual field name from your API
            // const availableSeats = slot.available_seats; // If available

            setSeats(totalSeats);

            // If 'available_seats' is provided by the API, use it directly
            // if (availableSeats !== undefined) {
            //   setRemainingSeats(availableSeats);
            // } else
            if (bookedSeats !== undefined) {
              // Calculate remaining seats
              setRemainingSeats(totalSeats - bookedSeats);
            } else {
              console.error(
                "Booked seats or available seats information not found in API response."
              );
            }
          } else {
            console.error("Total seats information not found in API response.");
          }
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

  // Function to get the next date for a given day of the week
  const getNextDateForDay = (dayName: any) => {
    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(dayName);

    if (dayOfWeek === -1) return null;

    const now = new Date();
    const resultDate = new Date(now);
    resultDate.setDate(
      now.getDate() + ((dayOfWeek + 7 - now.getDay()) % 7 || 7)
    );
    return resultDate;
  };

  // Get time slots for the selected day with time zone conversion
  const timeSlotsForSelectedDay = classTimeSlots
    .filter((slot) => slot.time_slot_day === selectedDay)
    .map((slot) => {
      // Get the next date for the selected day
      const dateForSlot = getNextDateForDay(selectedDay);

      if (!dateForSlot) return null;

      // Combine date with start and end times
      const dateString = dateForSlot.toISOString().split("T")[0]; // YYYY-MM-DD
      const startTimeString = `${dateString}T${slot.slot_start_time}Z`; // Assume times are in UTC
      const endTimeString = `${dateString}T${slot.slot_end_time}Z`;

      // Create Date objects
      const startDate = new Date(startTimeString);
      const endDate = new Date(endTimeString);

      // Format the dates to the user's local timezone
      const formattedStartTime = startDate.toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      const formattedEndTime = endDate.toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      return {
        id: slot.id,
        timeSlotId: slot.id, // You might need this for further processing
        label: `${formattedStartTime} - ${formattedEndTime}`,
        originalSlot: slot, // Keep the original slot if needed
      };
    })
    .filter(Boolean); // Remove null entries

  // Check if day and time are selected
  const isDayAndTimeSelected = selectedDay && selectedTimeSlot;

  // Check if all options are selected
  const isFormComplete =
    isDayAndTimeSelected && selectedPaymentMethod && isEnrolled;

  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  return (
    <div className="rounded-3xl container mx-auto max-w-full">
      <div className="px-2 ">
        <h1 className="text-3xl font-bold mb-8 mt-5">Get Enrolled Today</h1>

        <div className="text-gray-500 mb-8 text-base flex flex-col gap-2">
          <p>
            <span className="font-semibold">
              1- Select Your Preferred Day and Time:
            </span>{" "}
            Choose the class schedule that works best for you from the available
            options.
            <br />
          </p>
          <p>
            <span className="font-semibold">2- Reserve Your Seat:</span> Once
            you've selected your preferred day and time, you can reserve a seat,
            provided there is availability.
            <br />
          </p>
          <p>
            <span className="font-semibold">
              3- Confirm Your Reservation by Payment:
            </span>{" "}
            After reserving your seat, go to your student dashboard to complete
            the payment. Your seat will only be officially booked once the
            payment is made.
          </p>
        </div>

        {/* Display total seats */}
        <div className="mb-6 text-red-500">
          <span className="text-lg font-semibold">Remaining Seats: </span>
          <span className="text-lg">
            {remainingSeats === null
              ? "..."
              : remainingSeats === 0
              ? "N/A"
              : remainingSeats}
          </span>
        </div>

        <div className="space-y-5 w-full ">
          {/* Select Day Dropdown */}
          <div>
            <label htmlFor="day" className="block text-lg font-semibold mb-2">
              Day
            </label>
            <div className="relative w-full">
              <select
                id="day"
                className={` w-full p-3 pr-10 border rounded-lg text-gray-700 focus:outline-none bg-transparent appearance-none ${
                  isDayAndTimeSelected
                    ? "border-accent"
                    : focusedInput === "day"
                    ? "border-accent"
                    : "border-neutral-400"
                }`}
                value={selectedDay}
                onChange={(e) => {
                  setSelectedDay(e.target.value);
                  setSelectedTimeSlot("");
                }}
                onFocus={() => setFocusedInput("day")}
                onBlur={() => setFocusedInput("")}
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
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Select Time Slot Dropdown */}
          <div>
            <label
              htmlFor="timeSlot"
              className="block text-lg font-semibold mb-2"
            >
              Time
            </label>
            <div className="relative w-full">
              <select
                id="timeSlot"
                className={`block w-full p-3 pr-10 border rounded-lg text-gray-700 focus:outline-none bg-transparent appearance-none ${
                  isDayAndTimeSelected
                    ? "border-accent"
                    : focusedInput === "timeSlot"
                    ? "border-accent"
                    : "border-neutral-400"
                }`}
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                disabled={!selectedDay}
                onFocus={() => setFocusedInput("timeSlot")}
                onBlur={() => setFocusedInput("")}
              >
                <option value="" disabled hidden>
                  Select Time
                </option>
                {timeSlotsForSelectedDay.map((timeSlot: any) => (
                  <option key={timeSlot.id} value={timeSlot.timeSlotId}>
                    {timeSlot.label}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Reserve Your Seat Button */}
          <button
            className={`w-full block p-3 rounded-lg font-semibold ${
              isDayAndTimeSelected
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isDayAndTimeSelected}
            onClick={handleEnroll}
          >
            Reserve Your Seat
          </button>
        </div>
      </div>
    </div>
  );
}
