"use client";

import EnrollmentSheet from "@/src/components/courses/EnrollmentSheet";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/src/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { formatTimeToUserGMT } from "@/src/lib/FormatTimeToGMT";
import { getTimeDifference } from "@/src/lib/getDuration";
import { EnrollmentCardProps } from "@/src/types/courseEnrollment";
import { DialogTitle } from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { GrLanguage } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";

const EnrollmentCard: React.FC<EnrollmentCardProps> = ({
  is_active,
  program_id,
  profile_id,
  isEnrolled,
  coursePrice,
  courseName,
  courseCode,
  pre_requisite,
  student_courses,
  sections,
}) => {

  const [sheetSide, setSheetSide] = useState<"bottom" | "right">("bottom");
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const sectionsPerPage = 3;
  const totalPages = Math.ceil(sections.length / sectionsPerPage);
  const router = useRouter();

  const isStudentEnrolledInSection = (sectionId: number) => {
    return student_courses?.some(
      (course) =>
        course.section?.id === sectionId &&
        course.student_course_status !== "expired_reservation",
    );
  };

  const sortedSections = [...sections].sort((a, b) => {
    const isAEnrolled = isStudentEnrolledInSection(a.id);
    const isBEnrolled = isStudentEnrolledInSection(b.id);

    if (isAEnrolled && !isBEnrolled) return 1;
    if (!isAEnrolled && isBEnrolled) return -1;
    return 0;
  });

  let visibleSections = sortedSections.slice(
    currentPage * sectionsPerPage,
    (currentPage + 1) * sectionsPerPage,
  );

  const [selectedSection, setSelectedSection] = useState(
    sections && sections.length > 0 ? visibleSections[0] : null,
  );

  const [selectedDay, setSelectedDay] = useState<string | null>(() => {
    const firstAvailableDay =
      selectedSection?.class_time_slots?.[0]?.time_slot_day || null;
    return firstAvailableDay;
  });

  useEffect(() => {
    const firstAvailableDay =
      selectedSection?.class_time_slots?.[0]?.time_slot_day || null;
    setSelectedDay(firstAvailableDay);
  }, [selectedSection]);

  const showArrows = sections.length > 3;

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Auth check failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Auth check error:", error);
      return null;
    }
  };

  const handleClick = async () => {
    const isLoggedIn = await checkAuthStatus();
    if (!isLoggedIn.isAuthenticated) {
      localStorage.setItem("previousPath", window.location.pathname);
      router.push("/register");
    } else if (isStudentEnrolledInSection(selectedSection?.id!)) {
      router.push("/dashboard");
    } else {
      setOpen(true);
    }
  };

  const getEnrollButtonText = (sectionId: number) => {
    if (!is_active) return "Registration Closed";
    return isStudentEnrolledInSection(sectionId)
      ? "Already Enrolled"
      : "Enroll Now";
  };

  useEffect(() => {
    const handleResize = () => {
      setSheetSide(window.innerWidth >= 768 ? "right" : "bottom");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!sections || sections.length === 0) {
    return (
      <Card className="w-full items-end px-0  sm:px-2 md:px-0 lg:px-2">
        <CardContent className="p-4 mobileM:p-4 xs:p-6 sm:p-4 md:p-4 lg:p-4 xl:px-4 xl:py-0 xl:pt-4">
          <div className="-mb-2 flex items-center justify-between xl:mb-2">
            <span className="text-lg font-medium">Price:</span>
            <span className="text-2xl font-bold">
              {coursePrice.currency.toUpperCase()} {coursePrice.amount}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mobileM:p-4 mobileM:pt-0 xs:p-4 xs:pt-0 sm:p-4 sm:pt-0 md:p-4 md:pt-0 lg:p-4 lg:pt-0 xl:p-4 xl:pt-0">
          <button
            onClick={handleClick}
            className={`flex w-full items-center justify-center rounded-md bg-accent py-3 font-semibold text-white transition duration-300 ${
              !(sections.length == 0)
                ? "hover:bg-emerald-500"
                : "cursor-not-allowed bg-gray-400"
            }`}
            disabled={sections.length == 0}
          >
            {!(sections.length == 0) ? "Enroll Now" : "Registration Closed"}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => (isOpen ? setOpen(true) : setOpen(false))}
    >
      <Card className="w-full items-end  ssm:max-w-[30em] sm:w-full px-0  sm:px-2 md:px-0 lg:px-0">
        <CardContent className="-mb-3 p-4 mobileM:p-4 xs:p-6 sm:p-4 md:p-4 lg:p-4 xl:mb-2 xl:px-4 xl:py-0 xl:pt-4">
          <p className="mb-1 text-xs font-semibold text-primary">
            Available Sections:
          </p>
          <Tabs
            defaultValue={visibleSections[0].id.toString()}
            onValueChange={(value) =>
              setSelectedSection(
                sections.find((section) => section.id.toString() === value) ||
                  sections[0],
              )
            }
          >
            <div className="flex items-center justify-center">
              {showArrows && (
                <button
                  onClick={handlePrevPage}
                  className={`rounded-full p-2 text-primary hover:text-accent-foreground ${
                    currentPage === 0 ? "opacity-25" : ""
                  }`}
                  aria-label="Previous sections"
                  disabled={currentPage === 0}
                >
                  <FaChevronLeft className="h-4 w-4" />
                </button>
              )}
              <TabsList
                className={`grid w-full overflow-auto ${
                  visibleSections.length === 1
                    ? "grid-cols-1"
                    : visibleSections.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                }`}
              >
                {visibleSections.map((section) => (
                  <TabsTrigger key={section.id} value={section.id.toString()}>
                    {section.section_name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {showArrows && (
                <button
                  onClick={handleNextPage}
                  className={`rounded-full p-2 text-primary hover:text-accent-foreground ${
                    currentPage === totalPages - 1 ? "opacity-25" : ""
                  }`}
                  aria-label="Next sections"
                  disabled={currentPage === totalPages - 1}
                >
                  <FaChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>

            {sections.map((section) => (
              <TabsContent key={section.id} value={section.id.toString()}>
                <div className="space-y-2 text-sm">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-semibold text-primary">
                      Section Class Schedule:{" "}
                    
                    </span>
                  </div>

                  {/* <div className="grid grid-cols-3 items-center justify-between">
                    <div className="col-span-2 flex items-center gap-x-2">
                      <GiTeacher className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Instructor:{" "}
                        {selectedDay
                          ? selectedSection?.class_time_slots?.find(
                              (slot) => slot.time_slot_day === selectedDay,
                            )?.instructor
                            ? typeof selectedSection?.class_time_slots?.find(
                                (slot) => slot.time_slot_day === selectedDay,
                              )?.instructor === "string"
                              ? selectedSection?.class_time_slots?.find(
                                  (slot) => slot.time_slot_day === selectedDay,
                                )?.instructor
                              : (
                                  selectedSection?.class_time_slots?.find(
                                    (slot) =>
                                      slot.time_slot_day === selectedDay,
                                  )?.instructor as any
                                )?.name
                            : "N/A"
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GrLanguage className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {typeof section.language === "string"
                          ? section.language
                          : section.language.language_name}
                      </span>
                    </div>
                  </div> */}

                  {/* <ul className="space-y-2">
                    {section?.class_time_slots?.map((slot:any, index:any) => (
                      <li
                        key={index}
                        className="grid grid-cols-3 items-center justify-between capitalize"
                      >
                        <div className="col-span-2 flex items-center gap-x-2">
                          <SlCalender className="h-4 w-4 text-muted-foreground" />
                          {slot.time_slot_day.slice(0, 3)}{" "}
                          {formatTimeToUserGMT(slot.slot_start_time)}
                        </div>
                        <div className="col-span-1 flex items-center gap-2">
                          <BsClock className="h-4 w-4 text-muted-foreground" />
                          {getTimeDifference(
                            slot.slot_start_time,
                            slot.slot_end_time,
                          ).toFixed(0)}{" "}
                          hours
                        </div>
                      </li>
                    ))}
                  </ul> */}

                  <div className="flex flex-col justify-center space-y-1 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between rounded-t-lg bg-gray-300 px-1">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => {
                        const hasClass =
                          selectedSection?.class_time_slots?.some(
                            (slot) => slot.time_slot_day === day,
                          );

                        return (
                          <button
                            key={day}
                            className={`flex rounded-md px-2 py-1 text-sm transition-all duration-200 ${
                              hasClass
                                ? "cursor-pointer font-medium text-gray-900 hover:bg-accent"
                                : "text-gray-500"
                            } ${
                              selectedDay === day
                                ? "bg-accent font-bold text-accent"
                                : ""
                            }`}
                            onClick={() =>
                              setSelectedDay(hasClass ? day : null)
                            }
                            disabled={!hasClass}
                          >
                            {day.slice(0, 2)}
                          </button>
                        );
                      })}
                    </div>

                    {selectedDay && (
                      <div className="space-y-2 px-1 py-2 mobileM:px-3 md:px-1 tablet_lg:px-3">
                        <div className="grid grid-cols-3 items-center">
                          {/* Time with GMT */}
                          <div className="col-span-2 flex items-center gap-x-2">
                            <SlCalender className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {selectedSection?.class_time_slots
                                ?.find(
                                  (slot) => slot.time_slot_day === selectedDay,
                                )
                                ?.time_slot_day.slice(0, 3) || ""}{" "}
                              {formatTimeToUserGMT(
                                selectedSection?.class_time_slots?.find(
                                  (slot) => slot.time_slot_day === selectedDay,
                                )?.slot_start_time || "",
                              )}
                            </span>
                          </div>

                          {/* Duration  */}
                          <div className="col-span-1 flex items-center gap-x-2">
                            <BsClock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {getTimeDifference(
                                selectedSection?.class_time_slots?.find(
                                  (slot) => slot.time_slot_day === selectedDay,
                                )?.slot_start_time || "00:00",
                                selectedSection?.class_time_slots?.find(
                                  (slot) => slot.time_slot_day === selectedDay,
                                )?.slot_end_time || "00:00",
                              ).toFixed(1)}{" "}
                              hrs
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 items-center">
                          {/* Instructor */}
                          <div className="col-span-2 flex items-center gap-x-2">
                            <GiTeacher className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {selectedDay
                                ? selectedSection?.class_time_slots?.find(
                                    (slot) =>
                                      slot.time_slot_day === selectedDay,
                                  )?.instructor
                                  ? typeof selectedSection?.class_time_slots?.find(
                                      (slot) =>
                                        slot.time_slot_day === selectedDay,
                                    )?.instructor === "string"
                                    ? selectedSection?.class_time_slots?.find(
                                        (slot) =>
                                          slot.time_slot_day === selectedDay,
                                      )?.instructor
                                    : (
                                        selectedSection?.class_time_slots?.find(
                                          (slot) =>
                                            slot.time_slot_day === selectedDay,
                                        )?.instructor as any
                                      )?.name
                                  : "N/A"
                                : "N/A"}
                            </span>
                          </div>

                          {/* Language */}
                          <div className="col-span-1 flex items-center gap-x-2">
                            <GrLanguage className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {typeof section.language === "string"
                                ? section.language
                                : section.language.language_name}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col mobileM:flex-row md:flex-col tablet_lg:flex-row lg:flex-row justify-between items-start mobileM:items-center tablet_lg:items-center md:items-start gap-y-2 pt-1">
                    {/* Deadline  */}
                    <div className=" flex items-center gap-x-2">
                      <BsClock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Closes on:{" "}
                        <span className="text-red-600 font-semibold">

                        {new Date(
                          section.registration_deadline!,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                        })}
                        </span>
                      </span>
                    </div>

                    {/* Seats */}
                    <div className=" flex items-center gap-x-2">
                      <FaUsers className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Seats Left:{" "}
                        <span className="text-red-600 font-semibold">
                        {section.total_seats - section.booked_seats}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Price:</span>
                    <span className="text-2xl font-bold">
                      {coursePrice.currency.toUpperCase()} {coursePrice.amount}
                    </span>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="p-4 pt-0 mobileM:p-4 mobileM:pt-0 xs:p-6 xs:pt-0 sm:p-4 sm:pt-0 md:p-4 md:pt-0 lg:p-4 lg:pt-0 xl:p-4 xl:pt-0">
          <button
            onClick={handleClick}
            className={`flex w-full items-center justify-center rounded-md bg-accent py-3 font-semibold text-white transition duration-300 ${
              is_active
                ? "hover:bg-emerald-500"
                : "cursor-not-allowed bg-gray-400"
            }`}
            disabled={!is_active}
          >
            {getEnrollButtonText(selectedSection?.id!)}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </CardFooter>
      </Card>

      <SheetContent
        side={sheetSide}
        className={`w-full max-w-full overflow-y-auto p-0 ${
          sheetSide === "bottom" ? "h-[80vh]" : "h-full"
        } ${sheetSide === "right" ? "sm:max-w-lg" : ""}`}
      >
        <SheetHeader>
          <VisuallyHidden.Root>
            <DialogTitle>Enroll in {courseName}</DialogTitle>
            <SheetDescription>
              This enrollment dialog where you can enroll in the course
            </SheetDescription>
          </VisuallyHidden.Root>
        </SheetHeader>

        <EnrollmentSheet
          program_id={program_id}
          profile_id={profile_id}
          coursePrice={coursePrice}
          courseCode={courseCode}
          pre_requisite={pre_requisite}
          student_courses={student_courses}
          sections={sections.filter(
            (section) =>
              !student_courses?.some(
                (course) =>
                  course.section?.id === section.id &&
                  course.student_course_status !== "expired_reservation",
              ),
          )}
          selected_section_name={selectedSection}
          isEnrolled={isEnrolled}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EnrollmentCard;
