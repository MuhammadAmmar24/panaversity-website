"use client";
import { processPayment } from "@/src/app/actions/payment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CourseCardProps } from "../../types/courses";
import PaymentDialog from "../Dialog/PaynowDialog";
import { HiMiniCalendar } from "react-icons/hi2";
import { TbClockHour3 } from "react-icons/tb";
import { formatTimeToUserGMT } from "@/src/lib/FormatTimeToGMT";
import { CardButton } from "./CardButton";
import { toast } from "sonner";
import CourseIcons from "./CourseIcon";
import { PaymentRequest } from "@/src/lib/schemas/payment";

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  progress,
  classes,
  status,
  student_course_id,
  profile,
  course_code,
  course_section,
  course_price,
}) => {
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const router = useRouter();

  const ReEnroll = () => {
    router.push(`programs/flagship-program/${course_code}`);
  };

  const handleEnroll = async (paymentMethod: string) => {
    try {
      const payload: PaymentRequest = {
        student_course_id: student_course_id,
        section_no: course_section?.id as number,
        package_id: course_price?.package_id as number,
        student_id: profile!.id,
        student_name: profile!.full_name,
        student_email: profile!.email,
        vendor_type: paymentMethod,
      };

      const result: any = await processPayment(payload);

      if (result.type === "success") {
        let url;
        if (paymentMethod === "stripe" && result.data.stripe?.stripe_url) {
          url = result.data.stripe?.stripe_url;
        } else if (paymentMethod === "blinq" && result.data.blinq?.pay_url) {
          url = result.data.blinq?.pay_url;
        }

        // const url = result?.data?.stripe?.stripe_url;
        if (url) {
          window.location.href = url;
        } else {
          toast.error("Something went wrong, please try again.");
        }
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  const zoomLink = course_section?.class_time_slots?.[0]?.zoom_link || "/";
  const githubLink = course_section?.class_time_slots?.[0]?.github_link || "/";
  const youtubeLink =
    course_section?.class_time_slots?.[0]?.lectures_playlist || "/";

  const progressPercentage = (progress / classes) * 100;

  return (
    <section className="relative">
      <div className="flex flex-col gap-4 overflow-hidden rounded-2xl border shadow-lg md:gap-6">
        <div className="flex flex-col justify-center gap-4 border-b bg-gray-100 px-4 py-4 sm:px-6 md:py-6 lg:px-8">
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

            <div className="text-[10px] font-medium sm:text-xs sm:font-semibold lg:text-xs lg:font-semibold">
              {status === "active" ? (
                <CardButton status="active">Paid</CardButton>
              ) : status === "reserved_seat" ? (
                <CardButton
                  status="reserved_seat"
                  onClick={() => setPaymentDialogOpen(true)}
                  tooltipContent="Click to pay"
                >
                  Pay to Proceed
                </CardButton>
              ) : status === "expired_reservation" ? (
                <CardButton
                  status="expired_reservation"
                  onClick={ReEnroll}
                  tooltipContent="Reservation expired. Click to re-enroll again"
                >
                  Enroll Again
                </CardButton>
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
        </div>

        <div className="flex flex-col justify-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div
              className={`text-[10px] font-medium text-gray-700 sm:text-sm ${
                status === "active" ? "text-gray-500" : "opacity-30"
              }`}
            >
              Section:{" "}
              <span className="font-bold text-black underline decoration-accent decoration-1 underline-offset-2">
                {course_section?.section_name}
              </span>
            </div>
            <div
              className={`text-[10px] font-medium text-gray-700 sm:text-sm ${
                status === "active" ? "text-gray-500" : "opacity-30"
              }`}
            >
              Language:{" "}
              <span className="font-bold text-black underline decoration-accent decoration-1 underline-offset-2">
                {typeof course_section?.language === "string"
                  ? course_section.language
                  : course_section?.language?.language_name}
              </span>
            </div>
          </div>

          {status == "active" ? (
            <div className="flex flex-col items-end gap-2">
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 sm:text-sm">
                <span className="text-black">{progress}/</span>
                {classes} Classes
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-end gap-2">
              <div className="h-2 w-full rounded-full bg-gray-200"></div>
              <p className="text-xs sm:text-sm">
                <span className="text-black opacity-30">0/14 Classes</span>
              </p>
            </div>
          )}

          <div
            className={`flex max-h-[3rem] flex-col gap-2 overflow-y-auto px-4 ${status === "active" ? "text-gray-500" : "opacity-30"}`}
          >
            {course_section?.class_time_slots?.map((slot, index) => (
              <div
                key={index}
                className="flex justify-between text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2">
                  <HiMiniCalendar className="text-sm md:text-base" />
                  <span>{slot.time_slot_day.slice(0, 3)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TbClockHour3 className="text-sm md:text-base" />
                  <span>{formatTimeToUserGMT(slot.slot_start_time)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t bg-gray-100 px-4 sm:px-6 lg:px-8">
          <CourseIcons
            status={status || ""}
            youtubeLink={youtubeLink}
            githubLink={githubLink}
            zoomLink={zoomLink}
          />
        </div>
      </div>

      <PaymentDialog
        open={isPaymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        onConfirm={(paymentMethod) => handleEnroll(paymentMethod)}
      />
    </section>
  );
};

export default CourseCard;
