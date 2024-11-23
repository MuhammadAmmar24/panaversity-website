import {
  GetCoursePriceResponse,
  TimeSlotsResponse,
} from "@/src/lib/schemas/courses";
import { CourseSectionSchema } from "@/src/lib/schemas/sections";
import { z } from "zod";
import { studentCourses } from "./studentCourses";

export type CourseSections = z.infer<typeof CourseSectionSchema>;

export interface Pre_req_obj {
  course_code: string;
  course_name: string;
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
  coursePrice: GetCoursePriceResponse;
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
  profile_id: string;
  coursePrice: GetCoursePriceResponse;
  pre_requisite: Pre_req_obj[];
  student_courses: studentCourses[];
  sections: any;
}

export interface CourseSheetProps {
  is_active: boolean;
  program_id: number;
  profile_id: string;
  isEnrolled: boolean;
  coursePrice: GetCoursePriceResponse;
  courseName: string;
  isLoggedIn: boolean;
  pre_requisite: Pre_req_obj[];
  student_courses: studentCourses[];
  sections: CourseSections[];
}

export interface RatingStarsProps {
  rating: number; // A number between 0 and 5, including decimals
  color?: string; // Custom color for the filled stars
  size?: string; // Custom size for the stars (Tailwind CSS size classes or custom values)
}
