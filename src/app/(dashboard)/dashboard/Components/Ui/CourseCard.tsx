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
  day // Accept day
}) => {
  // State to control the payment dialog visibility
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [enrollmentPackage, setEnrollmentPackage] = useState<number | null>(
    null
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
    router.push("programs/flagship-program");
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
    { component: <FaYoutube />, link: "/", name: "YouTube", className: "text-red-600 text-5xl" },
    { component: <FaGithub />, link: "/", name: "GitHub", className: "text-gray-800 text-4xl" },
    { component: <SiZoom />, link: "/", name: "Zoom", className: "text-blue-500 text-7xl" },
    { component: <FaBullhorn />, link: "/", name: "Announcements", className: "text-gray-800 text-4xl" },
    { component: <RiRobot2Line />, link: "/", name: "Student Bot", className: "text-4xl text-gray-300 pointer-events-none cursor-not-allowed" },
  ];

const progressPercentage = (progress / classes * 100); // Calculate progress as a percentage

  return (
    <section className="">
      <div className="relative">
        <article className="bg-white shadow-lg rounded-xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h6 className="text-sm font-medium text-gray-700 ">
              Course Code: <span className="font-bold underline underline-offset-2 text-black decoration-accent decoration-1">{course_code}</span>
            </h6>
            {/* Button Container */}
            <div className="ml-auto">
              {status === "active" ? (
                <button className="md:text-[15px] font-medium md:font-semibold text-[8px] text-white h-6 md:h-8 border border-accent rounded-full px-6 md:px-6 bg-accent shadow-lg cursor-default">
                  Paid
                </button>
              ) : status === "reserved_seat" ? (
                <button
                  onClick={() => setPaymentDialogOpen(true)} // Open dialog on click
                  className="md:text-[15px] font-medium md:font-semibold text-[8px] text-red-600 h-6 md:h-8 border-2 border-red-600 rounded-full px-2 md:px-4 hover:text-white hover:bg-red-600 transition duration-300 shadow-xl"
                >
                  Pay to Proceed
                </button>
              ) : status === "expired_reservation" ? (
                <button
                  onClick={ReEnroll}
                  className="md:text-[15px] font-medium md:font-semibold text-[8px] text-accent h-6 md:h-8 border-2 border-accent rounded-full px-2 md:px-4 hover:text-white hover:bg-accent transition duration-300 shadow-xl"
                >
                  Enroll Again
                </button>
              ) : null}
            </div>
          </div>

          <h2
            className={`font-poppins font-medium text-lg md:text-xl truncate${
              status === "active" ? "" : "opacity-30"
            } `}
          >
            {title}
          </h2>

          {status == "active" ? (
            <div className="flex items-center gap-6">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm md:text-lg">
                <span className="text-black">{progress}/</span>
                {classes} Classes
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div className="flex-1 bg-gray-200 rounded-full h-2 "></div>
              <p className="text-gray-500 text-xs sm:text-sm md:text-lg">
                <span
                  className={`text-black ${
                    status === "active" ? "" : "opacity-30"
                  }`}
                >
                  0/
                </span>
                {progress} Classes
              </p>
            </div>
          )}

          <div className="flex justify-between items-center border-t -mt-2 -mb-4">
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
          <div className="flex justify-between text-xs sm:text-sm text-gray-500">
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