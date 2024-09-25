<<<<<<< HEAD
<<<<<<<< HEAD:src/app/programs/flagship-program/page.tsx
import { getProgramCoursesWithOpenRegistration } from "@/src/actions/courses";
import { Course } from "@/src/lib/schemas/courses";
=======
import { getProgramCoursesWithOpenRegistration } from "@/src/actions/courses";
>>>>>>> 9a4f5740367e293468f8da26b629d2435b247b30
import CoursesClient from '@/src/components/programs/courses';

async function fetchCourses() {
  const query = {
    program_id: 1,
    batch_id: 1,
    limit: 10,
  };

  const result = await getProgramCoursesWithOpenRegistration(query);

  if (result.type === "success" && result.data) {
<<<<<<< HEAD
    console.log(result.data)
    return result.data.data;
   
  } else {
    throw new Error(result.message);
  }
========
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
>>>>>>>> 9a4f5740367e293468f8da26b629d2435b247b30:src/app/programs/page.tsx
}
=======
    return result.data.data;
  } else {
    throw new Error(result.message);
  }
}

export default async function Courses() {
  const courses = await fetchCourses();

  return <CoursesClient initialCourses={courses} />;
}
>>>>>>> 9a4f5740367e293468f8da26b629d2435b247b30
