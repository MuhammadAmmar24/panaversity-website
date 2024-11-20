"use client";

import GetEnrolled from "@/src/components/courses/GetEnrolled";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/src/components/ui/sheet";
import { CourseSheetProps } from "@/src/types/courseEnrollment";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdLanguage } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import { GiTeacher } from "react-icons/gi";
import { Button } from "@/src/components/ui/button";
import { formatTime } from "@/src/lib/timeUtils";

import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

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
  const [selectedSection, setSelectedSection] = useState(
    sections && sections.length > 0 ? sections[0] : null,
  );
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
      <Card className="w-auto min-w-[22rem] max-w-sm items-end">
        <CardContent className="p-4 mobileM:p-4 xs:p-6 md:p-4 sm:p-4 lg:p-4 xl:p-4">
          <p className="pb-1 text-xs text-primary">Available Sections:</p>
          <Tabs
            defaultValue={sections[0].id.toString()}
            onValueChange={(value) =>
              setSelectedSection(
                sections.find((section) => section.id.toString() === value) ||
                  sections[0],
              )
            }
          >
            <TabsList
              className={`mb-6 grid w-full grid-cols-3 grid-cols-${sections.length}`}
            >
              {sections.map((section) => (
                <TabsTrigger key={section.id} value={section.id.toString()}>
                  {section.section_name}
                </TabsTrigger>
              ))}
            </TabsList>
            {sections.map((section) => (
              <TabsContent key={section.id} value={section.id.toString()}>
                <div className="space-y-2 text-sm">
                  {/* <div className="flex items-center gap-2">
                    <GiTeacher className="h-4 w-4 text-muted-foreground" />
                    <span className="text-red-500">Instructor: ???</span>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <SlCalender className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Registration Deadline:{" "}
                      {new Date(
                        section.registration_deadline,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </span>
                  </div>
     
                 

                  <div className="flex flex-col justify-center items-start gap-2">
                    {section.class_time_slots.map((slot, index) => (
                        <span key={index} className="flex gap-2 capitalize">
                          <BsClock className="h-4 w-4 text-muted-foreground" />
                          Days: {slot.time_slot_day.slice(0,3)} ({(formatTime(slot.slot_start_time ?? ""))} - {formatTime(slot.slot_end_time ?? "")})
                        </span>
                        ))}
                  </div>

                  <div className="flex flex-row justify-between">
                  <div className="flex items-center gap-2">
                    <MdLanguage className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Language:{" "}
                      {typeof section.language === "string"
                        ? section.language
                        : section.language.language_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <SiGoogleclassroom className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Seats: {section.booked_seats}/{section.total_seats}
                    </span>
                  </div>
                  </div>

            

                  <div className="mb-4 flex items-center justify-between">
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
        <CardFooter>
          <button
            onClick={isEnrolled ? () => router.push("/dashboard") : handleClick}
            className={`flex w-full items-center justify-center rounded-md bg-accent py-3 font-semibold text-white transition duration-300 ${
              is_active
                ? "hover:bg-emerald-500"
                : "cursor-not-allowed bg-gray-400"
            }`}
            disabled={!is_active}
          >
            {isEnrolled
              ? "Dashboard"
              : is_active
                ? "Enroll Now"
                : "Registration Closed"}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </CardFooter>
      </Card>

      <SheetContent
        side={sheetSide}
        className={`w-full max-w-full overflow-y-auto ${
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
        {/* <GetEnrolled
          program_id={program_id}
          profile_id={profile_id}
          coursePrice={coursePrice}
          pre_requisite={pre_requisite}
          student_courses={student_courses}
          sections={sections}
        /> */}
      </SheetContent>
    </Sheet>
  );
};

export default CourseSheet;
