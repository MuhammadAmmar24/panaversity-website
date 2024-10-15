import fetchProfile from "./getProfile";
import { getStudentCourses } from "./getStudentCourses";


export default async function enrollmentStatus(course_batch_program_id: number,) {
    const profile: ProfileData = await fetchProfile();
    console.log(profile, "profile");

    let isEnrolled = false

    if (profile?.is_verified) {
        const result = await getStudentCourses(profile.id);

        if (result?.data) {
            // Find if the course exists in the student's courses
            const course = result.data.find(
                (course) => course.course_batch_program_id === course_batch_program_id
            );
            // If course exists, student is enrolled
            isEnrolled = !!course;
        }
    }
    return {profileData: profile, isEnrolled: isEnrolled}
}

