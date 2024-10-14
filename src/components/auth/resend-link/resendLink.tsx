

"use client";
import { ResendLinkSchema } from "@/src/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { useState, useTransition } from "react";
import { resendVerification } from "@/src/app/actions/resend-verification";
import { Button } from "../../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { FormError } from "../../form-error";
import { FormSuccess } from "../../form-success";
import "react-phone-input-2/lib/style.css";
import { redirect, useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ResetPassword() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined | boolean>("");
  const { toast } = useToast();
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
      resendVerification(values).then((data:any) => {
        setError(data?.error);
        setSuccess(data?.success);

        // Ensure isPending is set to false after the response
        if (data?.error) {
          toast({
            title: "Request Failed",
            description: data?.error,
            variant: "destructive",
          });
        } else if (data?.success) {
          toast({
            title: "Email sent Successfully",
            description: "Verification Link has been sent to your email",
          });

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
            className="w-full text-center py-2 text-white rounded-md bg-accent hover:bg-[#18c781] font-medium"
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
