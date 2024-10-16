import {
    GetCoursePriceResponse,
    TimeSlotsResponse,
  } from "@/src/lib/schemas/courses";

export interface GetEnrolledProps {
    program_id: number;
    batch_id: number;
    course_batch_program_id: number;
    profile_id: string;
    timeSlots: TimeSlotsResponse;
    coursePrice: GetCoursePriceResponse;
  }



export interface CourseSheetProps {
    is_registration_open: boolean;
    program_id: number;
    batch_id: number;
    course_batch_program_id: number;
    profile_id: string;
    isEnrolled: boolean;
    timeSlots: TimeSlotsResponse;
    coursePrice: GetCoursePriceResponse;
  }