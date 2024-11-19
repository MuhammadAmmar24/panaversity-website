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

  return (
    <section className="mx-auto">
      <div className="mt-10 flex w-full items-center justify-start gap-4 sm:mt-14">
        <h1 className="font-poppins text-start text-xl font-medium text-textPrimary/90 fold:text-lg mobileM:text-2xl md:text-4xl">
          Welcome {profile.full_name?.split(" ")[0]}{" "}
        </h1>
      </div>
    </section>
  );
};

export default Welcome;