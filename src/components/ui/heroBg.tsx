import React from "react";
import Image from "next/image";

export const HeroBg = () => (
  <>
    <Image
      src={"/heroBg/heroBg.gif"}
      alt={""}
      width={500}
      height={500}
      priority
      className="w-full  "
    />
  </>
);
