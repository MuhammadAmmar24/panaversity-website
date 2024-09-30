import { date } from "zod";

export {
  initialData,
  mockRecentCourses,
  mockRecentClasses,
  mockUpcomingClasses,
};

const initialData = {
  profileInfo: {
    firstName: "David",
    lastName: "Jones",
    email: "davidj@gmail.com",
  },
  personalInfo: {
    phone: "+92 346566543",
    studentId: "15446565", // Student ID is not editable
    bio: "AI Student",
  },
  addressInfo: {
    country: "United Kingdom",
    city: "Leeds, East London",
    postalCode: "26000",
    address: "Street 1, F7 Markaz, Islamabad",
  },
};

const mockRecentCourses = [
  { title: "Gen AI & Cloud Services", progress: 60, lessons: 100 },
];

const mockRecentClasses = [
  {
    title: "GenAI for Quarter 3",
    time: "2:00 PM",
    assignment: "14",
    lessons: "10",
    date: "22 August 2024",
  },
  {
    title: "GenAI for Quarter 3",
    time: "2:00 PM",
    assignment: "14",
    lessons: "10",
    date: "22 August 2024",
  },
];

const mockUpcomingClasses = [
  { title: "Gen AI & Cloud Services", time: "4:00 PM", date: "22 August 2024" },
  // { title: "Applied Generative AI", time: "5:00 PM" },
];
