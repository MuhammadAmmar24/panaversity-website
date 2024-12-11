"use client";
import { processPayment } from "@/src/app/actions/payment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CourseCardProps } from "../../types/types";
import PaymentDialog from "../Dialog/PaynowDialog";
import { FaYoutube, FaGithub, FaBullhorn } from "react-icons/fa";
import Link from "next/link";
import { SiZoom } from "react-icons/si";
import { HiMiniCalendar } from "react-icons/hi2";
import { TbClockHour3 } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";
import { formatTimeToUserGMT } from "@/src/lib/FormatTimeToGMT";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";
import { cn } from "@/src/lib/utils";
import { CardButton } from "./CardButton";
import { toast } from "sonner";

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  progress,
  classes,
  status,
  student_course_id,
  profile,
  course_code,
  course_section,
  course_price
}) => {
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const router = useRouter();

  const ReEnroll = () => {
    router.push(`programs/flagship-program/${course_code}`);
  };

  const handleEnroll = async (paymentMethod: string) => {
    try {
      const payload: any = {
        batch_no: course_section?.id,
        package_id: course_price?.package_id,
        student_course_id: student_course_id,
        student_id: profile?.id,
        vendor_type: paymentMethod,
      };

      const result: any = await processPayment(payload);

      if (result.type === "success") {
        const url = result?.data?.stripe?.stripe_url;
        if (url) {
          window.location.href = url;
        } else {
          console.error("Stripe URL not found.");
          toast.error("Something went wrong, please try again.");
        }
      } else {
        console.error("API Error:", result.message);
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  const zoomLink = course_section?.class_time_slots?.[0]?.zoom_link || "/";
  const githubLink = course_section?.class_time_slots?.[0]?.github_link || "/";
  const youtubeLink = course_section?.class_time_slots?.[0]?.lectures_playlist || "/";

  const icons = [
    {
      component: <FaYoutube />,
      link: youtubeLink,
      name: "YouTube",
      className: `text-red-600 text-xl mobileM:text-2xl sm:text-3xl md:text-4xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <FaGithub />,
      link: githubLink,
      name: "GitHub",
      className: `text-gray-800 text-base mobileM:text-xl sm:text-2xl md:text-3xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <SiZoom />,
      link: zoomLink,
      name: "Zoom",
      className: `text-blue-500 text-3xl mobileM:text-4xl sm:text-5xl md:text-6xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <FaBullhorn />,
      link: "/",
      name: "Announcements",
      className: `text-gray-800 text-base mobileM:text-xl sm:text-2xl md:text-3xl hover:scale-105 transition-all duration-300 ease-in-out ${status === "active" ? "" : "opacity-30 pointer-events-none cursor-not-allowed"}`,
    },
    {
      component: <RiRobot2Line />,
      link: "/",
      name: "Student Bot",
      className: `text-gray-300 text-base mobileM:text-xl sm:text-2xl md:text-3xl pointer-events-none cursor-not-allowed`,
    },
  ];

  const progressPercentage = (progress / classes) * 100;

  return (
    <section className="relative">
      <div className="flex flex-col gap-4 md:gap-6 shadow-lg rounded-2xl border overflow-hidden">

        <div className="px-4 py-4 sm:px-6 md:py-6 lg:px-8 flex flex-col justify-center gap-4 border-b bg-gray-100">
          <div className="flex items-center justify-between">
            <h6
              className={`text-[10px] font-medium text-gray-700 sm:text-sm ${status === "active" ? "text-gray-500" : "opacity-30"
                }`}
            >
              Course Code:{" "}
              <span className="font-bold text-black underline decoration-accent decoration-1 underline-offset-2">
                {course_code}
              </span>
            </h6>

            <div className="ml-auto text-[10px] font-medium sm:text-xs sm:font-semibold tablet_lg:text-[10px] tablet_lg:font-medium lg:text-xs lg:font-semibold">
              {status === "active" ? (
                <CardButton status="active">
                  Paid
                </CardButton>
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
            className={`font-poppins truncate font-medium md:text-xl ${status === "active" ? "text-textPrimary/90" : "opacity-30"
              } `}
          >
            {title}
          </h2>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 flex flex-col justify-center gap-4">
          <div className="flex justify-between items-center">
            <div
              className={`text-[10px] font-medium text-gray-700 sm:text-sm ${status === "active" ? "text-gray-500" : "opacity-30"
                }`}
            >
              Section:{" "}
              <span className="font-bold text-black underline decoration-accent decoration-1 underline-offset-2">
                {course_section?.section_name}
              </span>
            </div>
            <div
              className={`text-[10px] font-medium text-gray-700 sm:text-sm ${status === "active" ? "text-gray-500" : "opacity-30"
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

          <div className={`flex flex-col gap-2 px-4 max-h-[3rem] overflow-y-auto ${status === "active" ? "text-gray-500" : "opacity-30"}`}>
            {course_section?.class_time_slots?.map((slot, index) => (
              <div key={index} className="flex justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <HiMiniCalendar className="text-sm md:text-base" />
                  <span>{slot.time_slot_day.slice(0, 3)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TbClockHour3 className="text-sm md:text-base" />
                  <span>
                    {formatTimeToUserGMT(slot.slot_start_time)}
                    {/* - {formatTimeToUserGMT(slot.slot_end_time)}  */}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between border-t bg-gray-100">
          <TooltipProvider>
            {icons.map((icon, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={icon.link}
                    target="_blank"
                    className={icon.className}
                  >
                    {icon.component}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className={cn(
                    "mb-2 font-medium",
                    status === "active" ? "" : "hidden"
                  )}
                >
                  {icon.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
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