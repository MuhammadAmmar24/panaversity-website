import Image from "next/image";
import Link from "next/link";

import Marquee from "react-fast-marquee";

const Partners = () => {
  return (
    // <div className=" max-w-full ">
    <>
      <section id="">
        {" "}
        <div
          
          className=" text-5xl md:text-7xl text-center font-bold md:gap-5 gap-0 md:min-w-[949px] flex items-center  justify-center md:mt-32 mt-28"
        >
          <h1
           
            className="text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] mb-10 text-primary font-bold font-poppins tracking-tighter"
          >
            Our Programs
          </h1>
        </div>
        <div>
          <div className=" w-screen md:w-[75%] flex gap-10 text-center md:m-auto mt-4 items-center justify-center">
            <Marquee
              gradient
              gradientColor="#fbfbfe"
              autoFill
              pauseOnHover
              pauseOnClick
              className="gap-10 mb-[1.8rem]"
            >
              <Link href="/">
                <div className="ml-[3rem]">
                  <Image
                    src={"/logos/goversindh.png"}
                    width={90}
                    height={90}
                    alt="Panaverse"
                  />
                </div>
              </Link>
              <Link href="/">
                <div className="ml-[3rem]">
                  <Image
                    src={"/logos/kpk.png"}
                    width={100}
                    height={100}
                    alt="Panaverse"
                  />
                </div>
              </Link>
              <Link href="/">
                <div className="ml-[3rem]">
                  <Image
                    src={"/logos/piaic.png"}
                    width={100}
                    height={200}
                    alt="Panaverse"
                  />
                </div>
              </Link>
              {/* <Link href="/">
                <div className="ml-[3rem]">
                  <Image
                    src={"/partner4.svg"}
                    width={300}
                    height={300}
                    alt="Panaverse"
                  />
                </div>
              </Link> */}
            </Marquee>
          </div>
        </div>
      </section>
    </>

    // </div>
  );
};

export default Partners;
