import react from "react";
import { privacypolicydata } from "@/src/constants/privacypolicy";



 const PrivacyPolicy = () => {
  return (

        <main className="min-h-screen bg-background ">

          {/* Header */}
          <div className="flex justify-center items-center bg-teamBg bg-cover">
          <div className="text-center w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] py-[7rem]">
            <h2 className="text-[1.8rem] sm:text-[2rem] md:text-[3.6rem] text-background font-bold font-poppins tracking-tighter"style={{ wordSpacing: '0.2em' }}>
              {privacypolicydata.headline1}
              <br />
               {privacypolicydata.headline2}
            </h2>
            <p className="text-background/60 mb-2 px-4 mt-4">
              {privacypolicydata.headline3}
            </p>
          </div>
        </div>

        {/* Privacy Policy */}
        <section className="lg:max-w-[950px] xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-[0rem] py-8 sm:py-12 lg:py-16">
            <div className="text-xl">
                <h2 className={"font-bold text-accent"} >
          
                  {privacypolicydata.head2}
                  </h2>
                <p>{privacypolicydata.paraline1}</p> 
                <p>{privacypolicydata.paraline1}</p>
    <div>
     <h2 className={"font-bold text-accent"}> {privacypolicydata.headpolicy1} </h2>
            <p>{privacypolicydata.policy1subhead}</p>
            <p>{privacypolicydata.policy1description1}</p>
            <p>{privacypolicydata.policy1description2} </p>
            <p>{privacypolicydata.policy1description3}</p>
    </div>

<div>
<h2 className={"font-bold text-accent"}>{privacypolicydata.headpolicy2}</h2>    
<p>{privacypolicydata.policy2subhead}</p>
   <p>{privacypolicydata.policy2description1}</p>
    <p>{privacypolicydata.policy2description2}</p>
     <p> {privacypolicydata.policy2description3} </p>
     <p> {privacypolicydata.policy2description4} </p>
     <p> {privacypolicydata.policy2description5} </p>
</div>
<div>
 <h2 className={"font-bold text-accent"}> {privacypolicydata.headpolicy3} </h2>
    <p> {privacypolicydata.policy3description1} </p>
</div> 


<div>
<h2 className={" font-bold text-accent"}> {privacypolicydata.headpolicy4} </h2>
<p> {privacypolicydata.policy4description1} </p>
</div>

<div>
<h2 className={" font-bold text-accent"}> {privacypolicydata.headpolicy5} </h2>
<p> {privacypolicydata.policy5description1} </p>
</div>


<div>
<h2 className={"font-bold text-accent"}> {privacypolicydata.headpolicy6} </h2>
<p>  {privacypolicydata.policy6description1} </p>
<p> {privacypolicydata.policy6description2} </p>
</div>


<div>
<h2 className={"font-bold text-accent"}>  {privacypolicydata.headpolicy7} </h2>
<p> {privacypolicydata.policy7description1} </p>
</div>


<div>
<h2 className={"font-bold text-accent"}> {privacypolicydata.headpolicy8} </h2>
 <p> {privacypolicydata.policy8description1} </p>
</div>


<div>
<h2 className={"font-bold text-accent"}> {privacypolicydata.headpolicy9} </h2>
<p> {privacypolicydata.policy9description1} </p> 
</div>
    </div>
    </section>
        </main>
    );
}

export default PrivacyPolicy();