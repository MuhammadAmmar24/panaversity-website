import {
  GetCoursePriceResponse,
  TimeSlotsResponse,
} from "@/src/lib/schemas/courses";
import { StudentCourseStatus } from "../lib/schemas/enrollment";
import { studentCourses } from "./studentCourses";

export interface Pre_req_obj {
  course_code: string,
  course_name: string,
}

export interface CourseData {
  course_code: string;
  course_name: string;
  course_initials: string;
  course_description: string;
  is_active: boolean;
  created_by: string;
  updated_by: string;
  order: number;
  program_id: number;
  id: number;
  media_link: string;
  course_outcomes: string[];
  long_description: string;
  pre_requisite: Pre_req_obj[];
}

export interface CourseDetailsClientProps {
  courseData: CourseData;
  initialPrice: number;
  initialCurrency: string;
}

export interface LearnPointProps {
  point: string;
}

export interface CourseInfoProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

export interface GetEnrolledProps {
  program_id: number;
  course_batch_program_id: number;
  profile_id: string;
  timeSlots: TimeSlotsResponse;
  coursePrice: GetCoursePriceResponse;
  pre_requisite: Pre_req_obj[];
  student_courses: studentCourses[];
}

export interface CourseSheetProps {
  is_active: boolean;
  program_id: number;
  course_batch_program_id: number;
  profile_id: string;
  isEnrolled: boolean;
  timeSlots: TimeSlotsResponse;
  coursePrice: GetCoursePriceResponse;
  courseName: string;
  isLoggedIn: boolean;
  pre_requisite: Pre_req_obj[];
  student_courses: studentCourses[];
}

export interface RatingStarsProps {
  rating: number; // A number between 0 and 5, including decimals
  color?: string; // Custom color for the filled stars
  size?: string; // Custom size for the stars (Tailwind CSS size classes or custom values)
}
