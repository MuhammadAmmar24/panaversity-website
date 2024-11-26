export default function Video() {
  return (
    <>
      <div>
        <div className="-mb-[15rem] mt-[-12rem] flex h-[45rem] w-auto items-center justify-center bg-background px-3 pt-[3rem] sm:-mb-[1rem] sm:mt-[-5rem] md:mt-[-2rem] md:mb-[-12rem] lg:mb-[2rem] lg:mt-[1rem] xl:mb-[4rem] xl:mt-[2rem]  ">
          <div className="z-30 w-auto rounded-[20px] bg-gray-200 md:h-[25rem]  md:rounded-[40px]  lg:h-[32rem] xl:h-[40rem]">
            <video
              loop
              muted
              autoPlay
              playsInline
              className="custom-control z-40 w-auto rounded-[20px] ssm:h-[20rem] md:h-[25rem] md:rounded-[40px]  lg:h-[32rem] xl:h-[40rem]"
            >
              <source src={"/video/video.mp4"} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </>
  );
}
