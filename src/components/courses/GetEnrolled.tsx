// import { AiOutlineLoading3Quarters } from "react-icons/ai";

// export default function GetEnrolled({
//   program_id,
//   profile_id,
//   coursePrice,
//   pre_requisite,
//   student_courses,
//   sections,
// }: any) {

//   console.log(sections, "sections")

//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const [selectedDay, setSelectedDay] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
//   const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<number | null>(
//     null,
//   );
//   console.log(selectedSection, "selectedSection")
//   const [remainingSeats, setRemainingSeats] = useState<number | null>(null);
//   const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState("STRIPE"); // Add payment method state
//   const [skipped, setSkipped] = useState(true);

//   const findStudentCourse = (courseCode: string): StudentCourse | undefined =>
//     student_courses.find(
//       (course: StudentCourse) =>
//         course?.course_code?.trim() === courseCode.trim(),
//     );

//   const getCourseStatus = (
//     studentCourse: StudentCourse | undefined,
//     courseCode: string,
//   ) => {
//     if (!studentCourse) {
//       return {
//         statusText: "Not Enrolled",
//         statusClass: "text-red-600",
//         linkHref: `/programs/flagship-program/${courseCode.trim()}`,
//       };
//     }

//     if (studentCourse.is_graduated) {
//       return {
//         statusText: "Completed",
//         statusClass: "text-green-500",
//         linkHref: "/dashboard",
//       };
//     }

//     return {
//       statusText: "In Progress",
//       statusClass: "text-yellow-500",
//       linkHref: "/dashboard",
//     };
//   };

//   // const notEnrolledCourses =
//   //   pre_requisite?.filter(
//   //     (pre_req) => !findStudentCourse(pre_req.course_code),
//   //   ) || [];

//   // const hasNotEnrolledPreReq = notEnrolledCourses.length > 0;
//   // const skipText = `Skip ${
//   //   notEnrolledCourses.length === 1
//   //     ? "pre-requisite course"
//   //     : "all pre-requisite courses"
//   // }`;
//   // const skippedMessage = `You skipped ${
//   //   notEnrolledCourses.length === 1
//   //     ? "the pre-requisite course"
//   //     : "all pre-requisite courses"
//   // }`;

//   // const handleSkip = () => {
//   //   setSkipped(true);
//   // };

//   // useEffect(() => {
//   //   if (!hasNotEnrolledPreReq) {
//   //     setSkipped(true);
//   //   }
//   // }, [hasNotEnrolledPreReq]);

//   // const classTimeSlots = timeSlots.class_time_slots;
//   const enrollmentPackage = coursePrice.package_id;

//   // useEffect(() => {
//   //   if (selectedDay) {
//   //     const selectedSlot = classTimeSlots.find(
//   //       (slot) => slot.time_slot_day === selectedDay,
//   //     );
//   //     if (selectedSlot) {
//   //       const seats_left = selectedSlot.total_seats - selectedSlot.booked_seats;
//   //       seats_left > 0 ? setRemainingSeats(seats_left) : setRemainingSeats(0);
//   //     }
//   //   }
//   // }, [selectedDay, classTimeSlots, remainingSeats]);

//   // const uniqueDays = Array.from(
//   //   new Set(classTimeSlots.map((slot) => slot.time_slot_day)),
//   // );

//   const sectionNames = sections.map((sec:any)=>{
//     return sec.section_name

//   })

//   console.log(sectionNames, "sectionNames")

//   // const timeSlotsForSelectedDay = classTimeSlots
//   //   .filter((slot) => slot.time_slot_day === selectedDay)
//   //   .map((slot) => ({
//   //     id: slot.id,
//   //     timeSlotId: slot.id,
//   //     label: `${formatTime(slot.slot_start_time ?? "")} - ${formatTime(
//   //       slot.slot_end_time ?? "",
//   //     )}`,
//   //   }));

//   const handleEnroll = async () => {
//     if (
//       !selectedDay ||
//       !selectedTimeSlot ||
//       selectedTimeSlotId === null ||
//       enrollmentPackage === null
//     ) {
//       setEnrollmentError(
//         "Please select a valid time slot and ensure the package is available.",
//       );
//       return;
//     }

//     const payload = {
//       student_id: profile_id,
//       program_id,
//       section_id: sections.find(
//               (sec:any) => selectedSection === sec.section_name,
//             ), // change as per user selection
//       vendor_type: paymentMethod, // Pass the selected payment method
//       package_id: enrollmentPackage,
//       course_id:sections[0].course_id,
//     };

//     startTransition(async () => {
//       try {
//         const result = await enrollNewStudentInProgramAndCourse(payload);

//         if (result.type === "success") {
//           const url = result.data?.fee_voucher?.stripe?.stripe_url;
//           if (url) {
//             router.push(url);
//           } else {
//             router.push("/dashboard");
//           }
//         } else {
//           setEnrollmentError(
//             result.message || "An error occurred during enrollment.",
//           );
//         }
//       } catch (error) {
//         console.error("Unexpected error during enrollment:", error);
//         setEnrollmentError("Failed to enroll student. Please try again later.");
//       }
//     });
//   };

