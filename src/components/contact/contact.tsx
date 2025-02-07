"use client";

import { submitContactForm } from "@/src/app/actions/contactform";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ContactSchema } from "@/src/lib/schemas/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { RiWhatsappLine } from "react-icons/ri";
import Link from "next/link";
import { FaLink } from "react-icons/fa6";
import Captcha from "../Captcha";
import { toast } from "sonner";

type ContactFormValues = z.infer<typeof ContactSchema>;

const categories = [
  { value: "technical", label: "Technical Issue" },
  { value: "payment", label: "Payment Issue" },
  { value: "general", label: "General Query" },
  { value: "other", label: "Others" },
];

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<string | null>(null);

  // Define default values for the form fields
  const defaultValues = {
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
    mode: "onChange",
    defaultValues,
  });

  // Watch all form fields
  const watchedValues = watch();
  const watchedValuesString = JSON.stringify(watchedValues);
  const defaultValuesString = JSON.stringify(defaultValues);

  useEffect(() => {
    if (formStatus && watchedValuesString !== defaultValuesString) {
      setFormStatus(null);
    }
  }, [watchedValuesString, defaultValuesString]);

  const categoryValue = watch("category");

  const onSubmit: SubmitHandler<ContactFormValues> = async (values, e) => {
    setIsSubmitting(true);
    try {
      const formElement = e?.target as HTMLFormElement | undefined;
      if (!formElement) {
        toast.error("Form submission failed. Please try again.");
        return;
      }

      const formData = new FormData(formElement);
      const turnstileRes = formData.get("cf-turnstile-response") as string;

      if (!turnstileRes) {
        toast.error("Please verify before submitting.");
        return;
      }

      // Include the captcha token along with form values
      const payload = { ...values, captcha: turnstileRes };

      const result = await submitContactForm(payload);

      if (result.type === "success") {
        setFormStatus(
          "Thank you for your message. We'll get back to you soon!",
        );
        console.log("Form Success", formStatus)
        toast.success(result.message);
        // Reset the form to the defined default values
        reset(defaultValues);
      } else {
        setFormStatus(result.message);
        console.log("Form Error", formStatus)
        toast.error(result.message || "Failed to submit form. Please try again!");
      }
    } catch (error) {
      toast.error(
        "An error occurred while sending your message. Please try again.",
      );
      setFormStatus(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to determine if we should show the helper text for category
  const shouldShowHelper = !categoryValue && !touchedFields.category;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto my-[5rem] max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl bg-card shadow-lg">
          <div className="p-4 sm:p-10">
            <h2 className="mb-6 text-3xl font-semibold">Get in Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">
                    Name <span className="text-red-500">*</span>
                  </Label>
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

                <div>
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
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

              <div>
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={`${
                          errors.category
                            ? "border-red-500 focus:border-red-500"
                            : "transition duration-150 ease-in-out focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200"
                        }`}
                      >
                        <SelectValue placeholder="-- Select a category --" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
                {shouldShowHelper && (
                  <p className="mt-1 text-sm text-red-500">
                    Please select a category to proceed
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>
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

              <div>
                <Label htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </Label>
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

              <Captcha size="normal" />

              <Button
                type="submit"
                className="w-full rounded-md bg-accent py-2 text-center font-medium text-white hover:bg-[#18c781]"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
            {formStatus && (
              <p
                className={`mt-4 text-sm ${
                  formStatus.toLowerCase().includes("thank") 
                    ? "text-green-600" 
                    : "text-red-500"
                }`}
              >
                {formStatus}
              </p>
            )}
          </div>

          <div className="bg-muted p-4 sm:p-10">
            <h2 className="mb-6 text-xl font-semibold sm:text-2xl">
              Contact Information
            </h2>
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
                  className="flex cursor-pointer items-center space-x-4 transition"
                >
                  <RiWhatsappLine className="h-5 w-5 text-primary" />
                  <span className="nav flex items-center gap-2 font-medium">
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
