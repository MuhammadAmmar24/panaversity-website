import React from "react";


export default function Video() {
  return ( 
    <>
      <div>
        <div className="flex bg-background items-center justify-center h-[45rem] px-4  mt-[-12rem] sm:mt-[-5rem] md:mt-[0rem] lg:mt-[1rem] xl:mt-[2rem] w-auto  ">
          <div className="rounded-[20px] md:rounded-[40px] border-white/40 border bg-white/10 backdrop-blur-sm z-30 ">

          <video
            loop
            muted
            autoPlay
            playsInline={false}
            controls={false}
            preload="auto"
            className="w-auto md:h-[36rem] custom-video-controls z-40 rounded-[20px] md:rounded-[40px] "
            >
            <source src={"/video/video.mp4"} type="video/mp4" />
          </video>
            </div>
        </div>
      </div>
    </>
  );
}
