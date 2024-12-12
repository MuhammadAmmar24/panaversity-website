async function fetchCourseData(course_code, is_offered_now) {
  try {
    // Step 1: Fetch profile first
    const profile = await fetchProfile();

    //   let sectionsPromise = Promise.resolve(null);
    //   let studentCoursesPromise = Promise.resolve(null);

    if (!profile && is_offered_now) {
      const sectionsPromise = await getCourseActiceSections(course_code);
      return sectionsPromise;
    }

    if (profile && is_offered_now) {
      const sectionsPromise = getCourseActiceSections(course_code);
      const studentCoursesPromise = getStudentCourses(profile.id);
      const studentCourseInterestPromise = getCourseInterests(profile.email);
      const [sections, student_courses, student_course_interests] = await Promise.all([
        sectionsPromise,
        studentCoursesPromise,
        studentCourseInterestPromise
      ]);
      return {
        profile,
        sections,
        student_courses,
        student_course_interests,
      }
    }

    if (profile && !is_offered_now) {
      const student_course_interests = await getCourseInterests(profile.email);
      return student_course_interests;
    }

  } catch (error) {
    console.error("Error fetching course data: ", error.message);
    return {
      profile: null,
      student_course_interests: null,
      sections: null,
      student_courses: null,
      isEnrolled: false,
    };
  }
}
