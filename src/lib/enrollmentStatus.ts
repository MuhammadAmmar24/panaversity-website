import fetchProfile from "./getProfile";
import { getStudentCourses } from "./getStudentCourses";


export default async function enrollmentStatus(course_batch_program_id: number,) {
    const profile: ProfileData = await fetchProfile();
 

    let isEnrolled = false

    if (profile?.is_verified) {
        console.log(profile.id, "Profile ID")
        const result = await getStudentCourses(profile.id);

        if (result?.data) {
            // Find if the course exists in the student's courses
            const course = result.data.find(
                (course) => course.course_batch_program_id === course_batch_program_id
            );
            
            isEnrolled = !!course && course.student_course_status != 'expired_reservation';
        }
    }
    return {profileData: profile, isEnrolled: isEnrolled}
}

