import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { teamMembers } from "../constants/teams";
import PropTypes from "prop-types";
import Image from 'next/image'


const TeamMemberItem = ({ member }:any) => (
	<div className="bg-white mx-auto  w-[18rem] h-[16rem] text-black shadow-xl rounded-xl hover:-translate-y-1 duration-500  p-6 lg:p-8">
		<img
			src={member.picture}
			alt={member.fullName}
			className="max-w-full h-auto rounded-full border-4 p-1 border-blue-600 mx-auto"
			width="120"
		/>
		<div className="mt-6">
			<h4 className="text-xl font-medium mb-1">{member.fullName}</h4>
			<p className="mb-4 text-sm">{member.designation}</p>
			
			<div className="mt-6">
				{member.socialLinks.map((item:any, i:any) => (
					<a
						href={item.href}
						className={`inline-block opacity-60 transition duration-300 hover:translate-y-1 hover:opacity-100 ${
							i + 1 !== member.socialLinks.length && "mr-4"
						}`}
						key={i}
					>
						<FontAwesomeIcon icon={item.icon} />
					</a>
				))}
			</div>
		</div>
	</div>
);

TeamMemberItem.propTypes = {
	member: PropTypes.object.isRequired,
};

const Team = () => {
	return (
    <>
    <section className="h-screen flex justify-center items-center bg-slate-300">
      <div>
        <Image 
        alt="team"
        className="absolute w-[100rem] bg-black z-[-1] opacity-80 "
        height={800}
        width={800}
        src="/team.jpg"
        />
      </div>
    <div className="w-[90rem] text-center">
						<h2 className="text-3xl leading-none font-bold md:text-8xl  ">
            Meet the Visionaries Behind Panaversity
            						</h2>
						<p className="w-[40rem] mx-auto mt-9">
            Driven by Passion, Powered by Innovation – Discover the Experts Shaping the
            Future of AI Education
						</p>
					</div>
    </section>
		<section className="ezy__team9 light py-14 md:py-24 bg-white  text-zinc-900 ">
			<div className="container px-4 mx-auto">
				

				<div className="grid grid-cols-4 gap-6 text-center pt-6 ">
        
					{teamMembers.map((member, i) => (
						<div className="col-span-4 md:col-span-2 lg:col-span-1" key={i}>
              
              							<TeamMemberItem member={member} />
                            
						</div>
            
					))}
				</div>
        
			</div>
		</section>
    </>
	);
};
 export default Team;