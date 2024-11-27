"use client";

import { resetPassword } from "@/src/app/actions/recover-password"; // Adjust the path as needed
import { RecoverPasswordSchema } from "@/src/lib/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { FormError } from "../../ui/form-error";
import { FormSuccess } from "../../ui/form-success";
import { Input } from "../../ui/input";

function ResetPassword() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<any>("");
  const [isPending, setIsPending] = useState(false); // Use useState for isPending
  const router = useRouter();

  // Initialize the form with react-hook-form and zod schema
  const form = useForm<z.infer<typeof RecoverPasswordSchema>>({
    resolver: zodResolver(RecoverPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof RecoverPasswordSchema>) => {
    setError("");
    setSuccess("");
    setIsPending(true); // Set isPending to true at the start

    resetPassword(values)
      .then((data) => {
        if (data?.error) {
          setError(data.error as string);
          setSuccess("");
          toast.error(
            (data.error as string) || "An error occurred. Please try again.",
          );

          if (data.error === "User is not verified") {
            router.replace("/verify");
          }
        } else if (data?.message) {
          setError("");
          setSuccess(data.message);
          toast.success(
            data.message ||
              "A password reset link has been sent to your email. Please check your inbox.",
          );

          if (data.message === "Password reset link sent successfully") {
            // router.replace("/login");
          }
        }
      })
      .catch(() => {
        setError("An error occurred. Please try again.");
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsPending(false); // Ensure isPending is set to false after response
      });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending}
                  placeholder="Enter registered email"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!success && (
          <Button
            disabled={isPending || success}
            type="submit"
            className="w-full rounded-md bg-accent py-2 text-center font-medium text-white hover:bg-[#18c781]"
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
        )}
        <FormSuccess message={success} />
        <FormError message={error} />
      </form>
    </FormProvider>
  );
}

export default ResetPassword;
