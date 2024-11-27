import { changePassword } from "@/src/app/actions/change-password";
import { Button } from "@/src/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { FormError } from "@/src/components/ui/form-error";
import { FormSuccess } from "@/src/components/ui/form-success";
import { Input } from "@/src/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";
import { signOut } from "@/src/lib/auth";
import { PasswordUpdateSchema } from "@/src/lib/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  AiOutlineClose,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import "react-phone-input-2/lib/style.css";
import * as z from "zod";
import { toast } from "sonner";

function PasswordSettings({ profile_email }: { profile_email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
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
          toast.error(data.error || "Password change failed. Please verify your information and try again.");

          if (data.error === "User is not verified") {
            window.location.href = "/verify";
          }
        } else if (data?.message) {
          setError("");
          setSuccess(data.message);
          toast.success("Password updated successfully! Please log in again to continue.");

          if (data.message === "Password updated successfully") {
            signOut();
          }
        }
      });
    });
  };

  return (
    <section className="mt-8 w-full sm:py-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="pr-5 text-lg font-semibold leading-6 text-gray-900 mobileM:pr-0 md:text-xl xl:pr-8">
          Password Settings
        </h2>
        <button
          className="text-gray-600 transition-colors duration-200 hover:text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <AiOutlineClose className="text-lg" />
          ) : (
            <AiOutlineEdit className="text-lg" />
          )}
        </button>
      </div>

      {isOpen && (
        <div ref={formRef} className="mt-4 xl:w-1/2 xl:pr-8">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-6">
                {(
                  [
                    "current_password",
                    "new_password",
                    "confirm_password",
                  ] as const
                ).map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel className="text-md mb-1 block font-medium text-gray-700">
                          {fieldName
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            {fieldName === "new_password" ? (
                              <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Enter new password"
                                    type={showPasswordNew ? "text" : "password"}
                                    className="w-full rounded-md border border-gray-300 px-3 py-1 shadow-sm transition duration-150 ease-in-out focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200"
                                  />
                                </TooltipTrigger>
                                <TooltipContent 
                                  className="w-52 sm:w-full bg-white text-black border shadow-md text-xs"
                                  side="bottom">
                                  <div className="p-2">
                                    <h3 className="mb-1 font-semibold">Password Requirements:</h3>
                                    <ul className="list-disc pl-4 space-y-1">
                                      <li>At least 8 characters long</li>
                                      <li>At least 1 alphabet, 1 number, and 1 special character</li>
                                    </ul>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            ) : (
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder={
                                  fieldName === "current_password"
                                    ? "Enter current password"
                                    : fieldName === "confirm_password"
                                    ? "Confirm new password"
                                    : ""
                                }
                                type={
                                  fieldName === "current_password"
                                    ? showPasswordCurrent
                                      ? "text"
                                      : "password"
                                    : fieldName === "confirm_password"
                                    ? showPasswordConfirm
                                      ? "text"
                                      : "password"
                                    : "password"
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-1 shadow-sm transition duration-150 ease-in-out focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-200"
                              />
                            )}

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
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                              {(fieldName === "current_password" &&
                                showPasswordCurrent) ||
                              (fieldName === "new_password" &&
                                showPasswordNew) ||
                              (fieldName === "confirm_password" &&
                                showPasswordConfirm) ? (
                                <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400" />
                              ) : (
                                <AiOutlineEye className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="mt-1 text-sm text-red-600" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="mt-2 w-full rounded-md bg-accent py-2 text-white transition duration-150 ease-in-out hover:bg-green-600"
                >
                  {isPending ? (
                    <>
                      <AiOutlineLoading3Quarters className="mr-2 inline-block h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
          <p className="mt-4 text-xs text-gray-500 flex gap-1 items-center">
            <IoInformationCircleOutline className="text-black text-sm"/> After changing your password, you’ll be logged out and need to log in again.
          </p>
        </div>
      )}
    </section>
  );
}

export default PasswordSettings;