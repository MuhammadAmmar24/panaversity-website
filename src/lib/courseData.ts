export async function getCourseData(c_id: number) {

  try {
    const response = await fetch(
      `${process.env.ENROLLMENT_API_URL}/data/course-batch-program/${c_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.ENROLLMENT_SECRET}`,
        },
        // next: { revalidate: 604800 }, // Revalidate every week (604,800 seconds)
        cache: "force-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch course data: ${response.statusText}`);
    }

    const responseData = await response.json();


    return {
      type: "success",
      message: "Course data fetched successfully",
      data: responseData,
    };
  } catch (error: any) {
    return {
      type: "error",
      message: error.message,
    };
  }
}
