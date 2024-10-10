"use client";

import React, { useEffect, useState } from "react";
import GetEnrolled from "@/src/components/ui/GetEnrolled";
import { Sheet, SheetContent } from "@/src/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { user_verify } from "@/src/lib/user-verify";
import { useRouter } from "next/navigation";

interface CourseSheetProps {
    is_registration_open: boolean;
    program_id: string;
    batch_id: number;
    course_batch_program_id: number;
    profile_id: string;
  }

const CourseSheet: React.FC<CourseSheetProps> = ({
    is_registration_open,
    program_id,
    batch_id,
    course_batch_program_id,
    profile_id,
  }) => {
  const [sheetSide, setSheetSide] = useState<"bottom" | "right">("bottom");

  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleClick() {
    const res = await user_verify();
    if (res?.redirectTo) {
      console.log(res.redirectTo);
      localStorage.setItem("previousPath", window.location.pathname);
      router.push(res.redirectTo);
      
    } else {
      console.log("Opening Sheet");
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
        onClick={handleClick}
        className={`w-full bg-accent text-white py-3 rounded-md font-semibold flex items-center justify-center transition duration-300 ${
          is_registration_open
            ? "hover:bg-emerald-500"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!is_registration_open}
      >
        {is_registration_open ? "Enroll Now" : "Registration Closed"}
        <ChevronRight className="w-5 h-5 ml-2" />
      </button>

      <SheetContent
        side={sheetSide}
        className={`w-full max-w-full overflow-y-auto ${
          sheetSide === "bottom" ? "h-[80vh]" : "h-full"
        } ${sheetSide === "right" ? "lg:max-w-lg" : ""}`}
      >
        <GetEnrolled
          program_id={program_id}
          batch_id={batch_id}
          course_batch_program_id={course_batch_program_id}
          profile_id={profile_id}
        />
      </SheetContent>
    </Sheet>
  );
}


export default CourseSheet;
