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
  }
  
  export interface Class {
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
  }