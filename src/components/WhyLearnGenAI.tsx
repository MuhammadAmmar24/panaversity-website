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
    <div className="bg-white py-20 px-5 sm:px-10">
      <div className="max-w-[87rem] mx-auto flex flex-col lg:flex-row items-center justify-between ">
        {/* Left Section: Text Content */}
        <div className="text-left mb-24 lg:-mt-28 md:mb-0 md:pr-10 lg:w-[612px] animate-fade-in-up">
          <h2 className="text-lg sm:text-xl gradient-border font-semibold border-b  w-fit text-[#031811] uppercase tracking-wide">
            Program Overview Section
          </h2>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl/[3.5rem] font-medium text-[#031811] mt-6 leading-tight">
            Master Cloud Native Applied Generative AI Engineering
          </h1>
          <p className="mt-6 text-base/[2] sm:text-lg/[2] text-[#031811]/70">
            Embark on a journey structured across 8 quarters to master AI
            technologies. The first 3 quarters build a foundation in Generative
            AI, Python, and cloud-native microservices, followed by advanced
            topics like PyTorch, large language models, and Kubernetes.
          </p>
          <p className="mt-4 text-base/[2] sm:text-lg/[2] mb-4 text-[#031811]/70">
            The final quarters explore Physical AI, humanoid robotics, and
            culminate in a comprehensive capstone project. This program prepares
            you for real-world applications, with regular breaks to reinforce
            your learning.
          </p>
          <button className="mt-5 sm:mt-8 px-8 py-4 md:mb-20 lg:mb-0 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-500 hover:shadow-2xl transition-all duration-300">
            Countinue With Us →
          </button>
        </div>

        {/* Right Section: Features Grid */}
        <div className="grid grid-cols-1 -mt-6 xl:-mt-0 sm:grid-cols-2 hover:cursor-default gap-x-8 gap-y-8 max-w-3xl">
          {/* Map over features array */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-white px-6 pb-12 pt-12 rounded-3xl border-[#000000]/5 border-2 custom-shadow shadow-gray-200 w-full sm:max-w-[318px] animate-slide-in-up hover:scale-105 hover:shadow-2xl transition-all duration-300"
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
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-3 text-[16px]/[2] text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
