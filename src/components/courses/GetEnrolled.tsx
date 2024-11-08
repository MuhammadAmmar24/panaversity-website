import { enrollNewStudentInProgramAndCourse } from "@/src/app/actions/enrollment";
import { GetEnrolledProps } from "@/src/types/courseEnrollment";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function GetEnrolled({
  program_id,
  batch_id,
  course_batch_program_id,
  profile_id,
  timeSlots,
  coursePrice,
}: GetEnrolledProps) {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(
    null
  );
  const [remainingSeats, setRemainingSeats] = useState<number | null>(null);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("STRIPE"); // Add payment method state
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const classTimeSlots = timeSlots.class_time_slots;
  const enrollmentPackage = coursePrice.package_id;

  useEffect(() => {
    if (selectedDay) {
      const selectedSlot = classTimeSlots.find(
        (slot) => slot.time_slot_day === selectedDay
      );
      if (selectedSlot) {
        const seats_left = selectedSlot.total_seats - selectedSlot.booked_seats
        seats_left > 0 ? setRemainingSeats(seats_left) : setRemainingSeats(0);
      }
    }
  }, [selectedDay, classTimeSlots, remainingSeats]);

  const uniqueDays = Array.from(
    new Set(classTimeSlots.map((slot) => slot.time_slot_day))
  );

  const timeSlotsForSelectedDay = classTimeSlots
    .filter((slot) => slot.time_slot_day === selectedDay)
    .map((slot) => ({
      id: slot.id,
      timeSlotId: slot.id,
      label: `${formatTime(slot.slot_start_time ?? "")} - ${formatTime(
        slot.slot_end_time ?? ""
      )}`,
    }));

  const handleEnroll = async () => {
    if (
      !selectedDay ||
      !selectedTimeSlot ||
      selectedTimeSlotId === null ||
      enrollmentPackage === null
    ) {
      setEnrollmentError(
        "Please select a valid time slot and ensure the package is available."
      );
      return;
    }

    const payload = {
      student_id: profile_id,
      program_id,
      batch_id,
      course_batch_program_id,
      class_time_slot_id: selectedTimeSlotId,
      vendor_type: paymentMethod, // Pass the selected payment method
      package_id: enrollmentPackage,
    };

    startTransition(async () => {
      try {
        const result = await enrollNewStudentInProgramAndCourse(payload);

        if (result.type === "success") {
          const url = result.data?.fee_voucher?.stripe?.stripe_url;
          if (url) {
            router.push(url);
          } else {
            router.push("/dashboard");
          }
        } else {
          setEnrollmentError(
            result.message || "An error occurred during enrollment."
          );
        }
      } catch (error) {
        console.error("Unexpected error during enrollment:", error);
        setEnrollmentError("Failed to enroll student. Please try again later.");
      }
    });
  };

  return (
    <div className="rounded-3xl container mx-auto max-w-full px-2">
      <h1 className="text-3xl font-bold mb-8 mt-5">Get Enrolled Today</h1>

      <div className="space-y-7 w-full">
        <SelectField
          label="Day"
          value={selectedDay}
          onChange={(e: any) => {
            setSelectedDay(e.target.value);
            setSelectedTimeSlot("");
          }}
          options={uniqueDays}
          placeholder="Select Day"
        />

        <SelectField
          label="Time"
          value={selectedTimeSlot}
          onChange={(e: any) => {
            setSelectedTimeSlot(e.target.value);
            setSelectedTimeSlotId(parseInt(e.target.value, 10));
          }}
          options={timeSlotsForSelectedDay.map((slot) => ({
            value: slot.timeSlotId.toString(),
            label: slot.label,
          }))}
          placeholder="Select Time"
          disabled={!selectedDay}
        />

        <SelectField
          label="Payment Method"
          value={paymentMethod}
          onChange={(e: any) => setPaymentMethod(e.target.value)}
          options={[{ value: "STRIPE", label: "Stripe" }]} // Currently only Stripe
          placeholder="Select Payment Method"
        />

        <div className="mb-6 text-red-500">
          <span className="text-lg font-semibold">Remaining Seats: </span>
          <span className="text-lg">
            {remainingSeats === null
              ? "..."
              : remainingSeats === 0
              ? "0"
              : remainingSeats}
          </span>
        </div>

        {/* Payment Method Dropdown */}

        <button
          className={`w-full flex items-center justify-center p-3 rounded-lg font-semibold ${
            selectedDay && selectedTimeSlot && !isPending && remainingSeats! > 0
              ? "bg-accent text-white hover:bg-[#18c781]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedDay || !selectedTimeSlot || isPending || remainingSeats === 0}
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

        {enrollmentError && (
          <p className="text-red-500 mt-4">{enrollmentError}</p>
        )}
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: any) {
  return (
    <div>
      <label htmlFor={label} className="block text-lg font-semibold mb-2">
        {label}
      </label>
      <div className="relative w-full">
        <select
          id={label}
          className={`w-full p-3 pr-10 border rounded-lg text-gray-700 focus:outline-none bg-transparent appearance-none ${
            value ? "border-accent" : "border-neutral-400"
          }`}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option: any) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
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
              d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function formatTime(time: string): string {
  const date = new Date(`1970-01-01T${time}Z`);
  const formattedTime = date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  return formattedTime;
}
