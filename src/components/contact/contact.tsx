"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactSchema } from "@/src/schemas/userschema";
import * as z from "zod";

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
    console.log(data); // Log the validated data
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto mt-[5rem] px-4 sm:px-6 lg:px-8">
        <div className="bg-card shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 sm:p-10">
            <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your Name"
                    className={`${
                      errors.name
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "focus:ring-primary focus:border-primary"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
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
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "focus:ring-primary focus:border-primary"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
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
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-primary focus:border-primary"
                  }`}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
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
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-primary focus:border-primary"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full text-center py-2 text-white rounded-md bg-accent hover:bg-[#18c781] font-medium"
                disabled={!isValid} // Disable button if form is invalid
              >
                Send Message
              </Button>
            </form>
            {formStatus && (
              <p className="mt-4 text-green-600">{formStatus}</p>
            )}
          </div>

          <div className="bg-muted p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-4" />
                <span>info@panaversity.org</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-primary mr-4" />
                <span>Virtual Campus, Panaversity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
