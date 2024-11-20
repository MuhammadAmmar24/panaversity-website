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
import { FaGraduationCap, FaLanguage } from "react-icons/fa";
import { BsCalendarDay, BsClock } from "react-icons/bs";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

const courseOptions = [
  {
    id: "1",
    instructor: "Zia Khan",
    days: "Monday, Wednesday",
    time: "13:00 - 15:00 GMT",
    languages: "Urdu/Hindi",
    price: 100,
  },
  {
    id: "2",
    instructor: "Prof. Ammar",
    days: "Tuesday, Thursday",
    time: "12:00 - 14:00 GMT",
    languages: "English",
    price: 75000,
  },
  {
    id: "3",
    instructor: "M Rehan",
    days: "Saturday, Sunday",
    time: "05:00 - 07:00 GMT",
    languages: "Urdu/Hindi",
    price: 9000,
  },
];

const CourseSheet: React.FC<CourseSheetProps> = ({
  is_active,
  program_id,
  course_batch_program_id,
  profile_id,
  isEnrolled,
  timeSlots,
  coursePrice,
  courseName,
  isLoggedIn,
  pre_requisite,
  student_courses,
}) => {
  const [sheetSide, setSheetSide] = useState<"bottom" | "right">("bottom");
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(courseOptions[0]);
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

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => (isOpen ? setOpen(true) : setOpen(false))}
    >
      {/* New Component */}
      <Card className="w-full max-w-sm items-end">
        <CardContent className="p-4 mobileM:p-4 xs:p-6">
          <Tabs
            defaultValue="1"
            onValueChange={(value) =>
              setSelectedCourse(
                courseOptions.find((course) => course.id === value) ||
                  courseOptions[0],
              )
            }
          >
            <TabsList className="mb-6 grid w-full grid-cols-3">
              {courseOptions.map((course) => (
                <TabsTrigger key={course.id} value={course.id}>
                  Section {course.id}
                </TabsTrigger>
              ))}
            </TabsList>
            {courseOptions.map((course) => (
              <TabsContent key={course.id} value={course.id}>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <FaGraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>Instructor: {course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsCalendarDay className="h-4 w-4 text-muted-foreground" />
                    <span>Days: {course.days}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsClock className="h-4 w-4 text-muted-foreground" />
                    <span>Time (GMT): {course.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaLanguage className="h-4 w-4 text-muted-foreground" />
                    <span>Languages: {course.languages}</span>
                  </div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-lg font-medium">Price:</span>
                    <span className="text-2xl font-bold">
                      PKR {course.price}
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
        <GetEnrolled
          program_id={program_id}
          course_batch_program_id={course_batch_program_id}
          profile_id={profile_id}
          timeSlots={timeSlots}
          coursePrice={coursePrice}
          pre_requisite={pre_requisite}
          student_courses={student_courses}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CourseSheet;
