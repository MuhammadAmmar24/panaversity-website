import Image from "next/image";
import clockIcon from "@/../../public/images/icons8-clock-100.png";
import barChartIcon from "@/../../public/images/bar-chart-3-64.png";
import lightBulbIcon from "@/../../public/images/icons8-light-bulb-96.png";
import brainIcon from "@/../../public/images/icons8-brain-100.png";

export default function WhyLearnGenerativeAI() {
  // Data for the features section
  const features = [
    {
      title: "Comprehensive Curriculum",
      description:
        "Explore Generative AI, Cloud Native Computing, and Physical AI with expert guidance.",
      icon: clockIcon,
      bgColor: "#FA7F27",
      iconSize: { width: 24, height: 24 },
    },
    {
      title: "Real-World Projects",
      description:
        "Work on projects that mirror real-world tech challenges to build practical skills.",
      icon: barChartIcon,
      bgColor: "#4B62E6",
      iconSize: { width: 24, height: 24 },
    },
    {
      title: "Cutting-Edge Technology",
      description:
        "Stay ahead with hands-on experience using the latest AI tools and platforms.",
      icon: lightBulbIcon,
      bgColor: "#F786BE",
      iconSize: { width: 26, height: 26 },
    },
    {
      title: "Flexible Learning",
      description:
        "Learn at your own pace with 24/7 access to AI Mentors and community support.",
      icon: brainIcon,
      bgColor: "#FFC04C",
      iconSize: { width: 24, height: 24 },
    },
  ];

  return (
    <div className="relative bg-white mt-[-10rem] pt-[2rem] px-5 sm:px-24 z-10">
      <div className="max-w-[87rem] mx-auto flex flex-col lg:flex-row items-center justify-between ">
        {/* Left Section: Text Content */}
        <div className="text-left mb-24 lg:-mt-28 md:mb-0 md:pr-10 lg:w-[612px] animate-fade-in-up">
          <h2 className="text-sm sm:text-md md:text-lg text-textPrimary  gradient-border font-semibold border-b w-fit uppercase tracking-wide">
            Program Overview
          </h2>
          <h1 className="text-[2.1rem] sm:text-3xl xl:text-4xl/[3.5rem] font-bold text-textPrimary mt-6 leading-tight">
            Master Cloud Native Applied Generative AI Engineering
          </h1>
          <p className="mt-6 text-[1rem]/[2] sm:text-md/[2] text-[#031811]/70">
            Embark on a journey structured across 8 quarters to master AI
            technologies. The first 3 quarters build a foundation in Generative
            AI, Python, and cloud-native microservices, followed by advanced
            topics like PyTorch, large language models, and Kubernetes.
          </p>
          <p className="mt-4 text-[1rem]/[2] sm:text-md/[2] mb-4 text-[#031811]/70">
            The final quarters explore Physical AI, humanoid robotics, and
            culminate in a comprehensive capstone project. This program prepares
            you for real-world applications, with regular breaks to reinforce
            your learning.
          </p>
          {/* Button Component */}
          <a
            href="#_"
            className="relative items-center justify-start inline-block px-6 py-3 md:px-4 lg:px-5 lg:py-3  mt-4    overflow-hidden font-bold rounded-full group"
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2  absolute left-0 top-0 bg-accent opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-accent opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-[0.9rem] lg:text-[0.9rem] text-textPrimary transition-colors duration-200 ease-in-out group-hover:text-textPrimary font-poppins font-medium">
              Continue With Us
            </span>
            <span className="absolute inset-0 border-2 border-accent rounded-full"></span>
          </a>
        </div>

        {/* Right Section: Features Grid */}
        <div className="grid grid-cols-1 -mt-6 xl:-mt-0 sm:grid-cols-2 hover:cursor-default gap-x-8 gap-y-8 max-w-3xl ">
          {/* Map over features array */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-white px-[1rem] pb-12 pt-12 rounded-3xl border-[#000000]/5 border-2 custom-shadow shadow-gray-200 w-full sm:max-w-[318px]  animate-slide-in-up hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div
                className="flex justify-center items-center"
                style={{
                  backgroundColor: feature.bgColor,
                  borderRadius: "50%",
                  width: "48px",
                  height: "48px",
                  marginBottom: "16px",
                }}
              >
                <Image
                  src={feature.icon}
                  alt={`${feature.title} Icon`}
                  width={feature.iconSize.width}
                  height={feature.iconSize.height}
                />
              </div>
              <h3 className="text-md sm:text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm/[2] text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
