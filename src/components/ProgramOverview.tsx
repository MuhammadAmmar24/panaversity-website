import Image from "next/image";

export default function ProgramOverview() {
  return (
    <section className="w-full bg-[#f2f2f2] px-[4rem] py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-10">
            <div className="inline-block bg-[#e7e6e6]  rounded-[20px] bg-muted px-3 py-1 text-sm text-primary ">
              Program Overview
            </div>
            <h2 className="text-3xl text-textPrimary font-poppins font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Become a Certified Cloud Native Applied Generative AI Engineering
            </h2>
            <div className="grid grid-cols-2 gap-9 ">
              <div className="grid gap-2">
                <h3 className="text-xl text-textPrimary font-bold flex items-center gap-2">
                  <BookIcon className="w-5 h-5" />
                  Comprehensive Curriculum
                </h3>
                <p className="text-muted-foreground text-textSecondary">
                  Dive deep into Generative AI, Cloud Native Computing, and
                  Physical AI, guided by industry experts.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl text-textPrimary font-bold flex items-center gap-2">
                  <BriefcaseIcon className="w-5 h-5" />
                  Real-World Projects
                </h3>
                <p className="text-muted-foreground text-textSecondary">
                  Gain practical experience with projects that mirror the
                  challenges of today's tech landscape.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl text-textPrimary font-bold flex items-center gap-2">
                  <BadgeIcon className="w-5 h-5" />
                  Global Certifications
                </h3>
                <p className="text-muted-foreground text-textSecondary">
                  Earn recognized certifications that validate your expertise
                  and open doors to new opportunities.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl text-textPrimary font-bold flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  Flexible Learning
                </h3>
                <p className="text-muted-foreground text-textSecondary">
                  Learn at your own pace with 24/7 access to AI Mentors and a
                  supportive community.
                </p>
              </div>
            </div>
          </div>
          <Image
            src={"/about1.png"}
            width="550"
            height="550"
            alt="About"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
          />
        </div>
      </div>
    </section>
  );
}

function BadgeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  );
}

function BookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
