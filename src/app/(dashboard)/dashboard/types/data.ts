export {
  initialData,
  mockRecentCourses,
  mockRecentClasses,
  mockUpcomingClasses,
};

const initialData = {
  profileInfo: {
    firstName: "Rasaf",
    lastName: "Inayat",
    email: "rasaf@gmail.com",
  },
  personalInfo: {
    phone: "+92 333 1234567",
    studentId: "15446565", // Student ID is not editable
    bio: "AI Student",
  },
  addressInfo: {
    country: "Pakistan",
    city: "Islamabad",
    postalCode: "46220",
    address: "Bahria Town Islamabad",
  },
};

const mockRecentCourses = [
  { title: "Gen AI & Cloud Services", progress: 60, lessons: 100 },
];

const mockRecentClasses = [
  {
    title: "GenAI for Course 3",
    time: "2:00 PM",
    assignment: "14",
    lessons: "10",
    date: "22 August 2024",
  },
  {
    title: "GenAI for Course 3",
    time: "2:00 PM",
    assignment: "14",
    lessons: "10",
    date: "22 August 2024",
  },
];

const mockUpcomingClasses = [
  { title: "Gen AI & Cloud Services", time: "4:00 PM", date: "22 August 2024" },
];
