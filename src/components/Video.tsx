import React from "react";

export default function Video() {
  return (
    <>
      <div>
        <div className="flex bg-background items-center justify-center h-[45rem] mt-[-20rem] px-4  lg:mt-[-5rem] w-auto  mb-[8rem] ">
          <div className="rounded-[20px] md:rounded-[40px] z-30 ">

          <video
            loop
            muted
            autoPlay
            playsInline={false}
            controls={false}
            preload="auto"
            className="w-auto md:h-[45rem] custom-video-controls z-40 rounded-[20px] md:rounded-[40px] "
            >
            <source src={"/video.mp4"} type="video/mp4" />
          </video>
            </div>
        </div>
      </div>
    </>
  );
}
