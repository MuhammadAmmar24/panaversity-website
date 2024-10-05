
"use client"
import React, { useState } from "react";
import { CiMobile1 } from "react-icons/ci";
import { CourseCardProps } from "../../types/types";
import { processPayment } from "@/src/actions/payment";
import { checkUserVerification } from "@/src/actions/profile";

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  progress,
  lessons,
  status,
}) => {

  
  const [profile, setProfile] = useState<ProfileData | null>(null);
  
  // Function to handle enrollment and payment processing
  const handleEnroll = async () => {

  
      try {
        const user_data = await checkUserVerification();
  
        setProfile(user_data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }


    const payload: any = {
      batch_no: 1,
      package_id: 1,
      student_course_id: 7,
      student_id: profile?.id, // Replace with actual student ID if available
      vendor_type: "STRIPE", // Payment gateway type
      // Optional lab_time_slot_id, uncomment or remove based on requirements
    };

    // Log the payload for debugging purposes
    console.log("Enrollment Payload:", payload);

    try {
      const result: any = await processPayment(payload); // Call the payment processing API
      console.log("Response", result);

      const url = result?.data?.stripe?.stripe_url; // Get the Stripe payment URL if available

      if (result.type === "success") {
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
      {/* Section heading */}
      <h1 className="font-medium text-start text-xl md:text-2xl font-poppins mb-4">
        Enrolled Courses
      </h1>

      {/* Course card container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        {/* Individual course card */}
        <article
          className={`bg-white ${
            status ? "bg-white" : "opacity-40 "
          } rounded-lg shadow-xl px-4 sm:px-8 py-5`}
        >
          {/* Icon row */}
          <div className="flex justify-between items-center mb-6">
            <CiMobile1 className="text-4xl bg-gray-200 rounded-full w-auto md:h-12 p-[8px]" />
          </div>

          {/* Course title */}
          <h2 className="font-poppins font-medium text-lg md:text-xl mb-2">
            {title}
          </h2>

          {/* Progress bar and lesson count */}
          {status ? (
            <div className="flex items-center gap-6">
              {/* Progress bar */}
              <div className="flex-1 bg-gray-200 rounded-full h-2 md:h-4">
                <div
                  className="bg-accent h-2 md:h-4 rounded-full"
                  style={{
                    width: `${progress}%`, // Dynamic progress width
                  }}
                ></div>
              </div>

              {/* Lesson count */}
              <p className="text-gray-500 text-xs sm:text-sm md:text-lg">
                <span className="text-black">{progress}/</span>
                {lessons} Lessons
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              {/* Empty progress bar for non-enrolled courses */}
              <div className="flex-1 bg-gray-200 rounded-full h-2 md:h-4"></div>
              <p className="text-gray-500 text-xs sm:text-sm md:text-lg">
                <span className="text-black">0/</span>
                {lessons} Lessons
              </p>
            </div>
          )}
        </article>

        {/* Payment button container */}
        <div className="absolute -right-[0px] top-[28px] xs:-right-[0px] sm:-right-[0px] md:-right-[0px] mobileM:-right-[0px] lg:left-[250px] xl:left-[450px]">
          {/* Payment button: Conditional rendering based on enrollment status */}
          {status ? (
            <button className="md:text-[15px] font-medium md:font-semibold text-[10px] text-accent h-6 md:h-8 border border-accent rounded-full px-1 py-1 md:px-2 text-white bg-accent shadow-lg">
              Payment Completed
            </button>
          ) : (
            <button
              onClick={handleEnroll} // Trigger the enrollment process
              className="md:text-[15px] font-medium md:font-semibold text-[10px] text-red-600 h-6 md:h-8 border border-red-600 rounded-full px-1 py-1 md:px-2 hover:text-white hover:bg-red-600 shadow-lg"
            >
              Pay to Proceed
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseCard;
