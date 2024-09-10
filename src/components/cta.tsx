import React from 'react';
import Image from 'next/image';
import neural from "../../public/cta/neural4.avif" 



const Cta = () => {
  return (
    <div  >
      <div
        className=" bg-cover bg-center  "
        style={{
          backgroundImage: `url(${neural.src})`,
        }}
      >
        <div className="max-w-lg mx-auto text-center py-4  sm:px-12 sm:px-6 lg:px-8 rounded-3xl border-white/40 border bg-white/10 backdrop-blur-xl">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Unlock Your Potential in Generative AI</span>
          </h2>
          <p className=" text-2xl py-3 leading-6 text-indigo-200 ">  
Join a thriving community transforming their careers with AI. Enroll now to 
 master the skills shaping tomorrow.
          </p>
          <a
            href="#"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 font-semibold  border border-transparent text-white font-medium rounded-md   bg-indigo-700 hover:bg-black
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