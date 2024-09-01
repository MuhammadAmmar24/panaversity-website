"use client"
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Image from "next/image";
import { faqList } from "../constants/faqs";


const FaqItem = ({ faq }:any) => {
	const [isOpen, setIsOpen] = useState(faq.isActive || false);

	const toggleFaq = () => setIsOpen(!isOpen);

	return (
		<div className={`${isOpen && "active"} rounded-lg`}>
			<a
				href="#!"
				className="btn p-4 lg:p-6 w-full text-start flex justify-between items-center cursor-pointer"
				onClick={toggleFaq}
			>
				<span>{faq.question}</span>
				<FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
			</a>
			<div
				className={`${
					isOpen ? "block" : "hidden"
				} p-4 lg:p-6 bg-white shadow dark:shadow-none  rounded-xl`}
			>
				<p className="opacity-50">{faq.answer}</p>
			</div>
		</div>
	);
};

FaqItem.propTypes = {
	faq: PropTypes.object.isRequired,
};

const Faq = () => {
	return (
		<section className="ezy__faq10 light py-14 md:py-24 bg-white text-zinc-900 ">
			<div className="container px-16 md:px-8 lg:px-28  mx-auto">
				<div className="grid grid-cols-12 ">
					<div className="col-span-12 lg:col-span-8 mb-12">
						<h2 className="font-bold text-[25px] md:text-[45px] leading-none mb-6">
							Frequently Asked Questions
						</h2>
						<p className="text-lg opacity-70">
							Assumenda non repellendus distinctio nihil dicta sapiente,
							quibusdam maiores, illum at, aliquid blanditiis eligendi
							qui.Assumenda non repellendus distinctio nihil dicta sapiente,
							quibusdam maiores.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-6 justify-between">
					<div className="col-span-12 md:col-span-4 mb-6 md:mb-0">
						<div
							className="bg-center  bg-no-repeat bg-cover min-h-[150px] w-full  h-full"
							
                            
						>
                            <Image
                            src="/faq.jpg"
                            alt="faq"
                            width={500}
                            height={500}
                            
							className="rounded-2xl"
                            
                            /></div>
					</div>
					<div className="col-span-12 md:col-span-8 lg:pl-12">
						{faqList.map((faq, i) => (
							<FaqItem faq={faq} key={i} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Faq;
