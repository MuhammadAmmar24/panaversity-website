import Error from "../Error/error_message";

interface WelcomeProps {
  profile: {
    full_name: string;
  } | null;
}

const Welcome: React.FC<WelcomeProps> = ({ profile }) => {



  if (!profile) {
    return (
      <Error message="Failed to load profile data. Please try again later." />
    );
  }

  // Main UI with profile data
  return (
    <section className="mx-auto">
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
