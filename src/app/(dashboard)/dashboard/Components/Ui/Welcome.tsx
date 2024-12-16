import Error from "../Error/error_message";

const Welcome = ({ studentName }:{studentName:string}) => {
  if (!studentName) {
    return (
      <Error message="Failed to load profile data. Please try again later." />
    );
  }

  return (
    <section className="mx-auto">
      <div className="mt-10 flex w-full items-center justify-start gap-4 sm:mt-14">
        <h1 className="font-poppins text-start text-xl font-medium text-textPrimary/90 fold:text-lg mobileM:text-2xl md:text-4xl">
          Welcome {studentName?.split(" ")[0]}{" "}
        </h1>
      </div>
    </section>
  );
};

export default Welcome;