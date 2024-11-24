"use client";

import GetEnrolled from "@/src/components/courses/GetEnrolled";
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
import { CourseSheetProps } from "@/src/types/courseEnrollment";
import { DialogTitle } from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { GrLanguage } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { SlCalender } from "react-icons/sl";

const CourseSheet: React.FC<CourseSheetProps> = ({
  is_active,
  program_id,
  profile_id,
  isEnrolled,
  coursePrice,
  courseName,
  isLoggedIn,
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
    return student_courses?.some(course => course.section?.id === sectionId);
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
    (currentPage + 1) * sectionsPerPage
  );


  const [selectedSection, setSelectedSection] = useState(
    sections && sections.length > 0 ? visibleSections[0] : null
  );

  
  const showArrows = sections.length > 3;

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleClick = () => {
    if (!isLoggedIn) {
      // Redirect to register page if not logged in
      localStorage.setItem("previousPath", window.location.pathname);
      router.push("/register");
    } else if (isStudentEnrolledInSection(selectedSection?.id!)) {
      // If the user is already enrolled, navigate to dashboard
      router.push("/dashboard");
    } else {
      // Otherwise, open the enrollment sheet
      setOpen(true);
    }
  };
  

  const getEnrollButtonText = (sectionId: number) => {
    if (!is_active) return "Registration Closed";
    return isStudentEnrolledInSection(sectionId) ? "Already Enrolled" : "Enroll Now";
  };

  useEffect(() => {
    const handleResize = () => {
      setSheetSide(window.innerWidth >= 1024 ? "right" : "bottom");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!sections || sections.length === 0) {
    return (
      <Card className="w-full items-end px-0 sm:px-2 md:px-0 lg:px-2">
        <CardContent className="p-4 mobileM:p-4 xs:p-6 sm:p-4 md:p-4 lg:p-4 xl:px-4 xl:py-0 xl:pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Price:</span>
            <span className="text-2xl font-bold">
              {coursePrice.currency.toUpperCase()} {coursePrice.amount}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mobileM:p-4 mobileM:pt-0 xs:p-6 xs:pt-0 sm:p-4 sm:pt-0 md:p-4 md:pt-0 lg:p-4 lg:pt-0 xl:p-4 xl:pt-0">
          <button
            onClick={handleClick}
            className={`flex w-full items-center justify-center rounded-md bg-accent py-3 font-semibold text-white transition duration-300 ${is_active
                ? "hover:bg-emerald-500"
                : "cursor-not-allowed bg-gray-400"
              }`}
            disabled={!is_active}
          >
            {is_active ? "Enroll Now" : "Registration Closed"}
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
      <Card className="w-full items-end px-0 sm:px-2 md:px-0 lg:px-2">
        <CardContent className="p-4 mobileM:p-4 xs:p-6 sm:p-4 md:p-4 lg:p-4 xl:px-4 xl:py-0 xl:pt-4">
          <p className="text-xs mb-1 font-semibold text-primary">
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
            <div className="flex items-start justify-center">
              {showArrows && (<button
                onClick={handlePrevPage}
                className={`rounded-full p-2 text-primary hover:text-accent-foreground ${currentPage === 0 ? "opacity-25" : ""
                  }`}
                aria-label="Previous sections"
                disabled={currentPage === 0}
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>)}
              <TabsList
                className={`mb-1 grid w-full overflow-auto ${visibleSections.length === 1
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
              {showArrows && (<button
                onClick={handleNextPage}
                className={`rounded-full p-2 text-primary  hover:text-accent-foreground ${currentPage === totalPages - 1
                    ? "opacity-25 "
                    : ""
                  }`}
                aria-label="Next sections"
                disabled={currentPage === totalPages - 1}
              >
                <FaChevronRight className="h-4 w-4" />
              </button>)}
            </div>

            {sections.map((section) => (
              <TabsContent
                key={section.id}
                value={section.id.toString()}
                className="mb-2"
              >
                <div className="space-y-2 text-sm">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs text-red-500">
                      Registration Deadline:{" "}
                      {new Date(
                        section.registration_deadline!,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 items-center justify-between">
                    <div className="col-span-2 flex items-center gap-x-2">
                      <GiTeacher className="h-4 w-4 text-muted-foreground" />
                      <span >
                        Instructor: {
                          typeof section?.class_time_slots?.[0]?.instructor === 'string'
                            ? section?.class_time_slots?.[0]?.instructor
                            : section?.class_time_slots?.[0]?.instructor?.name || 'N/A'
                        }
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
                  </div>

                  <ul className="space-y-2">
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
                  </ul>

                  <div className="flex flex-row justify-between">
                    <div className="flex items-center gap-2">
                      <SiGoogleclassroom className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Seats Booked: {section.booked_seats}/
                        {section.total_seats}
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
          is_active ? "hover:bg-emerald-500" : "cursor-not-allowed bg-gray-400"
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
        className={`w-full max-w-full overflow-y-auto p-0 ${sheetSide === "bottom" ? "h-[80vh]" : "h-full"
          } ${sheetSide === "right" ? "lg:max-w-lg" : ""}`}
      >
        <SheetHeader>
          <VisuallyHidden.Root>
            <DialogTitle>Enroll in {courseName}</DialogTitle>
            <SheetDescription>
              This enrollment dialog where you can enroll in the course
            </SheetDescription>
          </VisuallyHidden.Root>
        </SheetHeader>

        {/* Existing Enrollment Component */}
        <GetEnrolled
          program_id={program_id}
          profile_id={profile_id}
          coursePrice={coursePrice}
          pre_requisite={pre_requisite}
          student_courses={student_courses}
          sections={sections.filter(section => 
            !student_courses?.some(course => course.section?.id === section.id)
          )}
          selected_section_name={selectedSection}
          isEnrolled={isEnrolled}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CourseSheet;
