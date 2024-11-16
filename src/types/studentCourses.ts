export interface Language {
    language_name: string;
    is_language_active: boolean;
    created_by: string;
    updated_by: string;
}

export interface TimeSlot {
  time_slot_name: string;
  is_time_slot_active: boolean;
  time_slot_day: string;
  slot_start_time: string | null;
  slot_end_time: string | null;
  total_seats: number;
  booked_seats: number;
  confirmed_seats: number;
  zoom_link: string | null;
  social_links: string[] | null;
  id: number;
  course_batch_program_id: number;
  language: string; 
  time_zone: string;
}


  export interface studentCourses {
    student_course_id: number;
    course_id: number;
    course_name: string;
    course_order: number;
    is_active: boolean;
    is_paid: boolean;
    student_course_status: string;
    is_graduated: boolean;
    is_registration_open: boolean;
    is_class_started: boolean;
    class_start_date: string | null;
    is_class_completed: boolean;
    batch_id: number;
    program_id: number;
    course_batch_program_id: number;
    course_code: string;
    class_time_slot?: TimeSlot;
  }
  
  export interface StudentCourse {
    course_code: string;
    is_graduated: boolean;
  }
  