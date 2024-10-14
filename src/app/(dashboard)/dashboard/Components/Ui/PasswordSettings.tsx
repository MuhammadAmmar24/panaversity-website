"use client";
import { useState, useEffect, useRef, useTransition } from "react";
import { PasswordUpdateSchema } from "@/src/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import * as z from "zod";
import { useToast } from "@/src/components/ui/use-toast";
import { Button } from "@/src/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { FormError } from "@/src/components/form-error";
import { FormSuccess } from "@/src/components/form-success";
import { changePassword } from "@/src/app/actions/change-password";
import { signOut } from "@/src/auth";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

type VerifyEmailProps = {
  profile_email: string;
};

function PasswordSettings({ profile_email }: VerifyEmailProps) {
  const [isOpen, setIsOpen] = useState(false); // Toggle for the password settings dropdown

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const { toast } = useToast();
  const [showPasswordCurrent, setShowPasswordCurrent] =
    useState<boolean>(false);
  const [showPasswordNew, setShowPasswordNew] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PasswordUpdateSchema>>({
    resolver: zodResolver(PasswordUpdateSchema),
    defaultValues: {
      email: profile_email,
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const formRef = useRef<HTMLDivElement | null>(null); // Ref to scroll into view when dropdown opens

  // Toggle visibility for password fields

  // Scroll into view when the dropdown opens
  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen]);

  // Handle form submission with validation
  const onSubmit = (values: z.infer<typeof PasswordUpdateSchema>) => {
    console.log("values", values);

    setError("");
    setSuccess("");
    startTransition(() => {
      changePassword(values).then((data: any) => {
        console.log("data", data);
        if (data?.error) {
          setError(data.error);
          setSuccess("");
          toast({
            title: "Request Failed",
            description: data.error,
            variant: "destructive",
          });

          if (data.error === "User is not verified") {
            window.location.href = "/verify";
          }
        } else if (data?.message) {
          console.log(data.message);
          setError("");
          setSuccess(data.message);
          toast({
            title: "Password updated successfully",
            description: "Your password has been updated.",
          });
          if (data.message === "Password updated successfully") {
            console.log("Password updated successfully");
            signOut();
            // window.location.href = "/login";
          }
        }
      });
    });
  };

  return (
    <section className="relative">
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-md p-3 sm:p-4 px-4 sm:px-6 shadow-sm hover:shadow-lg focus:outline-none transition-all duration-300 ease-in-out"
      >
        <span className="text-gray-800 font-semibold">Password Settings</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Password form (shown when isOpen is true) */}
      {isOpen && (
        <div className="flex justify-center items-center">
          <div
            ref={formRef}
            className="mt-8 rounded-lg shadow-md p-4 sm:p-6 w-full max-w-xl"
          >
            <h4 className="text-textPrimary mb-5 font-semibold text-xl">
              Change Your Password
            </h4>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="current_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="******"
                              type={showPasswordCurrent ? "text" : "password"} // Toggle between text and password
                              className="pl-3 pr-10" // Add padding for the icon space
                            />
                            {/* Eye Icon to toggle password visibility */}
                            <button
                              type="button"
                              onClick={() => !isPending && setShowPasswordCurrent((prev) => !prev)}
                      disabled={isPending}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPasswordCurrent ? (
                                <AiOutlineEyeInvisible className="w-5 h-5" />
                              ) : (
                                <AiOutlineEye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="new_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="******"
                              type={showPasswordNew ? "text" : "password"} // Toggle between text and password
                              className="pl-3 pr-10" // Add padding for the icon space
                            />
                            {/* Eye Icon to toggle password visibility */}
                            <button
                              type="button"
                              onClick={() => !isPending && setShowPasswordNew((prev) => !prev)}
                              disabled={isPending} 
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPasswordNew ? (
                                <AiOutlineEyeInvisible className="w-5 h-5" />
                              ) : (
                                <AiOutlineEye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="******"
                              type={showPasswordConfirm ? "text" : "password"} // Toggle between text and password
                              className="pl-3 pr-10" // Add padding for the icon space
                            />
                            {/* Eye Icon to toggle password visibility */}
                            <button
                              type="button"
                              onClick={() => !isPending && setShowPasswordConfirm((prev) => !prev)}
                      disabled={isPending}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPasswordConfirm ? (
                                <AiOutlineEyeInvisible className="w-5 h-5" />
                              ) : (
                                <AiOutlineEye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormError message={error} />

                <FormSuccess message={success} />

                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full text-center py-2 text-white rounded-md bg-accent hover:bg-[#18c781] font-medium"
                >
                  {isPending ? (
                    <>
                      <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
                <p className="text-[0.8rem] text-red-600">
                  You need to login after changing your password
                </p>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </section>
  );
}

export default PasswordSettings;
