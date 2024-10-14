
import type { Metadata } from "next";
import Breadcrumbs from "@/src/components/Breadcrumbs";
import ContactUs from "@/src/components/contact/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with Panaversity University for inquiries about our Generative AI and Cloud Native programs. Reach out for admissions, technical support, or general questions.`,
};



export default async function Courses() {
 

  return (
    <section className="light bg-background dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-x-hidden">
      <div className="w-full ">
        {/* program header */}
        <div className="flex justify-center items-center bg-teamBg bg-cover bg-center">
          <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] min-h-48 sm:min-h-52 md:min-h-72 lg:min-h-[26rem]">
            <div className="lg:max-w-[990px] xl:max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0 md:pb-3">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Contact", href: "/contact" },
                ]}
              />
            </div>
            <div>
              <h2
                className="text-[1.8rem] sm:text-[2rem] md:text-[3.6rem] -mt-1 px-1 text-background font-bold font-poppins tracking-tighter"
                style={{ wordSpacing: "0.2em" }}
              >
                Contact Us
              </h2>
              <p className="text-background/60 mb-12 pt-2 px-4 mt-0 max-w-[38rem] mx-auto">
              We’re here to assist you on your journey to becoming a certified Cloud Native Applied Generative AI Engineer. 
              </p>
            </div>
          </div>
        </div>


        <ContactUs />
      </div>
    </section>
  );
}
