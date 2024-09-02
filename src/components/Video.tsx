import React from "react";

export default function Video() {
  return (
    <>
      <div>
        <div className="flex items-center justify-center mt-[-6rem] px-4 md:mt-[5rem] w-auto h-[25rem] mb-[8rem]   ">
          <video
            loop
            muted
            autoPlay
            playsInline={false}
            controls={false}
            preload="auto"
            className="w-auto h-[45rem] custom-video-controls  rounded-[40px]"
          >
            <source src={"/video.mp4"} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
}
