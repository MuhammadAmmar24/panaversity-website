"use client";
import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaExclamationCircle,
  FaCreditCard,
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { enrollNewStudentInProgramAndCourse } from "@/src/app/actions/enrollment";
import { formatTimeToUserGMT } from "@/src/lib/FormatTimeToGMT";
import { getStudentCourses } from "@/src/lib/getStudentCourses";

export default function EnrollmentSheet({
  program_id,
  profile_id,
  coursePrice,
  courseCode,
  pre_requisite,
  student_courses,
  sections,
  selected_section_name,
  isEnrolled,
  setPendingState,
}: any) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(
    selected_section_name,
  );
  const [paymentMethod, setPaymentMethod] = useState("STRIPE");
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [showReEnrollment, setShowReEnrollment] = useState(false);
  const [enrolledSection, setEnrolledSection] = useState();
  const [isAccordionOpen, setIsAccordionOpen] = useState<string | undefined>(
    "prerequisites",
  );
  const [skipped, setSkipped] = useState(false);
  const [skippedMessage, setSkippedMessage] = useState("");

  const findStudentCourse = (courseCode: string) =>
    student_courses.find(
      (course: any) => course?.course_code?.trim() === courseCode.trim(),
    );

  const getCourseStatus = (studentCourse: any, courseCode: string) => {
    if (
      !studentCourse ||
      studentCourse.student_course_status === "expired_reservation"
    ) {
      return {
        statusText: "Not Enrolled",
        statusClass: "text-red-600",
        linkHref: `/programs/flagship-program/${courseCode.trim()}`,
      };
    }

    if (studentCourse.is_graduated) {
      return {
        statusText: "Completed",
        statusClass: "text-green-500",
        linkHref: "/dashboard",
      };
    }

    return {
      statusText: "In Progress",
      statusClass: "text-yellow-500",
      linkHref: "/dashboard",
    };
  };

  const shouldDisableForm = () => {
    // If not enrolled and there are prerequisites that haven't been skipped
    if (!isEnrolled && !skipped && pre_requisite.length > 0) {
      return true;
    }

    // If enrolled but not showing re-enrollment form
    if (isEnrolled && !showReEnrollment) {
      return true;
    }

    // If enrolled, showing re-enrollment form, but prerequisites haven't been skipped
    if (
      isEnrolled &&
      showReEnrollment &&
      !skipped &&
      pre_requisite.length > 0
    ) {
      return true;
    }

    // If not enrolled and no prerequisites
    if (!isEnrolled && pre_requisite.length === 0) {
      return false;
    }

    return false;
  };

  const getNotCompletedPreReqs = () => {
    return (
      pre_requisite?.filter((pre_req: any) => {
        const studentCourse = findStudentCourse(pre_req.course_code);

        return (
          !studentCourse ||
          studentCourse.student_course_status === "expired_reservation"
        );
      }) || []
    );
  };

  useEffect(() => {

  

    const enrolled_section = findStudentCourse(courseCode)
    setEnrolledSection(enrolled_section?.section?.section_name)



    const notCompletedPreReqs = getNotCompletedPreReqs();

    if (notCompletedPreReqs.length == 0) {
      setSkipped(true);
    }

    // Only set skip message if there are incomplete prerequisites
    if (notCompletedPreReqs.length > 0) {
      const message =
        notCompletedPreReqs.length === 1
          ? "Skip pre-requisite course"
          : "Skip all pre-requisite courses";

      if (!skipped) {
        setSkippedMessage(message);
      } else {
        setSkippedMessage(
          `You skipped ${notCompletedPreReqs.length === 1 ? "pre-requisite course" : "all pre-requisite courses"}`,
        );
      }
    } else {
      setSkippedMessage("");
    }
  }, [pre_requisite, student_courses, skipped]);

  const handleSectionSelect = (sectionName: string) => {
    const section = sections.find(
      (sec: any) => sec.section_name === sectionName,
    );
    setSelectedSection(section);
  };

  const handleEnroll = async () => {
    if (!selectedSection || !paymentMethod) {
      setEnrollmentError("Please select a section and payment method.");
      return;
    }
  
    const payload = {
      student_id: profile_id,
      program_id,
      section_id: selectedSection.id,
      vendor_type: paymentMethod,
      package_id: coursePrice.package_id,
      course_id: selectedSection.course_id,
    };
  
    setIsPending(true)
    setPendingState(true);
  
    try {
      const result = await enrollNewStudentInProgramAndCourse(payload);
      
      if (result.type === "success") {
        const url = result.data?.fee_voucher?.stripe?.stripe_url;
        if (url) {
          toast.success("Your seat is reserved! Make your payment soon to confirm your enrollment.");
          setTimeout(() => {
            router.push(url);
          }, 3000);
        } else {
          toast.success("Your seat is reserved! Make your payment soon to confirm your enrollment.");
          router.push("/dashboard");
        }
      } else {
        setEnrollmentError(result.message || "An error occurred during enrollment.");
      }
    } catch (error) {
      console.error("Unexpected error during enrollment:", error);
      setEnrollmentError("Failed to enroll student. Please try again later.");
    } finally {
      setIsPending(false);
      setPendingState(false);
    }
  };

  const handleSkip = () => {
    setSkipped(true);
    setIsAccordionOpen("");
  };

  const renderPrerequisites = () => (
    <div className="mx-auto max-w-full rounded-3xl p-4 sm:p-5">
      <Accordion
        type="single"
        collapsible
        value={isAccordionOpen}
        onValueChange={setIsAccordionOpen}
      >
        <AccordionItem value="prerequisites">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">
            Prerequisites
          </AccordionTrigger>
          <AccordionContent>
            {pre_requisite.length > 0 ? (
              <div>
                {pre_requisite.map((pre_req: any, index: any) => {
                  const { statusText, statusClass, linkHref } = getCourseStatus(
                    findStudentCourse(pre_req.course_code),
                    pre_req.course_code,
                  );

                  return (
                    <div
                      className="mb-3 rounded-lg border-2 px-4 py-1 transition-all duration-300 ease-in-out hover:-translate-y-[1px] hover:shadow-md"
                      key={index}
                    >
                      <Link href={linkHref}>
                        <div className="text-base font-normal leading-relaxed text-textPrimary/90">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-col items-start justify-center">
                              <span className="underline decoration-accent decoration-2">
                                {pre_req.course_code}
                              </span>
                              <span className="line-clamp-1 text-[0.6rem] font-normal text-textSecondary mobileM:text-[0.8rem] sm:text-[0.9rem]">
                                {pre_req.course_name}
                              </span>
                            </div>
                            <span
                              className={`text-[0.6rem] mobileM:text-[0.8rem] sm:text-[1rem] ${statusClass}`}
                            >
                              {statusText}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[0.9rem] font-normal leading-relaxed text-muted-foreground">
                There are no pre-requisites for this course.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {getNotCompletedPreReqs().length > 0 && (
        <div className="mt-3 flex items-center gap-3 lg:justify-between">
          {!skipped && (
            <Button
              onClick={handleSkip}
              className="rounded-lg px-6 py-0.5 text-sm transition-all duration-300 ease-in-out hover:bg-gray-950/80"
            >
              Skip
            </Button>
          )}
          <span className="text-[0.8rem] text-red-500 mobileM:text-[0.9rem] sm:text-[1rem]">
            {skippedMessage}
          </span>
        </div>
      )}
    </div>
  );

  const renderEnrollmentForm = () => (
    <CardContent
      className={`space-y-8 p-4 mobileM:p-4 xs:p-4 sm:p-5 md:p-4 lg:p-5 ${shouldDisableForm() ? "opacity-50" : "opacity-100"}`}
    >
      <div>
        <label className="mb-2 block text-lg font-medium">Section</label>
        <Select
          value={selectedSection?.section_name}
          onValueChange={handleSectionSelect}
          disabled={shouldDisableForm() || isPending}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((sec: any) => (
              <SelectItem key={sec.section_name} value={sec.section_name}>
                {sec.section_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedSection && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              {selectedSection.section_name}
            </h3>
            <div className="flex gap-4">
              <Badge variant="outline">{selectedSection.section_code}</Badge>
              <Badge variant="outline">{selectedSection.language}</Badge>
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between px-1">
            {/* Available Seats */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <FaUsers className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Available Seats</p>
              </div>
              <p className="text-sm font-medium">
                {selectedSection.total_seats - selectedSection.booked_seats} of{" "}
                {selectedSection.total_seats}
              </p>
            </div>

            {/* Class Start Date */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Class Start Date
                </p>
              </div>
              <p className="text-sm font-medium">
                {new Date(selectedSection.start_date!).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  },
                )}
              </p>
            </div>
          </div>

          <Separator />
          <div className="space-y-2">
            <h4 className="mb-3 text-base font-medium">Class Schedule</h4>
            <div className="grid gap-0">
              {selectedSection?.class_time_slots?.map(
                (slot: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-md bg-muted/20 p-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="mb-1 flex items-center gap-2 sm:mb-0">
                      <FaClock className="h-4 w-4 capitalize text-muted-foreground" />
                      <span>{slot.time_slot_day.slice(0, 3)}</span>
                    </div>
                    <span className="text-muted-foreground sm:mx-2">
                      {formatTimeToUserGMT(slot.slot_start_time)} -{" "}
                      {formatTimeToUserGMT(slot.slot_end_time)}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="mb-2 block text-lg font-medium">Payment Method</label>
        <Select
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          disabled={shouldDisableForm() || isPending}
        >
          <SelectTrigger>
            <SelectValue>
              <div className="flex items-center gap-2">
                <FaCreditCard className="h-4 w-4" />
                Stripe
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="STRIPE">
              <div className="flex items-center gap-2">
                <FaCreditCard className="h-4 w-4" />
                Stripe
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {enrollmentError && (
        <Alert
          variant="destructive"
          className="flex items-center gap-2 border-2"
        >
          <div>
            <FaExclamationCircle className="h-4 w-4" />
          </div>
          <div>
            <AlertDescription>{enrollmentError}</AlertDescription>
          </div>
        </Alert>
      )}

      <Button
        className={`flex w-full items-center justify-center rounded-lg p-3 font-semibold transition-all duration-300 ease-in-out ${
          shouldDisableForm() || isPending
            ? "cursor-not-allowed bg-gray-300 text-gray-500 hover:bg-gray-300"
            : "bg-accent text-white hover:bg-[#18c781]"
        }`}
        size="lg"
        disabled={shouldDisableForm() || isPending}
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
      </Button>
    </CardContent>
  );

  return (
    <div className="mx-auto max-w-3xl bg-background">
      <Card className="rounded-none border-0 bg-background shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl mobileM:text-3xl">
            Course Enrollment
          </CardTitle>
          <CardDescription>
            {isEnrolled
              ? showReEnrollment
                ? "Select your preferred section and complete re-enrollment"
                : ``
              : "Select your preferred section and complete enrollment"}
          </CardDescription>
        </CardHeader>
        {isEnrolled && !showReEnrollment && (
          <CardContent className="space-y-4 px-4">
            <div className="rounded-lg bg-gray-100 p-4">
              <p className="text-md font-medium xs:text-lg">
                You’re already enrolled in the{" "}
                <span className="underline decoration-accent decoration-2 underline-offset-4">
                  {enrolledSection}
                </span>{" "}
                section of this course.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 transition-all duration-300 ease-in-out hover:border-accent hover:bg-transparent"
                onClick={() => setShowReEnrollment(true)}
              >
                Enroll Again
              </Button>
              <Button
                className="flex-1 bg-accent text-white transition-all duration-300 ease-in-out hover:bg-[#18c781]"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        )}
        {((isEnrolled && showReEnrollment) || !isEnrolled) &&
          renderPrerequisites()}
        {renderEnrollmentForm()}
      </Card>
    </div>
  );
}
