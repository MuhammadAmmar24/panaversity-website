import getProfile from "@/src/lib/getProfile";
import Error from "../Error/error_message";

const Welcome: React.FC = async () => {
  let profile: ProfileData | null = null;

  try {
    // Attempt to fetch the profile data
    profile = await getProfile();
  } catch (err) {
    console.error("Error fetching profile data:", err); // Log error for debugging
  }

  // If no profile is returned (due to an error), display an error message
  if (!profile) {
    return (
      <Error message="Failed to load profile data. Please try again later." />
    );
  }

  // Main UI with profile data
  return (
    <section className="mx-auto ml-4">
      {/* Container for the welcome message */}
      <div className="h-32 w-full mt-10 mobileM:mt-12 xs:mt-14 flex gap-4 items-center justify-start">
        {/* Heading with user's first name */}
        <h1 className="font-medium text-start text-xl fold:text-lg mobileM:text-2xl md:text-4xl font-poppins">
          Welcome {profile.full_name?.split(" ")[0]}{" "}
          {/* Display user's first name */}
          <br />
          {/* Subtitle with responsive text size */}
          <span className="text-xs fold:text-sm mobileM:text-base md:text-lg font-medium">
            Overview of your courses {/* Subtitle */}
          </span>
        </h1>
      </div>
    </section>
  );
};

export default Welcome;
