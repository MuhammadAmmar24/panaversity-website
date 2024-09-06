import Image from "next/image";
import { MdBook } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";
import { IoRocket } from "react-icons/io5";
import { FaClock } from "react-icons/fa";

export default function WhyLearnGenerativeAI() {
  // Data for the features section
  const features = [
    {
      title: "Comprehensive Curriculum",
      description:
        "Explore Generative AI, Cloud Native Computing, and Physical AI with expert guidance.",
      icon: <MdBook className="text-white w-5 h-5" />,
      bgColor: "#FA7F27",
      iconSize: { width: 24, height: 24 },
    },
    {
      title: "Real-World Projects",
      description:
        "Work on projects that mirror real-world tech challenges to build practical skills.",
      icon: <FaBriefcase className="text-white w-5 h-5" />,
      bgColor: "#4B62E6",
      iconSize: { width: 24, height: 24 },
    },
    {
      title: "Cutting-Edge Technology",
      description:
        "Stay ahead with hands-on experience using the latest AI tools and platforms.",
      icon: <IoRocket className="text-white w-5 h-5" />,
      bgColor: "#F786BE",
      iconSize: { width: 26, height: 26 },
    },
    {
      title: "Flexible Learning",
      description:
        "Learn at your own pace with 24/7 access to AI Mentors and community support.",
      icon: <FaClock className="text-white w-5 h-5" />,
      bgColor: "#FFC04C",
      iconSize: { width: 24, height: 24 },
    },
  ];

  return (
    <div className="bg-white py-36 px-10 lg:px-44">
      <div className="max-w-[60rem] mx-auto flex flex-col lg:flex-row items-center justify-between ">
        {/* Left Section: Text Content */}
        <div className="text-left mb-24 lg:-mt-28 md:mb-0 md:pr-10 lg:w-[24rem] animate-fade-in-up">
          <h2 className="text-md sm:text-sm gradient-border font-medium border-b rounded-[100px] w-fit text-textPrimary uppercase tracking-wide">
            Program Overview
          </h2>
          <h1 className="text-3xl sm:text-2xl xl:text-[2rem]/[2.5rem] font-bold font-poppins text-textPrimary mt-6">
            Master Cloud Native Applied Generative AI Engineering
          </h1>
          <p className="mt-6 text-sm/[2] sm:text-xs/[2] text-textSecondary font-inter">
            Embark on a journey structured across 8 quarters to master AI
            technologies. The first 3 quarters build a foundation in Generative
            AI, Python, and cloud-native microservices, followed by advanced
            topics like PyTorch, large language models, and Kubernetes.
          </p>
          <p className="mt-4 text-sm/[2] sm:text-xs/[2] mb-4 text-textSecondary font-inter">
            The final quarters explore Physical AI, humanoid robotics, and
            culminate in a comprehensive capstone project. This program prepares
            you for real-world applications, with regular breaks to reinforce
            your learning.
          </p>
          <button className="mt-5 sm:mt-8 px-6 py-2 md:mb-20 lg:mb-0 bg-green-600 text-white text-md font-semibold rounded-full shadow-lg hover:bg-green-500 hover:shadow-2xl transition-all duration-300">
            Countinue With Us →
          </button>
        </div>

        {/* Right Section: Features Grid */}
        <div className="grid grid-cols-1 -mt-10 xl:-mt-0 sm:grid-cols-2 hover:cursor-default gap-x-8 gap-y-8 max-w-[52rem]">
          {/* Map over features array */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-white px-4 py-6 rounded-3xl border-[#000000]/5 border-2 custom-shadow shadow-gray-200 w-full sm:max-w-[17rem] animate-slide-in-up hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div
                className="flex justify-center items-center"
                style={{
                  backgroundColor: feature.bgColor,
                  borderRadius: "50%",
                  width: "3rem",
                  height: "3rem",
                  marginBottom: "16px",
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-3 text-[0.9rem]/[1.5] text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