//   return (
//     <>
//       {/* <div className="bg container mx-auto max-w-full rounded-3xl px-0 sm:px-2">
//         <h1 className="mb-4 mt-5 text-3xl font-bold">Get Enrolled</h1>
//         <div className=" ">
//           <h1 className="mb-3 mt-5 text-xl font-bold">Prerequisites:</h1>
//           {Array.isArray(pre_requisite) && pre_requisite.length > 0 ? (
//             <div>
//               {pre_requisite.map((pre_req, index) => {
//                 const studentCourse = findStudentCourse(pre_req.course_code);
//                 const { statusText, statusClass, linkHref } = getCourseStatus(
//                   studentCourse,
//                   pre_req.course_code,
//                 );

//                 return (
//                   <div
//                     className="mb-3 rounded-lg border-2 px-4 py-1"
//                     key={index}
//                   >
//                     <Link href={linkHref}>
//                       <div className="text-base font-normal leading-relaxed text-textPrimary/90">
//                         <div className="flex items-center justify-between gap-4">
//                           <div className="flex flex-col items-start justify-center">
//                             <span className="underline decoration-accent decoration-2">
//                               {pre_req.course_code}
//                             </span>
//                             <span className="line-clamp-1 text-[0.6rem] font-normal text-textSecondary mobileM:text-[0.8rem] sm:text-[0.9rem]">
//                               {pre_req.course_name}
//                             </span>
//                           </div>
//                           <span
//                             className={`text-[0.6rem] mobileM:text-[0.8rem] sm:text-[1rem] ${statusClass}`}
//                           >
//                             {statusText}
//                           </span>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 );
//               })}
//               {hasNotEnrolledPreReq && (
//                 <div className="mt-4 flex items-center gap-3 px-4 lg:justify-between">
//                   {skipped || (
//                     <button
//                       onClick={handleSkip}
//                       className="rounded-lg border-2 border-blue-700 px-4 py-0.5 text-sm text-blue-700 transition-all duration-300 ease-in-out hover:bg-blue-700 hover:text-white"
//                     >
//                       Skip
//                     </button>
//                   )}
//                   <span className="text-[0.8rem] text-red-500 mobileM:text-[0.9rem] sm:text-[1rem]">
//                     {skipped ? skippedMessage : skipText}
//                   </span>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <p className="text-[0.9rem] font-normal leading-relaxed text-textPrimary/90">
//               There are no pre-requisites for this course.
//             </p>
//           )}
//         </div>
//       </div> */}

//       <div
//         className={`container mx-auto max-w-full rounded-3xl bg-background px-0 pt-[3rem] sm:px-2 ${!skipped ? "opacity-50" : "opacity-100"}`}
//       >
//         <div className="w-full space-y-7">
//           <SelectField
//             label="Section"
//             value={selectedSection}
//             onChange={(e: any) => {
//               setSelectedSection(e.target.value);
//               // setSelectedDay("");
//             }}
//             options={sectionNames}
//             placeholder="Select Section"
//             disabled={!skipped}
//           />

//           {/* <SelectField
//             label="Day"
//             value={selectedDay}
//             onChange={(e: any) => {
//               setSelectedDay(e.target.value);
//               setSelectedTimeSlot("");
//             }}
//             options={uniqueDays}
//             placeholder="Select Day"
//             disabled={!skipped || !selectedSection}
//           /> */}
// {/*
//           <SelectField
//             label="Time"
//             value={selectedTimeSlot}
//             onChange={(e: any) => {
//               setSelectedTimeSlot(e.target.value);
//               setSelectedTimeSlotId(parseInt(e.target.value, 10));
//             }}
//             options={timeSlotsForSelectedDay.map((slot) => ({
//               value: slot.timeSlotId.toString(),
//               label: slot.label,
//             }))}
//             placeholder="Select Time"
//             disabled={!selectedDay}
//           /> */}

//           <SelectField
//             label="Payment Method"
//             value={paymentMethod}
//             onChange={(e: any) => setPaymentMethod(e.target.value)}
//             options={[{ value: "STRIPE", label: "Stripe" }]} // Currently only Stripe
//             placeholder="Select Payment Method"
//             disabled={!skipped || !selectedSection}
//           />

//           <div className="mb-6 text-red-500">
//             <span className="text-lg font-semibold">Remaining Seats: </span>
//             <span className="text-lg">
//               {remainingSeats === null
//                 ? "..."
//                 : remainingSeats === 0
//                   ? "0"
//                   : remainingSeats}
//             </span>
//           </div>

//           {/* Payment Method Dropdown */}

//           <button
//             className={`flex w-full items-center justify-center rounded-lg p-3 font-semibold ${
//               selectedDay &&
//               selectedTimeSlot &&
//               !isPending &&
//               remainingSeats! > 0
//                 ? "bg-accent text-white hover:bg-[#18c781]"
//                 : "cursor-not-allowed bg-gray-300 text-gray-500"
//             }`}
//             disabled={
//               !selectedDay ||
//               !selectedTimeSlot ||
//               isPending ||
//               remainingSeats === 0
//             }
//             onClick={handleEnroll}
//           >
//             {isPending ? (
//               <>
//                 <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
//                 Enrolling...
//               </>
//             ) : (
//               "Enroll"
//             )}
//           </button>

