"use client";
import { useState, useEffect, useTransition } from "react";
import { getTimeSlotsForCourseBatchProgram } from "@/src/app/actions/courses";
import { enrollNewStudentInProgramAndCourse } from "@/src/app/actions/enrollment"; // Import the action
import { useRouter } from "next/navigation";
import { getCoursePrice } from "@/src/app/actions/courses";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function GetEnrolled({
  program_id,
  batch_id,
  course_batch_program_id,
  profile_id,
}: any) {
  const [classTimeSlots, setClassTimeSlots] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(""); // Storing label of time slot
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(
    null
  ); // Storing ID of time slot
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [seats, setSeats] = useState<number | null>(null);
  const [remainingSeats, setRemainingSeats] = useState<number | null>(null);
  const [enrollmentPackage, setEnrollmentPackage] = useState<number | null>(
    null
  );
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const paymentMethods = ["Stripe"];

  const router = useRouter();

  // Automatically select Stripe if it's the only payment method
  useEffect(() => {
    if (paymentMethods.length === 1) {
      setSelectedPaymentMethod(paymentMethods[0]); // Automatically select "Stripe"
    }
  }, [paymentMethods]); // This runs whenever paymentMethods is updated

  // Fetch time slots
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const query = { course_batch_program_id: course_batch_program_id };

        const result = await getTimeSlotsForCourseBatchProgram(query);

        if (result.type === "success" && result.data) {
          setClassTimeSlots(result.data.class_time_slots);

          if (
            result.data.class_time_slots &&
            result.data.class_time_slots.length > 0
          ) {
            const slot = result.data.class_time_slots[0];
            const totalSeats = slot.total_seats;
            const bookedSeats = slot.booked_seats;

            setSeats(totalSeats);
            if (bookedSeats !== undefined) {
              setRemainingSeats(totalSeats - bookedSeats);
            } else {
              console.error("Booked seats information not found.");
            }
          } else {
            console.error("Total seats information not found.");
          }
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };

    const fetchEnrollmentPrice = async () => {
      const query = { course_batch_program_id: course_batch_program_id };
      const price_result = await getCoursePrice(query);

      if (price_result.type == "success" && price_result.data) {
        setEnrollmentPackage(price_result?.data.package_id);
      }
    };

    fetchTimeSlots();
    fetchEnrollmentPrice();
  }, [course_batch_program_id]);

  // Get time slots for selected day
  const uniqueDays = Array.from(
    new Set(classTimeSlots.map((slot) => slot.time_slot_day))
  );
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

  const timeSlotsForSelectedDay = classTimeSlots
    .filter((slot) => slot.time_slot_day === selectedDay)
    .map((slot) => {
      const dateForSlot = getNextDateForDay(selectedDay);
      if (!dateForSlot) return null;

      const dateString = dateForSlot.toISOString().split("T")[0];
      const startTimeString = `${dateString}T${slot.slot_start_time}Z`;
      const endTimeString = `${dateString}T${slot.slot_end_time}Z`;

      const startDate = new Date(startTimeString);
      const endDate = new Date(endTimeString);

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
        timeSlotId: slot.id,
        label: `${formattedStartTime} - ${formattedEndTime}`,
        originalSlot: slot,
      };
    })
    .filter(Boolean);

  const isDayAndTimeSelected = selectedDay && selectedTimeSlot;
  const isFormComplete =
    isDayAndTimeSelected && selectedPaymentMethod && isEnrolled;

  const handleEnroll = async () => {
    if (!isDayAndTimeSelected) return;

    const payload: any = {
      student_id: profile_id, // Assuming this is just a placeholder; replace it with the actual student_id
      program_id: program_id,
      batch_id: batch_id,
      course_batch_program_id: course_batch_program_id,
      class_time_slot_id: selectedTimeSlotId, // Using the selected time slot ID here
      vendor_type: selectedPaymentMethod.toUpperCase(),
      package_id: enrollmentPackage,
    };

    console.log("Enrollment Payload:", payload);
    // Log the payload for debugging

    startTransition(async () => {
      try {
        const result: any = await enrollNewStudentInProgramAndCourse(payload);

        if (result.type === "success") {
          setIsEnrolled(true); // Enrollment success, show message

          const url = result.data?.fee_voucher?.stripe?.stripe_url;

          if (url) {
            router.push(url); // Open the Stripe payment URL
          } else {
            console.error("Stripe URL not found in the response.");
            router.push("/dashboard");
          }
        } else {
          // If result.type is "error", show the error message from the backend
          console.error("Enrollment Error:", result.message);
          if (
            result.message &&
            result.message.includes(
              "Student is already fully enrolled in the course."
            )
          ) {
            // Automatically route to the dashboard
            router.push("/dashboard");
          } else {
            setEnrollmentError(
              result.message || "An error occurred during enrollment."
            );
          }
        }
      } catch (error: any) {
        console.error("Unexpected error during enrollment:", error);
        setEnrollmentError("Failed to enroll student. Please try again later."); // General error message for unexpected failures
      }
    });
  };

  return (
    <div className="rounded-3xl container mx-auto max-w-full">
      <div className="px-2 ">
        <h1 className="text-3xl font-bold mb-8 mt-5">Get Enrolled Today</h1>

        <div className="text-gray-500 mb-8 text-base flex flex-col gap-2">
          {/* Display form instructions */}
        </div>

        {/* Display enrollment form */}
        <div className="space-y-7 w-full ">
          {/* Select Day Dropdown */}
          <div>
            <label htmlFor="day" className="block text-lg font-semibold mb-2">
              Day
            </label>
            <div className="relative w-full">
              <select
                id="day"
                className={`w-full p-3 pr-10 border rounded-lg text-gray-700 focus:outline-none bg-transparent appearance-none ${
                  selectedDay ? "border-accent" : "border-neutral-400"
                }`}
                value={selectedDay}
                onChange={(e) => {
                  setSelectedDay(e.target.value);
                  setSelectedTimeSlot("");
                }}
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

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
                  selectedTimeSlot ? "border-accent" : "border-neutral-400"
                }`}
                value={selectedTimeSlot}
                onChange={(e) => {
                  setSelectedTimeSlot(e.target.value);
                  const selectedId = parseInt(
                    e.target.selectedOptions[0].value,
                    10
                  );
                  setSelectedTimeSlotId(selectedId); // Store the time slot ID

                  // Console log the selected time slot
                  const selectedSlot = timeSlotsForSelectedDay.find(
                    (slot: any) => slot.timeSlotId === selectedId
                  );
                }}
                disabled={!selectedDay}
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="payment"
              className="block text-lg font-semibold mb-2"
            >
              Payment Method
            </label>

            {/* Only show the payment method dropdown if there's more than one method */}
            {paymentMethods.length > 1 ? (
              <div className="relative w-full">
                <select
                  id="payment"
                  className={`w-full p-3 pr-10 border rounded-lg text-gray-700 focus:outline-none bg-transparent appearance-none ${
                    selectedPaymentMethod
                      ? "border-accent"
                      : "border-neutral-400"
                  }`}
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  disabled={!isDayAndTimeSelected}
                >
                  <option value="" disabled hidden>
                    Select Payment Method
                  </option>
                  {paymentMethods.map((payment) => (
                    <option key={payment} value={payment}>
                      {payment}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <p className="w-full p-3 pr-10 border rounded-lg text-gray-700 focus:outline-none bg-transparent appearance-none border-accent">
                {paymentMethods[0]}
              </p> // Display Stripe directly when only one method is available
            )}
          </div>

          {/* Display remaining seats */}
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

          <button
            className={`w-full flex items-center justify-center p-3 rounded-lg font-semibold ${
              selectedDay &&
              selectedTimeSlot &&
              selectedPaymentMethod &&
              !isPending
                ? "bg-accent text-white hover:bg-[#18c781]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isDayAndTimeSelected || isPending}
            onClick={handleEnroll}
          >
            {isPending ? (
              <>
                <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                Enrolling...
              </>
            ) : (
              "Enroll"
            )}
          </button>

          {/* Success Message */}
          {isEnrolled && (
            <div className="mt-4 text-green-500">
              <p>Enrollment successful! You have reserved your seat.</p>
            </div>
          )}

          {/* Error Message */}
          {enrollmentError && (
            <p className={"text-red-500 mt-4"}>{enrollmentError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
