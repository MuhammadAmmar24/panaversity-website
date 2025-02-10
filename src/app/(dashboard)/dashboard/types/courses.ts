import { ReactNode } from "react";

export interface CourseCardProps {
  title: string;
  progress: number;
  classes: number;
  status: string;
  student_course_id: number;
  profile: ProfileData | null;
  course_code: string;
  course_section?: {
    section_name: string;
    id:number;
    language: string | { language_name: string; is_language_active: boolean };
    class_time_slots?: Array<{
      time_slot_day: string;
      slot_start_time: string | null;
      slot_end_time: string | null;
      zoom_link?: string | null;
      github_link?: string | null;
      lectures_playlist?: string | null;
    }>;
    lab_time_slots?: Array<{
      time_slot_day: string;
      slot_start_time: string | null;
      slot_end_time: string | null;
    }>;
  };
  course_price?: {
    package_id: number;
    course_id: number;
    amount: number;
    currency: string;
  } | null;
}

export interface CourseSectionProps {
  courses: Course[] | undefined;
  // enrollmentStatus: string | null;
  profileData: ProfileData | null;
}

export interface Course {
  title: string;
  progress: number;
  classes: number;
  status: string;
  is_paid: boolean;
  student_course_id: number;
  course_code: string;
  course_section?: {
    section_name: string;
    id:number;
    language: string | { language_name: string; is_language_active: boolean };
    class_time_slots?: Array<{
      time_slot_day: string;
      slot_start_time: string | null;
      slot_end_time: string | null;
      zoom_link?: string | null;
      github_link?: string | null;
      lectures_playlist?: string | null;
    }>;
    lab_time_slots?: Array<{
      time_slot_day: string;
      slot_start_time: string | null;
      slot_end_time: string | null;
    }>;
  };
  course_price?: {
    package_id: number;
    course_id: number;
    amount: number;
    currency: string;
  } | null;
}

export interface CardButtonProps {
  status: 'active' | 'reserved_seat' | 'expired_reservation';
  tooltipContent?: string;
  onClick?: () => void;
  children: ReactNode;
}

export interface CourseIconsProps {
    status: string;
    youtubeLink: string;
    githubLink: string;
    zoomLink: string;
}

export interface ProfileDataProps {
  profileData: ProfileData | null;
}