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

const CourseSheet: React.FC<CourseSheetProps> = ({
  is_registration_open,
  program_id,
  batch_id,
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
      <button
        onClick={isEnrolled ? () => router.push("/dashboard") : handleClick}
        className={`w-full bg-accent text-white py-3 rounded-md font-semibold flex items-center justify-center transition duration-300 ${
          is_registration_open
            ? "hover:bg-emerald-500"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!is_registration_open}
      >
        {isEnrolled
          ? "Dashboard"
          : is_registration_open
          ? "Enroll Now"
          : "Registration Closed"}
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>

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


        <GetEnrolled
          program_id={program_id}
          batch_id={batch_id}
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