//           {enrollmentError && (
//             <p className="mt-4 text-red-500">{enrollmentError}</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// function SelectField({
//   label,
//   value,
//   onChange,
//   options,
//   placeholder,
//   disabled = false,
// }: any) {
//   return (
//     <div>
//       <label htmlFor={label} className="mb-2 block text-lg font-semibold">
//         {label}
//       </label>
//       <div className="relative w-full">
//         <select
//           id={label}
//           className={`w-full appearance-none rounded-lg border bg-transparent p-3 pr-10 text-gray-700 focus:outline-none ${
//             value ? "border-accent" : "border-neutral-400"
//           }`}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//         >
//           <option value="" disabled hidden>
//             {placeholder}
//           </option>
//           {options.map((option: any) => (
//             <option key={option.value || option} value={option.value || option}>
//               {option.label || option}
//             </option>
//           ))}
//         </select>
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//           <svg
//             className="h-5 w-5 text-gray-400"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function GetEnrolled({
//   program_id,
//   profile_id,
//   coursePrice,
//   student_courses,
//   sections,
//   selected_section_name,
// }: any) {

// console.log(selected_section_name, "selected_section_name")

//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const [selectedSection, setSelectedSection] = useState<any>(selected_section_name);
//   const [paymentMethod, setPaymentMethod] = useState("STRIPE");
//   const [enrollmentError, setEnrollmentError] = useState<string | null>(null);

//   const handleSectionSelect = (sectionName: string) => {
//     const section = sections.find((sec: any) => sec.section_name === sectionName);
//     setSelectedSection(section);
//   };

//   const handleEnroll = async () => {
//     if (!selectedSection || !paymentMethod) {
//       setEnrollmentError("Please select a section and payment method.");
//       return;
//     }

//     const payload = {
//       student_id: profile_id,
//       program_id,
//       section_id: selectedSection.id,
//       vendor_type: paymentMethod,
//       package_id: coursePrice.package_id,
//       course_id: selectedSection.course_id,
//     };

//     startTransition(async () => {
//       try {
//         const result = await enrollNewStudentInProgramAndCourse(payload);

//         if (result.type === "success") {
//           const url = result.data?.fee_voucher?.stripe?.stripe_url;
//           if (url) {
//             router.push(url);
//           } else {
//             router.push("/dashboard");
//           }
//         } else {
//           setEnrollmentError(
//             result.message || "An error occurred during enrollment."
//           );
//         }
//       } catch (error) {
//         console.error("Unexpected error during enrollment:", error);
//         setEnrollmentError("Failed to enroll student. Please try again later.");
//       }
//     });
//   };

//   return (
//     <div className="container mx-auto max-w-full rounded-3xl bg-background px-0 pt-[3rem] sm:px-2">
//       <div className="w-full space-y-7">
//         {/* Section Selection Dropdown */}
//         <SelectField
//           label="Section"
//           value={selectedSection?.section_name || ""}
//           onChange={(e: any) => handleSectionSelect(e.target.value)}
//           options={sections.map((sec: any) => sec.section_name)}
//           placeholder="Select Section"
//         />

//         {/* Display Selected Section Details */}
//         {selectedSection && (
//           <div className="bg-gray-100 p-4 rounded-lg">
//             <h3 className="text-xl font-semibold mb-3">Section Details</h3>
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <strong>Section Code:</strong> {selectedSection.section_code}
//               </div>
//               <div>
//                 <strong>Language:</strong> {selectedSection.language}
//               </div>
//               <div>
//                 <strong>Total Seats:</strong> {selectedSection.total_seats}
//               </div>
//               <div>
//                 <strong>Booked Seats:</strong> {selectedSection.booked_seats}
//               </div>
//               <div>
//                 <strong>Class Dates:</strong>
//                 {new Date(selectedSection.start_date).toLocaleDateString()} -
//                 {new Date(selectedSection.end_date).toLocaleDateString()}
//               </div>
//             </div>

//             {/* Class Time Slots */}
//             <div className="mt-4">
//               <h4 className="font-semibold mb-2">Class Time Slots:</h4>
//               {selectedSection.class_time_slots.map((slot: any, index: number) => (
//                 <div key={index} className="bg-white p-2 rounded mb-2">
//                   <div>
//                     <strong>Day:</strong> {slot.time_slot_day}
//                   </div>
//                   <div>
//                     <strong>Time:</strong> {slot.slot_start_time} - {slot.slot_end_time}
//                   </div>
//                   <div>
//                     <strong>Instructor:</strong> {slot.instructor}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Payment Method Selection */}
//         <SelectField
//           label="Payment Method"
//           value={paymentMethod}
//           onChange={(e: any) => setPaymentMethod(e.target.value)}
//           options={[{ value: "STRIPE", label: "Stripe" }]}
//           placeholder="Select Payment Method"
//           disabled={!selectedSection}
//         />

