"use client";
import { resendVerification } from "@/src/app/actions/resend-verification";
import { ResendLinkSchema } from "@/src/lib/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
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
  const [success, setSuccess] = useState<string | undefined | boolean>("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResendLinkSchema>>({
    resolver: zodResolver(ResendLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const onsubmit = (values: z.infer<typeof ResendLinkSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resendVerification(values).then((data: any) => {
        setError(data?.error);
        setSuccess(data?.success);

        // Ensure isPending is set to false after the response
        if (data?.error) {
          toast.error(data?.error || "An error occurred. Please try again.");
        } else if (data?.success) {
          toast.success("A verification link has been sent to your email.");

          if (data.success === "Your account is already verified.") {
            router.replace("/login");
          } else if (
            data.success ===
            "A verification email has been sent to your email address."
          ) {
            router.replace("/verify");
          } else {
            router.back();
          }
        }

        // After response, make sure isPending is false
        startTransition(() => {}); // Clear pending state manually.
      });
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={isPending || !!success}
                  placeholder="example@gmail.com"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!success && (
          <Button
            disabled={isPending || !!success}
            type="submit"
            className="w-full rounded-md bg-accent py-2 text-center font-medium text-white hover:bg-[#18c781]"
          >
            {isPending ? (
              <>
                <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Re-send Email"
            )}
          </Button>
        )}

        <FormSuccess
          message={typeof success === "boolean" ? success.toString() : success}
        />
        <FormError message={error} />
      </form>
    </FormProvider>
  );
}

export default ResetPassword;
