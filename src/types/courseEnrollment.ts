import {
  GetCoursePriceResponse,
  TimeSlotsResponse,
} from "@/src/lib/schemas/courses";

export interface CourseData {
  course_batch_program_id: number;
  is_active: boolean;
  is_registration_open: boolean;
  registration_start_date: string; // ISO date string
  registration_end_date: string; // ISO date string
  course_id: number;
  batch_id: number;
  course_code: string;
  course_name: string;
  course_initials: string;
  course_description: string;
  course_outcomes: string[];
  long_description: string;
  pre_requisite: string[];
  media_link: string;
  program_id: number;
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
  batch_id: number;
  course_batch_program_id: number;
  profile_id: string;
  timeSlots: TimeSlotsResponse;
  coursePrice: GetCoursePriceResponse;
}

interface PreRequisiteCourse {
  course_code: string;
  course_name: string;
  is_graduated: boolean;
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
  courseName: string;
  isLoggedIn: boolean;
  prereqCourses: PreRequisiteCourse[]; 
}

export interface RatingStarsProps {
  rating: number; // A number between 0 and 5, including decimals
  color?: string; // Custom color for the filled stars
  size?: string; // Custom size for the stars (Tailwind CSS size classes or custom values)
}
