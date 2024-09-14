import React from "react";
export default function VideoSkeleton() {
  return ( 
    <>       
   <div>
        <div className="flex bg-slate-400 items-center justify-center w-auto md:h-[32rem]  lg:h-[32rem] xl:h-[40rem]  z-40 rounded-[20px] md:rounded-[40px]">
          <div className="rounded-[20px] md:rounded-[40px] z-30">     
            <div >
                <p>Loading...</p>
            </div>
             
        </div>
        </div>
      </div>
    </>
  );
}
