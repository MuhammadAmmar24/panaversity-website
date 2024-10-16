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
import { useToast } from "@/src/components/ui/use-toast";
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
import "react-phone-input-2/lib/style.css";
import * as z from "zod";

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
    <section className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Password Settings
        </h2>
        <button
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
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
        <div ref={formRef} className="mt-4">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1  gap-6">
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
                          <FormLabel className="block text-md font-medium text-gray-700 mb-1">
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
                                className="  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition duration-150 ease-in-out"
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
                  )
                )}
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="mt-6 flex justify-start">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full py-2 bg-accent text-white rounded-md  transition duration-150 ease-in-out"
                >
                  {isPending ? (
                    <>
                      <AiOutlineLoading3Quarters className="inline-block mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update "
                  )}
                </Button>
              </div>
            </form>
          </FormProvider>
          <p className="mt-4 text-sm text-yellow-600">
            You will need to log in again after changing your password
          </p>
        </div>
      )}
    </section>
  );
}

export default PasswordSettings;
