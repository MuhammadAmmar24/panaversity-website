"use client";
import { useState, useEffect, useTransition } from "react";
import { getTimeSlotsForCourseBatchProgram } from "@/src/actions/courses";
import { enrollNewStudentInProgramAndCourse } from "@/src/actions/enrollment"; // Import the action
import { useRouter } from "next/navigation";
import { checkUserVerification } from "@/src/actions/profile";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function GetEnrolled({course_id, batch_id, course_batch_program_id}: any) {
  const [classTimeSlots, setClassTimeSlots] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [seats, setSeats] = useState<number | null>(null);
  const [remainingSeats, setRemainingSeats] = useState<number | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [profile, setProfile] = useState<ProfileData | null>(null);

  const paymentMethods = ["Kuickpay", "Stripe"];
  const [focusedInput, setFocusedInput] = useState("");

  const router = useRouter();

  // Fetch time slots
  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const query = { course_batch_program_id: 1 }; // Replace with actual course_batch_program_id
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

    
    const fetchUserData = async () => {
    try {
      const user_data = await checkUserVerification();

      setProfile(user_data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

    fetchTimeSlots();
    fetchUserData();
  }, []);

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
      student_id: profile?.id, // Replace with actual student ID, ensure it's a valid string or number as per API requirements
      program_id: 1, // Replace with actual program ID, ensure it's correct
      batch_id: batch_id, // Replace with actual batch ID
      course_batch_program_id: course_batch_program_id, // Replace with actual course_batch_program_id
      class_time_slot_id: 1, // Ensure this is valid, being parsed as a number
      vendor_type: selectedPaymentMethod.toUpperCase(),
      package_id: 1,
    };

    // Log the payload for debugging
    console.log("Enrollment Payload:", payload);

    startTransition(async() =>  {
    try {
      const result: any = await enrollNewStudentInProgramAndCourse(payload);
      console.log("RESULT", result)
      const url = result.data?.fee_voucher?.stripe?.stripe_url;
      console.log("URL", url)


      if (result.type === "success") {
        setIsEnrolled(true); // Enrollment success, show message
        //setEnrollmentError(result.message); // Clear any errors
        // console.log(result.message); // Optional: log the success message

        if (url) {
          console.log("URL",url)
          router.push(url); // Use window.location.href for external URL
        } else {
          // console.error("Stripe URL not found.");
        }
      } else {
        setEnrollmentError(result.message); // Handle API error
        // console.error("API Error:", result.message);
      }
    } catch (error) {
      setEnrollmentError("Failed to enroll student."); // General error handling
      // console.error("Enrollment failed:", error);
    }
  });
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

        <div className="text-gray-500 mb-8 text-base flex flex-col gap-2">
          {/* Display form instructions */}
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
        {/* Display enrollment form */}
        <div className="space-y-5 w-full ">
          {/* Select Day Dropdown */}
          <div>
            <label htmlFor="day" className="block text-lg font-semibold mb-2">
              Vendor
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
                value={selectedPaymentMethod}
                onChange={(e) => {
                  setSelectedPaymentMethod(e.target.value);
                  setSelectedDay("");
                  setSelectedTimeSlot("");
                }}
                onFocus={() => setFocusedInput("day")}
                onBlur={() => setFocusedInput("")}
              >
                <option value="" disabled hidden>
                  Select Your Vendor
                </option>
                {paymentMethods.map((vendor) => (
                  <option key={vendor} value={vendor}>
                    {vendor}
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
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

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
                disabled={!selectedPaymentMethod}
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

          <button
            className={`w-full flex items-center justify-center p-3 rounded-lg font-semibold ${
              isDayAndTimeSelected && !isPending
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
            <p className={"text-red-500 mt-4"}>
              Failed to enroll student in course
            </p>
          )}
        </div>
      </div>
    </div>
  );
}