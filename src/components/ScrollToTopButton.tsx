"use client"
import React, { useState, useEffect } from "react";

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => {
        if (window.scrollY > 1000) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed lg:bottom-[3rem] lg:right-10 bottom-6 right-5 p-2  backdrop-blur-sm shadow-lg bg-accent hover:bg-green-500 text-gray-800 rounded-full transition-all duration-300 z-50"
                >
                    <svg
                        className="h-5 w-5 transform rotate-[-90deg]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;