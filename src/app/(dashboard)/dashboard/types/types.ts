export interface ClassCardProps {
    title?: string;
    time: string;
    image?: string;
    lessons?: string;
    assignment?: string;
  }
  
  export interface CourseCardProps {
    title: string;
    progress: number;
    lessons: number;
    status: string;
    batch_id: number;
    student_course_id: number;
    course_batch_program_id: number;
    profile: ProfileData
  }
  
  export interface CardData {
    title: string;
    count: number;
    icon: JSX.Element;
  }
  
  export interface Course {
    title: string;
    progress: number;
    lessons: number;
    status: string;
    is_paid: boolean;
    batch_no: number;
    student_course_id: number;
    course_batch_program_id: number;
  }
  
  export interface Class {
    date: string;
    title: string;
    time: string;
    assignment?: string;
    lessons?: string;
  }
  
  export interface InfoCardProps {
    title: string;
    count: number;
    icon: JSX.Element;
  }
  
  export interface UpcomingClassProps {
    title: string;
    time: string;
    ClassName?: string;
    date: string;
  }

  export interface ClassSectionProps {
    title: string;
    classes: Class[];
  }

  export interface UpcomingClassSectionProps {
    title: string;
    classes: Class[];
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

export interface CourseSectionProps {
  courses: Course[] | undefined;
  enrollmentStatus: string | null;
  status: string;
}

export interface DropdownProps {
  userName: string;
  userEmail: string;
  userImage: string;
}

export interface ProfileIdProps {
  profileId: string;
}
