"use client";

import { courseInterest } from "@/src/app/actions/course-interest";
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
import {
  CourseSections,
  EnrollmentCardProps,
} from "@/src/types/courseEnrollment";
import { DialogTitle } from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import {
  FaChalkboardTeacher,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
} from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { toast } from "sonner";
import EnrollButton from "../ui/enrollButton";
import SectionLoadingCard from "../ui/skeletons/LoadingEnrollmentCard";
import { CourseInterestResponse } from "@/src/lib/schemas/courseInterest";
import { CourseEnrollment, GetCoursePriceResponse } from "@/src/lib/schemas/courses";

const EnrollmentCard: React.FC<EnrollmentCardProps> = ({
  is_active,
  is_offered_now,
  program_id,
  courseName,
  courseCode,
  pre_requisite,
}) => {
  const [sheetSide, setSheetSide] = useState<"bottom" | "right">("bottom");
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isEnrollPending, setIsEnrollPending] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [sectionsPerPage, setSectionsPerPage] = useState(3);
  const [profile, setProfile] = useState({
    email: "",
    id: "",
  });
  const [coursePrice, setCoursePrice] = useState<GetCoursePriceResponse>();
  const [sections, setSections] = useState<CourseSections[]>([]);
  const [studentCourseInterestes, setStudentCourseInterestes] = useState<
    null | CourseInterestResponse[]
  >([]);
  const [studentCourses, setStudentCourses] = useState<
    null | CourseEnrollment[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const handleFetch = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          courseCode: courseCode,
          isOfferedNow: is_offered_now.toString(),
        }).toString();


        const response = await fetch(`/api/course?${queryParams}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }

        const result = await response.json();

        setProfile(result.profile);

        if (result.coursePrice?.data) {
          setCoursePrice(result.coursePrice.data);
        }

        if (result.sections?.data) {
          setSections(result.sections.data);
         setSelectedSection(sections[0]);
            
        }
        if (result.courseInterests?.data) {
          setStudentCourseInterestes(result.courseInterests.data);
        }
        if (result.studentCourses?.data) {
          setStudentCourses(result.studentCourses.data);
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
        console.error("An unexpected error occurred:", err);
      } finally {
        setIsLoading(false);
      }
    };
    handleFetch();
  }, [is_offered_now, courseCode]);




  // Update sectionsPerPage based on screen width
  useEffect(() => {
    const handleResize = () => {
      setSectionsPerPage(window.innerWidth >= 640 ? 3 : 2);

      setSheetSide(window.innerWidth >= 768 ? "right" : "bottom");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(sections.length / sectionsPerPage);

  const isStudentEnrolledInSection = (sectionId: number) => {
    if (!studentCourses) return false;
    return studentCourses?.some(
      (course: any) =>
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
    currentPage,
    currentPage + sectionsPerPage,
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
    // When sections are loaded, automatically select the first available section
    if (sections.length > 0) {
      const firstVisibleSection = visibleSections[0] || sections[0];
      setSelectedSection(firstVisibleSection);
    }
  }, [sections]);



  const course = studentCourses?.find(
    (course) => course.course_code === courseCode,
  );

  const isEnrolled =
    !!course && course.student_course_status != "expired_reservation";

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

  // Auth check function
  const checkAuthStatus = async (): Promise<{
    isAuthenticated: boolean;
  } | null> => {
    setIsEnrollPending(true);
    try {
      const response = await fetch("/api/", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Auth check failed");
      }

      return await response.json(); // Returns { isAuthenticated: boolean }
    } catch (error) {
      console.error("Auth check error:", error);
      return null;
    } finally {
      setIsEnrollPending(false);
    }
  };

  // Handler for "Enroll Now" button
  const handleClickEnroll = async () => {
    const authStatus = await checkAuthStatus();

    if (!authStatus?.isAuthenticated) {
      localStorage.setItem("previousPath", window.location.pathname);
      router.push("/register");
      return;
    }

    if (isStudentEnrolledInSection(selectedSection?.id!)) {
      router.push("/dashboard");
    } else {
      setOpen(true);
    }
  };

  const handleClickCourseInterest = async () => {
    const authStatus = await checkAuthStatus();

    if (!authStatus?.isAuthenticated) {
      localStorage.setItem("previousPath", window.location.pathname);
      router.push("/register");
      return;
    }

    if (isStudentEnrolledInSection(selectedSection?.id!)) {
      router.push("/dashboard");
      return;
    }

    setIsEnrollPending(true);

    try {
      // Check if the user already has an interest for this course
      const existingInterest = studentCourseInterestes?.find(
        (interest: any) => interest.course_code === courseCode,
      );

      if (existingInterest) {
        // Show a success toast if already interested
        toast.success("You have already expressed interest in this course.");
        setIsEnrollPending(false);
        return;
      }

      // Determine interest type based on the course state
      const interest: "wait_list" | "wish_list" | "info_request" =
        !is_offered_now
          ? "wish_list"
          : sections.length === 0
            ? "wait_list"
            : "info_request";

      const payload = {
        user_id: profile?.id,
        user_email: profile?.email,
        course_code: courseCode,
        interest_type: interest,
      };
      // Make the POST API call for course interest
      const result = await courseInterest(payload);

      if (result.type === "success") {
        toast.success(result.message);
      } else {
        toast.error("Failed to record your interest. Please try again");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsEnrollPending(false);
    }
  };

  if (isLoading) {
    return <SectionLoadingCard />;
  }

  if (!is_offered_now || sections.length === 0) {
    return (
      <Card className="w-full items-end px-0 sm:px-2 md:px-0 lg:px-2">
        <CardContent className="p-4 mobileM:p-4 xs:p-6 sm:p-4 md:p-4 lg:p-4 xl:px-4 xl:py-0 xl:pt-4">
          <div className="-mb-2 flex items-center justify-between xl:mb-2">
            <span className="text-lg font-medium">Price:</span>
            <span className="text-2xl font-bold">
              {coursePrice?.currency.toUpperCase()} {coursePrice?.amount}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mobileM:p-4 mobileM:pt-0 xs:p-4 xs:pt-0 sm:p-4 sm:pt-0 md:p-4 md:pt-0 lg:p-4 lg:pt-0 xl:p-4 xl:pt-0">
          <EnrollButton
            isOfferedNow={is_offered_now}
            isActive={is_active}
            sections={sections}
            handleClick={handleClickCourseInterest}
            isStudentEnrolledInSection={isStudentEnrolledInSection}
            isEnrollPending={isEnrollPending}
          />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        if (!isPending) {
          isOpen ? setOpen(true) : setOpen(false);
        }
      }}
    >
      <Card className="w-full items-end px-0 ssm:max-w-[30em] sm:w-full sm:px-2 md:px-0 lg:px-0">
        <CardContent className="-mb-3 p-4 mobileM:p-4 xs:p-6 sm:p-4 md:p-4 lg:p-4 xl:mb-2 xl:px-4 xl:py-0 xl:pt-4">
          <p className="mb-1 text-xs font-semibold text-primary">
            Available Sections:
          </p>
          <Tabs
            defaultValue={visibleSections[0].id.toString()}
            onValueChange={(value: any) =>
              setSelectedSection(
                sections.find(
                  (section: any) => section.id.toString() === value,
                ) || sections[0],
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
                      : "grid-cols-2 sm:grid-cols-3"
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

            {sections.map((section: any) => (
              <TabsContent key={section.id} value={section.id.toString()}>
                <div className="space-y-2 text-sm">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-semibold text-primary">
                      Section Classes Schedule:{" "}
                    </span>
                  </div>

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
                            (slot: any) => slot.time_slot_day === day,
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
                                  (slot: any) =>
                                    slot.time_slot_day === selectedDay,
                                )
                                ?.time_slot_day.slice(0, 3) || ""}{" "}
                              {formatTimeToUserGMT(
                                selectedSection?.class_time_slots?.find(
                                  (slot: any) =>
                                    slot.time_slot_day === selectedDay,
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
                                  (slot: any) =>
                                    slot.time_slot_day === selectedDay,
                                )?.slot_start_time || "00:00",
                                selectedSection?.class_time_slots?.find(
                                  (slot: any) =>
                                    slot.time_slot_day === selectedDay,
                                )?.slot_end_time || "00:00",
                              ).toFixed(1)}{" "}
                              hrs
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 items-center">
                          {/* Instructor */}
                          <div className="col-span-2 flex items-center gap-x-2">
                            <FaChalkboardTeacher className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {selectedDay
                                ? selectedSection?.class_time_slots?.find(
                                    (slot: any) =>
                                      slot.time_slot_day === selectedDay,
                                  )?.instructor
                                  ? typeof selectedSection?.class_time_slots?.find(
                                      (slot: any) =>
                                        slot.time_slot_day === selectedDay,
                                    )?.instructor === "string"
                                    ? selectedSection?.class_time_slots?.find(
                                        (slot: any) =>
                                          slot.time_slot_day === selectedDay,
                                      )?.instructor
                                    : (
                                        selectedSection?.class_time_slots?.find(
                                          (slot: any) =>
                                            slot.time_slot_day === selectedDay,
                                        )?.instructor as any
                                      )?.name
                                  : "N/A"
                                : "N/A"}
                            </span>
                          </div>

                          {/* Language */}
                          <div className="col-span-1 flex items-center gap-x-2">
                            <IoLanguage className="h-4 w-4 text-muted-foreground" />
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

                  <div className="flex flex-col items-start justify-between gap-y-2 pt-1 mobileM:flex-row mobileM:items-center md:flex-col md:items-start tablet_lg:flex-row tablet_lg:items-center lg:flex-row">
                    {/* Deadline  */}
                    <div className="flex items-center gap-x-2">
                      <BsClock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Closes on:{" "}
                        <span className="font-semibold text-red-600">
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
                    <div className="flex items-center gap-x-2">
                      <FaUsers className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Seats Left:{" "}
                        <span className="font-semibold text-red-600">
                          {section.total_seats - section.booked_seats}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Price:</span>
                    <span className="text-2xl font-bold">
                      {coursePrice?.currency.toUpperCase()} {coursePrice?.amount}
                    </span>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="p-4 pt-0 mobileM:p-4 mobileM:pt-0 xs:p-6 xs:pt-0 sm:p-4 sm:pt-0 md:p-4 md:pt-0 lg:p-4 lg:pt-0 xl:p-4 xl:pt-0">
          <EnrollButton
            isOfferedNow={is_offered_now}
            isActive={is_active}
            sections={sections}
            selectedSectionId={selectedSection?.id}
            handleClick={handleClickEnroll}
            isStudentEnrolledInSection={isStudentEnrolledInSection}
            isEnrollPending={isEnrollPending}
          />
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
          profile_id={profile?.id}
          coursePrice={coursePrice}
          courseCode={courseCode}
          pre_requisite={pre_requisite}
          student_courses={studentCourses}
          sections={sections.filter(
            (section: any) =>
              !studentCourses?.some(
                (course: any) =>
                  course.section?.id === section.id &&
                  course.student_course_status !== "expired_reservation",
              ),
          )}
          selected_section_name={selectedSection}
          isEnrolled={isEnrolled}
          setPendingState={setIsPending}
        />
      </SheetContent>
    </Sheet>
  );
};

export default EnrollmentCard;
