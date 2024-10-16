import React, { useState, useEffect, useRef, useTransition } from "react";
import { PasswordUpdateSchema } from "@/src/lib/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
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
import { FormError } from "@/src/components/ui/form-error";
import { FormSuccess } from "@/src/components/ui/form-success";
import { changePassword } from "@/src/app/actions/change-password";
import { signOut } from "@/src/lib/auth";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";

type VerifyEmailProps = {
  profile_email: string;
};

function PasswordSettings({ profile_email }: VerifyEmailProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isOpen]);

  const onSubmit = (values: z.infer<typeof PasswordUpdateSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      changePassword(values).then((data: any) => {
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
          setError("");
          setSuccess(data.message);
          toast({
            title: "Password updated successfully",
            description: "Your password has been updated.",
          });
          if (data.message === "Password updated successfully") {
            signOut();
          }
        }
      });
    });
  };

  return (
    <section className="mt-8 rounded-lg overflow-hidden">
      <div
        className="py-2 flex justify-between items-center  cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold text-black">Password Settings</h2>
        <button className="text-accent hover:text-[#1a8e5c]">
          {isOpen ? (
            <AiOutlineClose className="text-xl text-red-500" />
          ) : (
            <AiOutlineEdit className="text-xl" />
          )}
        </button>
      </div>

      {isOpen && (
        <div ref={formRef} className="py-2 md:px-24 md:py-6">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {["current_password", "new_password", "confirm_password"].map(
                (fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={
                      fieldName as
                        | "current_password"
                        | "new_password"
                        | "confirm_password"
                    }
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          {fieldName
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="******"
                              type={
                                fieldName === "current_password"
                                  ? showPasswordCurrent
                                    ? "text"
                                    : "password"
                                  : fieldName === "new_password"
                                  ? showPasswordNew
                                    ? "text"
                                    : "password"
                                  : showPasswordConfirm
                                  ? "text"
                                  : "password"
                              }
                              className="pl-3 pr-10 border-gray-300 focus:border-accent "
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (fieldName === "current_password")
                                  setShowPasswordCurrent((prev) => !prev);
                                else if (fieldName === "new_password")
                                  setShowPasswordNew((prev) => !prev);
                                else setShowPasswordConfirm((prev) => !prev);
                              }}
                              disabled={isPending}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {(fieldName === "current_password" &&
                                showPasswordCurrent) ||
                              (fieldName === "new_password" &&
                                showPasswordNew) ||
                              (fieldName === "confirm_password" &&
                                showPasswordConfirm) ? (
                                <AiOutlineEyeInvisible className="w-5 h-5" />
                              ) : (
                                <AiOutlineEye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                )
              )}

              <FormError message={error} />
              <FormSuccess message={success} />

              <Button
                disabled={isPending}
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-accent hover:bg-[#1a8e5c]"
              >
                {isPending ? (
                  <>
                    <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
              <p className="text-sm text-yellow-500 text-center">
                You will need to log in again after changing your password
              </p>
            </form>
          </FormProvider>
        </div>
      )}
    </section>
  );
}

export default PasswordSettings;
