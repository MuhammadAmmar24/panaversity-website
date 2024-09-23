import React from 'react';
import { ChevronRight, Users, User, Calendar } from 'lucide-react';
import { Check } from 'lucide-react';
import GetEnrolled from '@/src/components/GetEnrolled';
import { Sheet, SheetTrigger, SheetContent } from '@/src/components/ui/sheet';  // Importing existing Sheet component

const learnPoints = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
];

const CourseDetails = () => {
    return (
        <main>
            <section className="flex justify-center items-center bg-teamBg bg-cover text-white ">
                <div className='w-full backdrop-brightness-75 backdrop-opacity-100 bg-blur-[1px] '>
                    <div className="container mx-auto lg:max-w-[950px] xl:max-w-6xl pt-6 pb-8">
                        {/* Breadcrumbs */}
                        <nav className="mb-8">
                            <ol className="flex items-center space-x-2 text-sm font-semibold">
                                <li>Home</li>
                                <ChevronRight className="w-4 h-4" />
                                <li>Programs</li>
                                <ChevronRight className="w-4 h-4" />
                                <li>Applied Gen AI Core Level</li>
                            </ol>
                        </nav>

                        {/* Course Content */}
                        <div className="flex flex-col lg:flex-row lg:space-x-8">
                            {/* Course Info */}
                            <div className="lg:w-2/3">
                                <p className="underline font-semibold">Panaversity</p>
                                <h1 className="font-bold mb-2 text-[1.8rem] sm:text-[2rem] md:text-[3rem] text-background font-poppins">GEN AI & CLOUD BASICS</h1>
                                <p className="mb-8 text-gray-100 text-base font-medium leading-relaxed max-w-[600px]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>

                                {/* Instructor, Learners, and Duration */}
                                <div className="flex flex-wrap items-center gap-6 gap-y-2 mb-8 font-medium">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-5 h-5" />
                                        <span>Instructor: Sarah Jhons</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-5 h-5" />
                                        <span>20,000+ Learners</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-5 h-5" />
                                        <span>Duration: 3 months</span>
                                    </div>
                                </div>

                                {/* Ratings */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl font-bold">4.8</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-400 font-medium">(1,249 ratings)</span> <span className='text-sm text-gray-400 font-medium'>2,945 students</span>
                                </div>
                            </div>

                            <div className="lg:w-1/3 mt-8 lg:mt-12 w-full md:w-fit">
                                <div className="bg-background text-black p-6 rounded-lg">
                                    <div className="flex items-center justify-between gap-40 mb-4">
                                        <span className="text-gray-900 font-medium text-lg">Price:</span>
                                        <span className="text-3xl font-bold">$500</span>
                                    </div>

                                    {/* Enrol Now Button as SheetTrigger */}
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <button className="w-full bg-accent text-white py-3 rounded-md font-semibold flex items-center justify-center hover:bg-emerald-500">
                                                Enroll Now
                                                <ChevronRight className="w-5 h-5 ml-2" />
                                            </button>
                                        </SheetTrigger>

                                        {/* Sheet Content */}
                                        <SheetContent
                                          side="right"
                                          className="md:max-w-[700px] w-full overflow-y-auto" 
                                        >
                                            <GetEnrolled />
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='container mx-auto lg:max-w-[950px] xl:max-w-6xl mt-16'>
                <div className="flex flex-col justify-start items-start gap-8 mx-auto">
                    <h2 className="text-center text-[35px] md:text-[40px] font-semibold font-poppins leading-[53.20px] text-textPrimary">
                        Details
                    </h2>
                    <p className="w-full text-base font-normal leading-relaxed text-textPrimary/90">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>

                {/* What You Will Learn Section */}
                <div className="bg-gray-300/40 flex flex-col justify-start items-start gap-5 p-10 rounded-md mt-12">
                    <h3 className="text-2xl font-semibold leading-loose text-textPrimary">
                        What you will learn in this course
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {learnPoints.map((point, index) => (
                            <div key={index} className="flex gap-3 items-start">
                                <div className='bg-green-500 rounded-full'>
                                    <Check className="text-white" />
                                </div>
                                <p className="text-sm font-normal text-textPrimary">
                                    {point}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pre-Requisite Section */}
                <div className="mt-12 mb-20">
                    <h2 className="text-textPrimary text-[35px] md:text-[40px] font-semibold font-poppins leading-[53.20px]">
                        Pre Requisite
                    </h2>
                    <h3 className="mt-8 text-textPrimary text-base font-semibold">
                        General Requirements
                    </h3>
                    <p className="w-full text-textPrimary/90 text-base font-normal leading-[34.32px] mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default CourseDetails;
