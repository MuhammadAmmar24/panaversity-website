import React from "react";


export default function Video() {
  return ( 
    <>
      <div>
        <div className="flex bg-background items-center justify-center h-[45rem] px-3  mt-[-12rem] sm:mt-[-5rem] md:mt-[0rem] lg:mt-[1rem] xl:mt-[2rem] w-auto -mb-[15rem] sm:-mb-[1rem] lg:mb-[2rem] xl:mb-[4rem] pt-[3rem]">
          <div className="w-auto md:h-[32rem]  lg:h-[32rem] xl:h-[40rem] rounded-[20px] md:rounded-[40px] z-30  bg-gray-200   dark:bg-gray-700  ">
          <video
           loop
           muted
           autoPlay
           playsInline
            className="w-auto md:h-[32rem]  lg:h-[32rem] xl:h-[40rem]  z-40 rounded-[20px] md:rounded-[40px] custom-control"
            >
            <source src={"/video/video.mp4"} type="video/mp4" />
          </video>
            </div>
        </div>
      </div>
      
    </>
  );
}
