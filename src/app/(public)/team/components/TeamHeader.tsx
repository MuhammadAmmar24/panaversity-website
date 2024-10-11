import React from "react";

const TeamHeader = () => (
  <div className="flex justify-center items-center bg-teamBg bg-cover">
    <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] py-[7rem]">
      <h2
        className="text-[1.8rem] sm:text-[2rem] md:text-[3.6rem] text-background font-bold font-poppins tracking-tighter"
        style={{ wordSpacing: "0.2em" }}
      >
        Meet The Visionaries Behind 
        <br />
        Panaversity
      </h2>
      <p className="text-background/60 mb-2 px-4 mt-4">
        Discover the Experts Shaping the Future of AI Education
      </p>
    </div>
  </div>
);

export default TeamHeader;
