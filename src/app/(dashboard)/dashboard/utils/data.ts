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
      email: "davidjoness@gmail.com",
    },
    personalInfo: {
      phone: "+92 0346566543",
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
    { title: "Gen AI & Cloud Services", progress: 40, lessons: 10 },
  ];
  
  const mockRecentClasses = [
    {
      title: "Gen AI & Cloud Services",
      time: "2:00 PM",
      assignment: "14",
      lessons: "10",
    },
    {
      title: "Applied Generative AI",
      time: "3:00 PM",
      assignment: "15",
      lessons: "12",
    },
  ];
  
  const mockUpcomingClasses = [
    { title: "Gen AI & Cloud Services", time: "4:00 PM" },
    { title: "Applied Generative AI", time: "5:00 PM" },
  ];