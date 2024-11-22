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
  sections = [
    {
      section_name: "UR-2D-3",
      section_code: "UR-AI-202",
      course_id: 3,
      total_seats: 130,
      booked_seats: 0,
      confirmed_seats: 0,
      start_date: "2024-09-01T00:00:00",
      end_date: "2026-12-15T00:00:00",
      registration_deadline: "2024-11-30T00:00:00",
      is_registration_open: true,
      status: "Active",
      is_virtual: true,
      is_active: true,
      id: 5,
      language: "Urdu",
      class_time_slots: [
        {
          time_slot_name: "AI-202 - UR-AI-202 - Days.Wednesday",
          is_time_slot_active: true,
          time_slot_day: "Wednesday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 1,
          section_id: 5,
          id: 9,
          time_zone: "Z",
          instructor: "Saqib",
        },
        {
          time_slot_name: "AI-202 - UR-AI-202 - Days.Thursday",
          is_time_slot_active: true,
          time_slot_day: "Thursday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 1,
          section_id: 5,
          id: 10,
          time_zone: "Z",
          instructor: "Saqib",
        },
      ],
      lab_time_slots: [
        {
          time_slot_name: "AI-202 - UR-AI-202 - Lab Days.Friday",
          is_time_slot_active: true,
          time_slot_day: "Friday",
          slot_start_time: "13:00:00",
          slot_end_time: "15:00:00",
          zoom_link: null,
          github_link: null,
          lectures_playlist: null,
          instructor_id: 1,
          section_id: 5,
          id: 5,
          time_zone: "Z",
          instructor: "Saqib",
        },
      ],
    },
    {
      section_name: "EN-2D-3",
      section_code: "EN-AI-202",
      course_id: 3,
      total_seats: 130,
      booked_seats: 0,
      confirmed_seats: 0,
      start_date: "2024-09-01T00:00:00",
      end_date: "2026-12-15T00:00:00",
      registration_deadline: "2024-11-30T00:00:00",
      is_registration_open: true,
      status: "Active",
      is_virtual: true,
      is_active: true,
      id: 6,
      language: "English",
      class_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Wednesday",
          is_time_slot_active: true,
          time_slot_day: "Wednesday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 11,
          time_zone: "Z",
          instructor: "Zeeshan",
        },
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Thursday",
          is_time_slot_active: true,
          time_slot_day: "Thursday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 12,
          time_zone: "Z",
          instructor: "Zeeshan",
        },
      ],
      lab_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Lab Days.Friday",
          is_time_slot_active: true,
          time_slot_day: "Friday",
          slot_start_time: "13:00:00",
          slot_end_time: "15:00:00",
          zoom_link: null,
          github_link: null,
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 6,
          time_zone: "Z",
          instructor: "Zeeshan",
        },
      ],
    },
    {
      section_name: "EN-2D-4",
      section_code: "EN-AI-202",
      course_id: 3,
      total_seats: 130,
      booked_seats: 0,
      confirmed_seats: 0,
      start_date: "2024-09-01T00:00:00",
      end_date: "2026-12-15T00:00:00",
      registration_deadline: "2024-11-30T00:00:00",
      is_registration_open: true,
      status: "Active",
      is_virtual: true,
      is_active: true,
      id: 7,
      language: "English",
      class_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Wednesday",
          is_time_slot_active: true,
          time_slot_day: "Wednesday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 11,
          time_zone: "Z",
          instructor: "Zeeshan",
        },
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Thursday",
          is_time_slot_active: true,
          time_slot_day: "Thursday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 12,
          time_zone: "Z",
          instructor: "Zeeshan",
        },
      ],
      lab_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Lab Days.Friday",
          is_time_slot_active: true,
          time_slot_day: "Friday",
          slot_start_time: "13:00:00",
          slot_end_time: "15:00:00",
          zoom_link: null,
          github_link: null,
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 6,
          time_zone: "Z",
          instructor: "Zeeshan",
        },
      ],
    },
    {
      section_name: "EN-2D-5",
      section_code: "EN-AI-202",
      course_id: 3,
      total_seats: 130,
      booked_seats: 0,
      confirmed_seats: 0,
      start_date: "2024-09-01T00:00:00",
      end_date: "2026-12-15T00:00:00",
      registration_deadline: "2024-11-30T00:00:00",
      is_registration_open: true,
      status: "Active",
      is_virtual: true,
      is_active: true,
      id: 8,
      language: "English",
      class_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Wednesday",
          is_time_slot_active: true,
          time_slot_day: "Wednesday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 11,
          time_zone: "Z",
          instructor: "Zeeshan",
        },
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Thursday",
          is_time_slot_active: true,
          time_slot_day: "Thursday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 12,
          time_zone: "Z",
          instructor: "Zeeshan",
        },
      ],
      lab_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Lab Days.Friday",
          is_time_slot_active: true,
          time_slot_day: "Friday",
          slot_start_time: "13:00:00",
          slot_end_time: "15:00:00",
          zoom_link: null,
          github_link: null,
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 6,
          time_zone: "Z",
          instructor: "Zeeshan",
        },
      ],
    },
    {
      section_name: "EN-2D-6",
      section_code: "EN-AI-202",
      course_id: 3,
      total_seats: 130,
      booked_seats: 0,
      confirmed_seats: 0,
      start_date: "2024-09-01T00:00:00",
      end_date: "2026-12-15T00:00:00",
      registration_deadline: "2024-11-30T00:00:00",
      is_registration_open: true,
      status: "Active",
      is_virtual: true,
      is_active: true,
      id: 9,
      language: "English",
      class_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Wednesday",
          is_time_slot_active: true,
          time_slot_day: "Wednesday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 11,
          time_zone: "Z",
          instructor: "Rehan",
        },
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Thursday",
          is_time_slot_active: true,
          time_slot_day: "Thursday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 12,
          time_zone: "Z",
          instructor: "Rehan",
        },
      ],
      lab_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Lab Days.Friday",
          is_time_slot_active: true,
          time_slot_day: "Friday",
          slot_start_time: "13:00:00",
          slot_end_time: "15:00:00",
          zoom_link: null,
          github_link: null,
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 6,
          time_zone: "Z",
          instructor: "Rehan",
        },
      ],
    },
    {
      section_name: "EN-2D-7",
      section_code: "EN-AI-202",
      course_id: 3,
      total_seats: 130,
      booked_seats: 0,
      confirmed_seats: 0,
      start_date: "2024-09-01T00:00:00",
      end_date: "2026-12-15T00:00:00",
      registration_deadline: "2024-11-30T00:00:00",
      is_registration_open: true,
      status: "Active",
      is_virtual: true,
      is_active: true,
      id: 10,
      language: "English",
      class_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Wednesday",
          is_time_slot_active: true,
          time_slot_day: "Wednesday",
          slot_start_time: "07:00:00",
          slot_end_time: "11:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 11,
          time_zone: "Z",
          instructor: "Ammar",
        },
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Thursday",
          is_time_slot_active: true,
          time_slot_day: "Thursday",
          slot_start_time: "05:00:00",
          slot_end_time: "10:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 12,
          time_zone: "Z",
          instructor: "Ammar",
        },
      ],
      lab_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Lab Days.Friday",
          is_time_slot_active: true,
          time_slot_day: "Monday",
          slot_start_time: "18:00:00",
          slot_end_time: "21:00:00",
          zoom_link: null,
          github_link: null,
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 6,
          time_zone: "Z",
          instructor: "Ammar",
        },
      ],
    },
    {
      section_name: "EN-2D-9",
      section_code: "EN-AI-202",
      course_id: 3,
      total_seats: 130,
      booked_seats: 0,
      confirmed_seats: 0,
      start_date: "2024-09-01T00:00:00",
      end_date: "2026-12-15T00:00:00",
      registration_deadline: "2024-11-30T00:00:00",
      is_registration_open: true,
      status: "Active",
      is_virtual: true,
      is_active: true,
      id: 15,
      language: "English",
      class_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Wednesday",
          is_time_slot_active: true,
          time_slot_day: "Wednesday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 11,
          time_zone: "Z",
          instructor: "Rehan",
        },
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Thursday",
          is_time_slot_active: true,
          time_slot_day: "Thursday",
          slot_start_time: "09:00:00",
          slot_end_time: "12:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 12,
          time_zone: "Z",
          instructor: "Rehan",
        },
      ],
      lab_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Lab Days.Friday",
          is_time_slot_active: true,
          time_slot_day: "Friday",
          slot_start_time: "13:00:00",
          slot_end_time: "15:00:00",
          zoom_link: null,
          github_link: null,
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 6,
          time_zone: "Z",
          instructor: "Rehan",
        },
      ],
    },
    {
      section_name: "EN-2D-8",
      section_code: "EN-AI-202",
      course_id: 3,
      total_seats: 130,
      booked_seats: 0,
      confirmed_seats: 0,
      start_date: "2024-09-01T00:00:00",
      end_date: "2026-12-15T00:00:00",
      registration_deadline: "2024-11-30T00:00:00",
      is_registration_open: true,
      status: "Active",
      is_virtual: true,
      is_active: true,
      id: 12,
      language: "English",
      class_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Wednesday",
          is_time_slot_active: true,
          time_slot_day: "Wednesday",
          slot_start_time: "07:00:00",
          slot_end_time: "11:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 11,
          time_zone: "Z",
          instructor: "Ammar",
        },
        {
          time_slot_name: "AI-202 - EN-AI-202 - Days.Thursday",
          is_time_slot_active: true,
          time_slot_day: "Thursday",
          slot_start_time: "05:00:00",
          slot_end_time: "10:00:00",
          zoom_link: null,
          github_link: "https://github.com/panaversity/learn-agentic-ai",
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 12,
          time_zone: "Z",
          instructor: "Ammar",
        },
      ],
      lab_time_slots: [
        {
          time_slot_name: "AI-202 - EN-AI-202 - Lab Days.Friday",
          is_time_slot_active: true,
          time_slot_day: "Monday",
          slot_start_time: "18:00:00",
          slot_end_time: "21:00:00",
          zoom_link: null,
          github_link: null,
          lectures_playlist: null,
          instructor_id: 2,
          section_id: 6,
          id: 6,
          time_zone: "Z",
          instructor: "Ammar",
        },
      ],
    },
  ];

  const [sheetSide, setSheetSide] = useState<"bottom" | "right">("bottom");
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(
    sections && sections.length > 0 ? sections[0] : null,
  );

  const [currentPage, setCurrentPage] = useState(0);

  const sectionsPerPage = 3;
  const totalPages = Math.ceil(sections.length / sectionsPerPage);
  const visibleSections = sections.slice(
    currentPage * sectionsPerPage,
    (currentPage + 1) * sectionsPerPage,
  );

  const showArrows = sections.length > 3;

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const router = useRouter();

  async function handleClick() {
    if (!isLoggedIn) {
      localStorage.setItem("previousPath", window.location.pathname);
      router.push("/register");
    } else {
      setOpen(true);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setSheetSide(window.innerWidth >= 1024 ? "right" : "bottom");
    };

    handleResize(); // Call once on mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!sections || sections.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <div>No sections available for this course.</div>
      </div>
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
            defaultValue={sections[0].id.toString()}
            onValueChange={(value) =>
              setSelectedSection(
                sections.find((section) => section.id.toString() === value) ||
                  sections[0],
              )
            }
          >
            <div className="flex items-start justify-center">
              {showArrows && ( <button
                onClick={handlePrevPage}
                className={`rounded-full p-2 text-primary hover:text-accent-foreground ${
                  currentPage === 0 ? "opacity-25" : ""
                }`}
                aria-label="Previous sections"
                disabled={currentPage === 0}
              >
                <FaChevronLeft className="h-4 w-4" />
              </button> )}
              <TabsList
                className={`mb-1 grid w-full overflow-auto ${
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
              {showArrows && ( <button
                onClick={handleNextPage}
                className={`rounded-full p-2 text-primary  hover:text-accent-foreground ${
                  currentPage === totalPages - 1
                    ? "opacity-25 "
                    : ""
                }`}
                aria-label="Next sections"
                disabled={currentPage === totalPages - 1}
              >
                <FaChevronRight className="h-4 w-4" />
              </button> )}
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
                      <span className="">
                        Instructor: {section?.class_time_slots?.[0]?.instructor}
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
                    {section?.class_time_slots?.map((slot, index) => (
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
              is_active
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

      <SheetContent
        side={sheetSide}
        className={`w-full max-w-full overflow-y-auto p-0 ${
          sheetSide === "bottom" ? "h-[80vh]" : "h-full"
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
          sections={sections || []}
          selected_section_name={selectedSection}
          isEnrolled={isEnrolled}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CourseSheet;
