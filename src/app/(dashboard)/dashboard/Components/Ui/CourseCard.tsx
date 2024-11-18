"use client";
import { getCoursePrice } from "@/src/app/actions/courses";
import { processPayment } from "@/src/app/actions/payment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CourseCardProps } from "../../types/types";
import PaymentDialog from "../Dialog/PaynowDialog";
import { FaYoutube, FaGithub, FaBullhorn } from "react-icons/fa"; // Icons for new links
import Link from "next/link";
import { SiZoom } from "react-icons/si";
import { HiMiniCalendar } from "react-icons/hi2";
import { TbClockHour3 } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  progress,
  classes,
  status,
  batch_id,
  student_course_id,
  course_batch_program_id,
  profile,
  course_code,
  start_time, // Accept start time
  day, // Accept day
}) => {
  // State to control the payment dialog visibility
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [enrollmentPackage, setEnrollmentPackage] = useState<number | null>(
    null,
  );

  const router = useRouter();

  useEffect(() => {
    const fetchEnrollmentPrice = async () => {
      const query = { course_batch_program_id: course_batch_program_id };
      const price_result = await getCoursePrice(query);

      if (price_result.type == "success" && price_result.data) {
        setEnrollmentPackage(price_result?.data.package_id);
      }
    };

    fetchEnrollmentPrice();
  });

  const ReEnroll = () => {
    router.push(`programs/flagship-program/${course_code}`);
  };

  // Function to handle enrollment and payment processing
  const handleEnroll = async (paymentMethod: string) => {
    try {
      const payload: any = {
        batch_no: batch_id,
        package_id: enrollmentPackage,
        student_course_id: student_course_id,
        student_id: profile?.id, // Use the actual student ID now that it's available
        vendor_type: paymentMethod, // Pass the selected payment method
      };

      // Call the payment processing API
      const result: any = await processPayment(payload);

      if (result.type === "success") {
        const url = result?.data?.stripe?.stripe_url; // Get the Stripe payment URL
        if (url) {
          window.location.href = url; // Redirect to payment URL if successful
        } else {
          console.error("Stripe URL not found.");
        }
      } else {
        console.error("API Error:", result.message); // Handle error response
      }
    } catch (error) {
      console.error("Enrollment failed:", error); // Catch and log any errors
    }
  };

  // New icons with links
  const icons = [
    {
      component: <FaYoutube />,
      link: "/",
      name: "YouTube",
      className: `text-red-600 text-2xl mobileM:text-3xl sm:text-4xl md:text-5xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <FaGithub />,
      link: "/",
      name: "GitHub",
      className: `text-gray-800 text-xl mobileM:text-2xl sm:text-3xl md:text-4xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <SiZoom />,
      link: "/",
      name: "Zoom",
      className: `text-blue-500 text-4xl mobileM:text-5xl sm:text-6xl md:text-7xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <FaBullhorn />,
      link: "/",
      name: "Announcements",
      className: `text-gray-800 text-xl mobileM:text-2xl sm:text-3xl md:text-4xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <RiRobot2Line />,
      link: "/",
      name: "Student Bot",
      className: `text-gray-300 text-xl mobileM:text-2xl sm:text-3xl md:text-4xl pointer-events-none cursor-not-allowed`,
    },
  ];

  const progressPercentage = (progress / classes) * 100; // Calculate progress as a percentage

  return (
    <section className="">
      <div className="relative">
        <article className="flex flex-col gap-4 rounded-xl border bg-white px-4 py-4 shadow-lg sm:px-6 md:gap-6 md:py-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h6
              className={`text-[10px] font-medium text-gray-700 sm:text-sm ${
                status === "active" ? "text-gray-500" : "opacity-30"
              }`}
            >
              Course Code:{" "}
              <span className="font-bold text-black underline decoration-accent decoration-1 underline-offset-2">
                {course_code}
              </span>
            </h6>
            {/* Button Container */}
            <div className="ml-auto text-[10px] font-medium sm:text-xs md:font-semibold">
              {status === "active" ? (
                <button className="min-h-6 min-w-[93px] cursor-default rounded-full border border-accent bg-accent px-4 text-white shadow-lg md:min-h-8 md:min-w-[125px] md:px-6">
                  Paid
                </button>
              ) : status === "reserved_seat" ? (
                <button
                  onClick={() => setPaymentDialogOpen(true)} // Open dialog on click
                  className="min-h-6 min-w-[93px] rounded-full border-2 border-red-600 px-2 text-red-600 shadow-xl transition duration-300 hover:bg-red-600 hover:text-white md:min-h-8 md:min-w-[125px] md:px-4"
                >
                  Pay to Proceed
                </button>
              ) : status === "expired_reservation" ? (
                <button
                  onClick={ReEnroll}
                  className="min-h-6 min-w-[93px] rounded-full border-2 border-yellow-500 px-2 text-yellow-500 shadow-xl transition duration-300 hover:bg-yellow-500 hover:text-white md:min-h-8 md:min-w-[125px] md:px-4"
                >
                  Enroll Again
                </button>
              ) : null}
            </div>
          </div>

          <h2
            className={`font-poppins truncate font-medium md:text-xl ${
              status === "active" ? "text-textPrimary/90" : "opacity-30"
            } `}
          >
            {title}
          </h2>

          {status == "active" ? (
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="h-2 flex-1 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 sm:text-sm md:text-lg">
                <span className="text-black">{progress}/</span>
                {classes} Classes
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="h-2 flex-1 rounded-full bg-gray-200"></div>
              <p className="text-xs text-gray-500 sm:text-sm md:text-lg">
                <span className="text-black opacity-30">0/14 Classes</span>
              </p>
            </div>
          )}

          <div className="-mb-4 -mt-2 flex items-center justify-between border-t">
            {icons.map((icon, index) => (
              <Link
                key={index}
                href={icon.link}
                target="_blank"
                className={`${icon.className}`}
                title={icon.name}
              >
                {icon.component}
              </Link>
            ))}
          </div>

          {/* Date and time details */}
          <div
            className={`flex justify-between text-xs sm:text-sm ${
              status === "active" ? "text-gray-500" : "opacity-30"
            }`}
          >
            {/* Class date */}
            <div className="flex items-center gap-2">
              <HiMiniCalendar className="text-sm md:text-base" />
              <span>{day}</span>
            </div>

            {/* Class duration or time */}
            <div className="flex items-center gap-2">
              <TbClockHour3 className="text-sm md:text-base" />
              <span>{start_time}</span>
            </div>
          </div>
        </article>
      </div>

      {/* Payment Dialog Component */}
      <PaymentDialog
        open={isPaymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        onConfirm={(paymentMethod) => handleEnroll(paymentMethod)} // Pass payment method to handleEnroll
      />
    </section>
  );
};

export default CourseCard;