//         {/* Enroll Button */}
//         <button
//           className={`flex w-full items-center justify-center rounded-lg p-3 font-semibold ${
//             selectedSection && !isPending
//               ? "bg-accent text-white hover:bg-[#18c781]"
//               : "cursor-not-allowed bg-gray-300 text-gray-500"
//           }`}
//           disabled={!selectedSection || isPending}
//           onClick={handleEnroll}
//         >
//           {isPending ? (
//             <>
//               <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
//               Enrolling...
//             </>
//           ) : (
//             "Enroll"
//           )}
//         </button>

//         {enrollmentError && (
//           <p className="mt-4 text-red-500">{enrollmentError}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// // Existing SelectField component remains the same
// function SelectField({
//   label,
//   value,
//   onChange,
//   options,
//   placeholder,
//   disabled = false,
// }: any) {
//   return (
//     <div>
//       <label htmlFor={label} className="mb-2 block text-lg font-semibold">
//         {label}
//       </label>
//       <div className="relative w-full">
//         <select
//           id={label}
//           className={`w-full appearance-none rounded-lg border bg-transparent p-3 pr-10 text-gray-700 focus:outline-none ${
//             value ? "border-accent" : "border-neutral-400"
//           }`}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//         >
//           <option value="" disabled hidden>
//             {placeholder}
//           </option>
//           {options.map((option: any) => (
//             <option key={option.value || option} value={option.value || option}>
//               {option.label || option}
//             </option>
//           ))}
//         </select>
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//           <svg
//             className="h-5 w-5 text-gray-400"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { enrollNewStudentInProgramAndCourse } from "@/src/app/actions/enrollment";
// import { formatTime } from "@/src/lib/timeUtils";
// import { GetEnrolledProps } from "@/src/types/courseEnrollment";
// import { StudentCourse } from "@/src/types/studentCourses";

// import { useState, useTransition, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/src/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/src/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/src/components/ui/select";
// import { Alert, AlertDescription } from "@/src/components/ui/alert";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/src/components/ui/accordion";
// import { Badge } from "@/src/components/ui/badge";
// import { Separator } from "@/src/components/ui/separator";
// import {
//   FaCalendarAlt,
//   FaClock,
//   FaUsers,
//   FaExclamationCircle,
//   FaCreditCard,
// } from "react-icons/fa";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { formatTimeToUserGMT } from "@/src/lib/FormatTimeToGMT";

// export default function GetEnrolled({
//   program_id,
//   profile_id,
//   coursePrice,
//   pre_requisite,
//   student_courses,
//   sections,
//   selected_section_name,
//   isEnrolled,
// }: any) {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [selectedSection, setSelectedSection] = useState<any>(
//     selected_section_name,
//   );
//   const [paymentMethod, setPaymentMethod] = useState("STRIPE");
//   const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
//   const [skipped, setSkipped] = useState(false);
//   const [isAccordionOpen, setIsAccordionOpen] =
//     useState<string>("prerequisites");
//   const [showReEnrollment, setShowReEnrollment] = useState(false);

//   const findStudentCourse = (courseCode: string) =>
//     student_courses.find(
//       (course: any) => course?.course_code?.trim() === courseCode.trim(),
//     );

//   const getCourseStatus = (studentCourse: any, courseCode: string) => {
//     if (!studentCourse) {
//       return {
//         statusText: "Not Enrolled",
//         statusClass: "text-red-600",
//         linkHref: `/programs/flagship-program/${courseCode.trim()}`,
//       };
//     }

//     if (studentCourse.is_graduated) {
//       return {
//         statusText: "Completed",
//         statusClass: "text-green-500",
//         linkHref: "/dashboard",
//       };
//     }

//     return {
//       statusText: "In Progress",
//       statusClass: "text-yellow-500",
//       linkHref: "/dashboard",
//     };
//   };

//   const notEnrolledCourses =
//     pre_requisite?.filter(
//       (pre_req: any) => !findStudentCourse(pre_req.course_code),
//     ) || [];

//   const hasNotEnrolledPreReq = notEnrolledCourses.length > 0;
//   const skipText = `Skip ${
//     notEnrolledCourses.length === 1
//       ? "pre-requisite course"
//       : "all pre-requisite courses"
//   }`;
//   const skippedMessage = `You skipped ${
//     notEnrolledCourses.length === 1
//       ? "the pre-requisite course"
//       : "all pre-requisite courses"
//   }`;

//   const handleSkip = () => {
//     setSkipped(true);
//     setIsAccordionOpen("");
//   };

//   useEffect(() => {
//     if (!hasNotEnrolledPreReq) {
//       setSkipped(true);
//     }
//   }, [hasNotEnrolledPreReq]);

//   const handleSectionSelect = (sectionName: string) => {
//     const section = sections.find(
//       (sec: any) => sec.section_name === sectionName,
//     );
//     setSelectedSection(section);
//   };

//   const handleEnroll = async () => {
//     if (!selectedSection || !paymentMethod) {
//       setEnrollmentError("Please select a section and payment method.");
//       return;
//     }

