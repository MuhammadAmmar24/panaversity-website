"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { ContactSchema } from "@/src/lib/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RiWhatsappLine } from "react-icons/ri";
import Link from "next/link";
import { FaLink } from "react-icons/fa6";

// Infer form types from ContactSchema
type ContactFormValues = z.infer<typeof ContactSchema>;

export default function ContactUs() {
  const [formStatus, setFormStatus] = useState<string | null>(null);

  // Initialize react-hook-form with zod schema
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    mode: "onChange", // Validate as the user types or changes focus
  });

  const onSubmit = (data: ContactFormValues) => {
    setFormStatus("Thank you for your message. We'll get back to you soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto my-[5rem] max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl bg-card shadow-lg">
          <div className="p-4 sm:p-10">
            <h2 className="mb-6 text-3xl font-semibold">Get in Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your Name"
                    className={`${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "transition duration-150 ease-in-out focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                    className={`${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "transition duration-150 ease-in-out focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="Subject"
                  className={`${
                    errors.subject
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "transition duration-150 ease-in-out focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200"
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Your message"
                  className={`h-32 ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "transition duration-150 ease-in-out focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full rounded-md bg-accent py-2 text-center font-medium text-white hover:bg-[#18c781]"
                disabled={!isValid} // Disable button if form is invalid
              >
                Send Message
              </Button>
            </form>
            {formStatus && <p className="mt-4 text-green-600">{formStatus}</p>}
          </div>

          <div className="bg-muted p-4 sm:p-10">
            <h2 className="mb-6 text-xl sm:text-2xl font-semibold">Contact Information</h2>
            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex items-center">
                <Mail className="mr-4 h-5 w-5 text-primary" />
                <span>info@panaversity.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-4 h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-4 h-5 w-5 text-primary" />
                <span>Virtual Campus, Panaversity</span>
              </div>
              <div className="flex items-center">
                <Link
                  href="https://whatsapp.com/channel/0029VanobNVHbFV2oZLXX125"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 transition cursor-pointer"
                >
                  <RiWhatsappLine className="h-5 w-5 text-primary" />
                  <span className="nav font-medium flex items-center gap-2">
                    Subscribe For Latest AI News <FaLink />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
