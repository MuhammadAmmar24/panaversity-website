"use client";
import React, { useState, useEffect } from "react";
import { CiMobile1 } from "react-icons/ci";
import { CourseCardProps } from "../../types/types";
import { processPayment } from "@/src/app/actions/payment";
import { getCoursePrice } from "@/src/app/actions/courses";
import PaymentDialog from "../Dialog/PaynowDialog";
import { useRouter } from "next/navigation";

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  progress,
  lessons,
  status,
  batch_id,
  student_course_id,
  course_batch_program_id,
  profile,
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
        // revalidatePath("/dashboard"); // Revalidate the dashboard page
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

  return (
    <section className="w-full h-full">
      <h1 className="font-medium text-start text-xl md:text-2xl font-poppins mb-4">
        Enrolled Courses
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        <article className="bg-white shadow-lg rounded-lg p-6 md:p-8 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-6">
            <CiMobile1
              className={`text-4xl bg-gray-200 rounded-full w-auto md:h-12 p-[8px] ${
                status === "active" ? "" : "opacity-30"
              }`}
            />
            {/* Button Container */}
            <div className="ml-auto">
              {status === "active" ? (
                <button className="md:text-[15px] font-medium md:font-semibold text-[10px] text-white h-6 md:h-8 border border-accent rounded-full px-6 md:px-8 bg-accent shadow-lg cursor-default">
                  Paid
                </button>
              ) : status === "reserved_seat" ? (
                <button
                  onClick={() => setPaymentDialogOpen(true)} // Open dialog on click
                  className="md:text-[15px] font-medium md:font-semibold text-[10px] text-red-600 h-6 md:h-8 border-2 border-red-600 rounded-full px-2 md:px-4 hover:text-white hover:bg-red-600 transition duration-300 shadow-xl"
                >
                  Pay to Proceed
                </button>
              ) : status === "expired_reservation" ? (
                <button
                  onClick={ReEnroll}
                  className="md:text-[15px] font-medium md:font-semibold text-[10px] text-accent h-6 md:h-8 border-2 border-accent rounded-full px-2 md:px-4 hover:text-white hover:bg-accent transition duration-300 shadow-xl"
                >
                  Enroll Again
                </button>
              ) : null}
            </div>
          </div>

          <h2
            className={`font-poppins font-medium text-lg md:text-xl mb-2 ${
              status === "active" ? "" : "opacity-30"
            } `}
          >
            {title}
          </h2>

          {status == "active" ? (
            <div className="flex items-center gap-6">
              <div className="flex-1 bg-gray-200 rounded-full h-2 md:h-4">
                <div
                  className="bg-accent h-2 md:h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm md:text-lg">
                <span className="text-black">{progress}/</span>
                {lessons} Lessons
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div className="flex-1 bg-gray-200 rounded-full h-2 md:h-4"></div>
              <p className="text-gray-500 text-xs sm:text-sm md:text-lg">
                <span
                  className={`text-black ${
                    status === "active" ? "" : "opacity-30"
                  }`}
                >
                  0/
                </span>
                {lessons} Lessons
              </p>
            </div>
          )}
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