//     const payload = {
//       student_id: profile_id,
//       program_id,
//       section_id: selectedSection.id,
//       vendor_type: paymentMethod,
//       package_id: coursePrice.package_id,
//       course_id: selectedSection.course_id,
//     };

//     startTransition(async () => {
//       try {
//         const result = await enrollNewStudentInProgramAndCourse(payload);
//         if (result.type === "success") {
//           const url = result.data?.fee_voucher?.stripe?.stripe_url;
//           if (url) {
//             router.push(url);
//           } else {
//             router.push("/dashboard");
//           }
//         } else {
//           setEnrollmentError(
//             result.message || "An error occurred during enrollment.",
//           );
//         }
//       } catch (error) {
//         console.error("Unexpected error during enrollment:", error);
//         setEnrollmentError("Failed to enroll student. Please try again later.");
//       }
//     });
//   };

//   return (
//     <div className="mx-auto max-w-3xl bg-background">
//       <Card className="rounded-none border-0 bg-background shadow-none">
//         <CardHeader className="-mb-4">
//           <CardTitle className="text-3xl">Course Enrollment</CardTitle>
//           <CardDescription>
//             Select your preferred section and complete enrollment
//           </CardDescription>
//         </CardHeader>

//         <div className="mx-auto max-w-full rounded-3xl p-4 sm:p-5">
//           <Accordion
//             type="single"
//             collapsible
//             value={isAccordionOpen}
//             onValueChange={setIsAccordionOpen}
//           >
//             <AccordionItem value="prerequisites">
//               <AccordionTrigger className="text-xl font-bold hover:no-underline">
//                 Prerequisites
//               </AccordionTrigger>
//               <AccordionContent>
//                 {Array.isArray(pre_requisite) && pre_requisite.length > 0 ? (
//                   <div>
//                     {pre_requisite.map((pre_req, index) => {
//                       const studentCourse = findStudentCourse(
//                         pre_req.course_code,
//                       );
//                       const { statusText, statusClass, linkHref } =
//                         getCourseStatus(studentCourse, pre_req.course_code);

//                       return (
//                         <div
//                           className="mb-3 rounded-lg border-2 px-4 py-1 transition-all duration-300 ease-in-out hover:-translate-y-[1px]"
//                           key={index}
//                         >
//                           <Link href={linkHref}>
//                             <div className="text-base font-normal leading-relaxed text-textPrimary/90">
//                               <div className="flex items-center justify-between gap-4">
//                                 <div className="flex flex-col items-start justify-center">
//                                   <span className="underline decoration-accent decoration-2">
//                                     {pre_req.course_code}
//                                   </span>
//                                   <span className="line-clamp-1 text-[0.6rem] font-normal text-textSecondary mobileM:text-[0.8rem] sm:text-[0.9rem]">
//                                     {pre_req.course_name}
//                                   </span>
//                                 </div>
//                                 <span
//                                   className={`text-[0.6rem] mobileM:text-[0.8rem] sm:text-[1rem] ${statusClass}`}
//                                 >
//                                   {statusText}
//                                 </span>
//                               </div>
//                             </div>
//                           </Link>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <p className="text-[0.9rem] font-normal leading-relaxed text-muted-foreground">
//                     There are no pre-requisites for this course.
//                   </p>
//                 )}
//               </AccordionContent>
//             </AccordionItem>

//             {hasNotEnrolledPreReq && (
//               <div className="mt-3 flex items-center gap-3 lg:justify-between">
//                 {skipped || (
//                   <button
//                     onClick={handleSkip}
//                     className="rounded-lg border-2 border-blue-700 px-4 py-0.5 text-sm text-blue-700 transition-all duration-300 ease-in-out hover:bg-blue-700 hover:text-white"
//                   >
//                     Skip
//                   </button>
//                 )}
//                 <span className="text-[0.8rem] text-red-500 mobileM:text-[0.9rem] sm:text-[1rem]">
//                   {skipped ? skippedMessage : skipText}
//                 </span>
//               </div>
//             )}
//           </Accordion>
//         </div>

//       {isEnrolled && (
//       <div className="mx-auto max-w-3xl bg-background">
//       <Card className="rounded-none border-0 bg-background shadow-none">
//         <CardHeader>
//           <CardTitle className="text-3xl">Course Enrollment</CardTitle>
//           <CardDescription>You are already enrolled in this course</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="rounded-lg bg-gray-100 p-4">
//             <p className="text-lg font-medium">Already enrolled in course</p>
//           </div>
//           <div className="flex gap-4">
//             <Button
//               variant="outline"
//               className="flex-1 hover:border-accent  hover:bg-transparent transition-all duration-300 ease-in-out"
//               onClick={() => setShowReEnrollment(true)}
//             >
//               Re-enroll
//             </Button>
//             <Button
//               className="flex-1 bg-accent text-white hover:bg-[#18c781] transition-all duration-300 ease-in-out"
//               onClick={() => router.push("/dashboard")}
//             >
//               Go to Dashboard
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//     )}

