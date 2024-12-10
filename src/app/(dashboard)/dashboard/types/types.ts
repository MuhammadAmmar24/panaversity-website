
export interface CourseCardProps {
  title: string;
  progress: number;
  classes: number;
  status: string;
  student_course_id: number;
  profile: ProfileData;
  course_code: string;
  course_section?: {
    section_name: string;
    id:number;
    language: string | { language_name: string; is_language_active: boolean };
    class_time_slots?: Array<{
      time_slot_day: string;
      slot_start_time: string | null;
      slot_end_time: string | null;
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
  enrollmentStatus: string | null;
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

export interface ClientDropdownProps {
  userName: string | undefined;
  userEmail: string | undefined;
  userImage: string | undefined;
  onSignOut: () => Promise<void>;
}

export interface SidebarProps {
  setIsSidebarOpen: (open: boolean) => void;
}

export interface DropdownProps {
  userName: string;
  userEmail: string;
  userImage: string;
}

export interface ProfileIdProps {
  profileId: string;
}

export type PaymentDialogProps = {
  onConfirm: (paymentMethod: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};