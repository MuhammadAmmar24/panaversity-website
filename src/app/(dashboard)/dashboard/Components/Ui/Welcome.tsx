import Error from "../Error/error_message";

const Welcome = ({ studentName }: { studentName: string }) => {

  const name = studentName.split(" ").slice(0, 2).join(" ");

  return (
    <section className="mx-auto">
      <div className="mt-10 flex w-full items-center justify-start gap-4 sm:mt-14">
        {!studentName ? (
          <Error message="Failed to load profile data. Please try again later." />
        ) : (
          <h1 className="font-poppins text-start text-xl font-medium text-textPrimary/90 fold:text-lg mobileM:text-2xl md:text-4xl">
            Welcome {name}
          </h1>
        )}
      </div>
    </section>
  );
};

export default Welcome;