//    <CardContent
//           className={`-mt-3 space-y-8 p-4 sm:p-6 ${!skipped ? "opacity-50" : "opacity-100"} `}
//         >
//           <div className="">
//             <label className="mb-2 block text-lg font-medium">Section</label>
//             <Select
//               value={selectedSection?.section_name}
//               onValueChange={handleSectionSelect}
//               disabled={!skipped}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a section" />
//               </SelectTrigger>
//               <SelectContent>
//                 {sections.map((sec: any) => (
//                   <SelectItem key={sec.section_name} value={sec.section_name}>
//                     {sec.section_name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {selectedSection && (
//             <div className="space-y-6">
//               <div className="space-y-3">
//                 <h3 className="text-xl font-semibold">
//                   {selectedSection.section_name}
//                 </h3>
//                 <div className="flex gap-4">
//                   <Badge variant="outline">
//                     {selectedSection.section_code}
//                   </Badge>
//                   <Badge variant="outline">{selectedSection.language}</Badge>
//                 </div>
//               </div>
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="flex items-baseline gap-2">
//                   <FaUsers className="h-4 w-4 text-muted-foreground" />
//                   <div className="flex flex-col">
//                     <p className="text-sm text-muted-foreground">
//                       Available Seats
//                     </p>
//                     <p className="text-sm font-medium">
//                       {selectedSection.total_seats -
//                         selectedSection.booked_seats}{" "}
//                       of {selectedSection.total_seats}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-baseline gap-2 sm:place-self-end">
//                   <FaCalendarAlt className="h-4 w-4 text-muted-foreground" />
//                   <div className="flex flex-col">
//                     <p className="text-sm text-muted-foreground">
//                       Class Start Date
//                     </p>
//                     <p className="text-sm font-medium">
//                       {new Date(selectedSection.start_date!).toLocaleDateString(
//                         "en-US",
//                         {
//                           year: "numeric",
//                           month: "short",
//                           day: "2-digit",
//                         },
//                       )}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <Separator />
//               <div className="space-y-2">
//                 <h4 className="mb-3 text-base font-medium">Class Schedule</h4>
//                 <div className="grid gap-0">
//                   {selectedSection.class_time_slots.map(
//                     (slot: any, index: number) => (
//                       <div
//                         key={index}
//                         className="flex flex-col rounded-md bg-muted/20 p-2 text-sm sm:flex-row sm:items-center sm:justify-between"
//                       >
//                         <div className="mb-1 flex items-center gap-2 sm:mb-0">
//                           <FaClock className="h-4 w-4 capitalize text-muted-foreground" />
//                           <span>{slot.time_slot_day.slice(0, 3)}</span>
//                         </div>
//                         <span className="text-muted-foreground sm:mx-2">
//                           {formatTimeToUserGMT(slot.slot_start_time)} -{" "}
//                           {formatTimeToUserGMT(slot.slot_end_time)}
//                         </span>
//                         {/* <Badge variant="secondary" className="text-xs self-start sm:self-auto mt-1 sm:mt-0">{slot.instructor}</Badge> */}
//                       </div>
//                     ),
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="">
//             <label className="mb-2 block text-lg font-medium">
//               Payment Method
//             </label>
//             <Select
//               value={paymentMethod}
//               onValueChange={setPaymentMethod}
//               disabled={!selectedSection || !skipped}
//             >
//               <SelectTrigger>
//                 <SelectValue>
//                   <div className="flex items-center gap-2">
//                     <FaCreditCard className="h-4 w-4" />
//                     Stripe
//                   </div>
//                 </SelectValue>
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="STRIPE">
//                   <div className="flex items-center gap-2">
//                     <FaCreditCard className="h-4 w-4" />
//                     Stripe
//                   </div>
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {enrollmentError && (
//             <Alert
//               variant="destructive"
//               className="flex items-center gap-2 border-2"
//             >
//               <div>
//                 <FaExclamationCircle className="h-4 w-4" />
//               </div>
//               <div>
//                 <AlertDescription>{enrollmentError}</AlertDescription>
//               </div>
//             </Alert>
//           )}

//           <Button
//             className={`flex w-full items-center justify-center rounded-lg p-3 font-semibold ${
//               selectedSection && !isPending && skipped
//                 ? "bg-accent text-white hover:bg-[#18c781]"
//                 : "cursor-not-allowed bg-gray-300 text-gray-500 hover:bg-gray-300"
//             }`}
//             size="lg"
//             disabled={!selectedSection || isPending || !skipped}
//             onClick={handleEnroll}
//           >
//             {isPending ? (
//               <>
//                 <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
//                 Enrolling...
//               </>
//             ) : (
//               "Enroll"
//             )}
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaExclamationCircle,
  FaCreditCard,
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { enrollNewStudentInProgramAndCourse } from "@/src/app/actions/enrollment";
import { formatTimeToUserGMT } from "@/src/lib/FormatTimeToGMT";

export default function GetEnrolled({
  program_id,
  profile_id,
  coursePrice,
  pre_requisite,
  student_courses,
  sections,
  selected_section_name,
  isEnrolled,
}: any) {



  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedSection, setSelectedSection] = useState<any>(
    selected_section_name,
  );
  const [paymentMethod, setPaymentMethod] = useState("STRIPE");
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [showReEnrollment, setShowReEnrollment] = useState(false);
  const [skippedPrerequisites, setSkippedPrerequisites] = useState(false);
  const [hasSkippedPrerequisites, setHasSkippedPrerequisites] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState<string | undefined>(
    "prerequisites",
  );
  const [skipped, setSkipped] = useState(false);
  const [skippedMessage, setSkippedMessage] = useState("");

  const findStudentCourse = (courseCode: string) =>
    student_courses.find(
      (course: any) => course?.course_code?.trim() === courseCode.trim(),
    );

  const getCourseStatus = (studentCourse: any, courseCode: string) => {
    if (!studentCourse) {
      return {
        statusText: "Not Enrolled",
        statusClass: "text-red-600",
        linkHref: `/programs/flagship-program/${courseCode.trim()}`,
      };
    }

    if (studentCourse.is_graduated) {
      return {
        statusText: "Completed",
        statusClass: "text-green-500",
        linkHref: "/dashboard",
      };
    }

    return {
      statusText: "In Progress",
      statusClass: "text-yellow-500",
      linkHref: "/dashboard",
    };
  };

  const notEnrolledCourses = pre_requisite.filter(
    (pre_req: any) => !findStudentCourse(pre_req.course_code),
  );


  useEffect(() => {

    if (!notEnrolledCourses.length) {
      setSkipped(true);
    }

    const message =
      notEnrolledCourses.length === 1
        ? "pre-requisite course"
        : "all pre-requisite courses";

    if (!skipped) {
      setSkippedMessage(`Skip ${message}`);
    } else {
      setSkippedMessage(`You skipped ${message}`);
    }
  }, [notEnrolledCourses.length, skipped]);

  const handleSectionSelect = (sectionName: string) => {
    const section = sections.find(
      (sec: any) => sec.section_name === sectionName,
    );
    setSelectedSection(section);
  };

  const handleEnroll = async () => {
    if (!selectedSection || !paymentMethod) {
      setEnrollmentError("Please select a section and payment method.");
      return;
    }

    const payload = {
      student_id: profile_id,
      program_id,
      section_id: selectedSection.id,
      vendor_type: paymentMethod,
      package_id: coursePrice.package_id,
      course_id: selectedSection.course_id,
    };

    startTransition(async () => {
      try {
        const result = await enrollNewStudentInProgramAndCourse(payload);
        if (result.type === "success") {
          const url = result.data?.fee_voucher?.stripe?.stripe_url;
          if (url) {
            router.push(url);
          } else {
            router.push("/dashboard");
          }
        } else {
          setEnrollmentError(
            result.message || "An error occurred during enrollment.",
          );
        }
      } catch (error) {
        console.error("Unexpected error during enrollment:", error);
        setEnrollmentError("Failed to enroll student. Please try again later.");
      }
    });
  };

  const handleSkip = () => {
    setSkipped(true);
    // setHasSkippedPrerequisites(true);
    setIsAccordionOpen("");
  };

  const isEnrollButtonDisabled =
    !selectedSection ||
    isPending ||
    (isEnrolled && !showReEnrollment) ||
    (isEnrolled && showReEnrollment && !hasSkippedPrerequisites);

  const renderPrerequisites = () => (
    <div className="mx-auto max-w-full rounded-3xl p-4 sm:p-5">
      <Accordion
        type="single"
        collapsible
        value={isAccordionOpen}
        onValueChange={setIsAccordionOpen}
      >
        <AccordionItem value="prerequisites">
          <AccordionTrigger className="text-xl font-bold hover:no-underline">
            Prerequisites
          </AccordionTrigger>
          <AccordionContent>
            {pre_requisite.length > 0 ? (
              <div>
                {pre_requisite.map((pre_req: any, index: any) => {
                  const { statusText, statusClass, linkHref } = getCourseStatus(
                    findStudentCourse(pre_req.course_code),
                    pre_req.course_code,
                  );

                  return (
                    <div
                      className="mb-3 rounded-lg border-2 px-4 py-1 transition-all duration-300 ease-in-out hover:-translate-y-[1px] hover:shadow-md"
                      key={index}
                    >
                      <Link href={linkHref}>
                        <div className="text-base font-normal leading-relaxed text-textPrimary/90">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-col items-start justify-center">
                              <span className="underline decoration-accent decoration-2">
                                {pre_req.course_code}
                              </span>
                              <span className="line-clamp-1 text-[0.6rem] font-normal text-textSecondary mobileM:text-[0.8rem] sm:text-[0.9rem]">
                                {pre_req.course_name}
                              </span>
                            </div>
                            <span
                              className={`text-[0.6rem] mobileM:text-[0.8rem] sm:text-[1rem] ${statusClass}`}
                            >
                              {statusText}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[0.9rem] font-normal leading-relaxed text-muted-foreground">
                There are no pre-requisites for this course.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {!hasSkippedPrerequisites && pre_requisite.length > 0 && (
        <div className="mt-3 flex items-center gap-3 lg:justify-between">
          {skipped || (
            <Button
              onClick={handleSkip}
              className="rounded-lg px-6 py-0.5 text-sm transition-all duration-300 ease-in-out hover:bg-gray-950/80"
            >
              Skip
            </Button>
          )}
          <span className="text-[0.8rem] text-red-500 mobileM:text-[0.9rem] sm:text-[1rem]">
            {skippedMessage}
          </span>
        </div>
      )}
    </div>
  );

  const renderEnrollmentForm = () => (
    <CardContent
      className={`space-y-8 ${(isEnrolled && !skipped) || (!isEnrolled && !skipped) ? "opacity-50" : "opacity-100"
        }`}
    >

      <div>
        <label className="mb-2 block text-lg font-medium">Section</label>
        <Select
  value={selectedSection?.section_name}
  onValueChange={handleSectionSelect}
  disabled={
    isEnrolled && !skipped || !isEnrolled && !skipped
  }
>

          <SelectTrigger>
            <SelectValue placeholder="Select a section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((sec: any) => (
              <SelectItem key={sec.section_name} value={sec.section_name}>
                {sec.section_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedSection && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">
              {selectedSection.section_name}
            </h3>
            <div className="flex gap-4">
              <Badge variant="outline">{selectedSection.section_code}</Badge>
              <Badge variant="outline">{selectedSection.language}</Badge>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-baseline gap-2">
              <FaUsers className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground">Available Seats</p>
                <p className="text-sm font-medium">
                  {selectedSection.total_seats - selectedSection.booked_seats}{" "}
                  of {selectedSection.total_seats}
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-2 sm:place-self-end">
              <FaCalendarAlt className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground">
                  Class Start Date
                </p>
                <p className="text-sm font-medium">
                  {new Date(selectedSection.start_date!).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    },
                  )}
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <h4 className="mb-3 text-base font-medium">Class Schedule</h4>
            <div className="grid gap-0">
              {selectedSection.class_time_slots.map(
                (slot: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-md bg-muted/20 p-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="mb-1 flex items-center gap-2 sm:mb-0">
                      <FaClock className="h-4 w-4 capitalize text-muted-foreground" />
                      <span>{slot.time_slot_day.slice(0, 3)}</span>
                    </div>
                    <span className="text-muted-foreground sm:mx-2">
                      {formatTimeToUserGMT(slot.slot_start_time)} -{" "}
                      {formatTimeToUserGMT(slot.slot_end_time)}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="mb-2 block text-lg font-medium">Payment Method</label>
        <Select
  value={paymentMethod}
  onValueChange={setPaymentMethod}
  disabled={
    isEnrolled && !skipped || !isEnrolled && !skipped
  }
>

          <SelectTrigger>
            <SelectValue>
              <div className="flex items-center gap-2">
                <FaCreditCard className="h-4 w-4" />
                Stripe
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="STRIPE">
              <div className="flex items-center gap-2">
                <FaCreditCard className="h-4 w-4" />
                Stripe
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {enrollmentError && (
        <Alert
          variant="destructive"
          className="flex items-center gap-2 border-2"
        >
          <div>
            <FaExclamationCircle className="h-4 w-4" />
          </div>
          <div>
            <AlertDescription>{enrollmentError}</AlertDescription>
          </div>
        </Alert>
      )}

<Button
  className={`flex w-full items-center justify-center rounded-lg p-3 font-semibold transition-all duration-300 ease-in-out ${(isEnrolled && !skipped) || (!isEnrolled && !skipped)
      ? "cursor-not-allowed bg-gray-300 text-gray-500 hover:bg-gray-300" 
      : "bg-accent text-white hover:bg-[#18c781]"
  }`}
  size="lg"
  disabled={
    isEnrolled && !skipped || !isEnrolled && !skipped
  }
  onClick={handleEnroll}
>

        {isPending ? (
          <>
            <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
            Enrolling...
          </>
        ) : (
          "Enroll"
        )}
      </Button>
    </CardContent>
  );

  return (
    <div className="mx-auto max-w-3xl bg-background">
      <Card className="rounded-none border-0 bg-background shadow-none">
        <CardHeader>
          <CardTitle className="text-3xl">Course Enrollment</CardTitle>
          <CardDescription>
            {isEnrolled
              ? showReEnrollment
                ? "Select your preferred section and complete re-enrollment"
                : "You are already enrolled in this course"
              : "Select your preferred section and complete enrollment"}
          </CardDescription>
        </CardHeader>
        {isEnrolled && !showReEnrollment && (
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-gray-100 p-4">
              <p className="text-lg font-medium">Already enrolled in course</p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 transition-all duration-300 ease-in-out hover:border-accent hover:bg-transparent"
                onClick={() => setShowReEnrollment(true)}
              >
                Enroll Again
              </Button>
              <Button
                className="flex-1 bg-accent text-white transition-all duration-300 ease-in-out hover:bg-[#18c781]"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        )}
        {((isEnrolled && showReEnrollment) || !isEnrolled) && renderPrerequisites()}
        {renderEnrollmentForm()}
      </Card>
    </div>
  );
}
