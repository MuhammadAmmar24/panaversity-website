import React from "react";
import nueral from "../../public/nueral2.jpg";

const Cta = () => {
  return (
    <div>
      <div
        className=" bg-cover bg-center  "
        style={{
          backgroundImage: `url(${nueral.src})`,
        }}
      >
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">
              Unlock Your Potential in Generative AI
            </span>
          </h2>

          <p className="mt-4 text-2xl leading-6 text-indigo-200 ">
            Join a thriving community transforming their careers with AI. Enroll
            now to master the skills shaping tomorrow.
          </p>

          <a
            href="#"
            className="mt-8 w-full inline-flex items-center justify-center px-5 font-semibold py-3 backdrop-blur-md border border-transparent text-white  rounded-md  bg-indigo-700 hover:bg-black

            hover:text-white sm:w-auto "
          >
            Join now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cta;
