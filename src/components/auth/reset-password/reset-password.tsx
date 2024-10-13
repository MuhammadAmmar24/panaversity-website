"use client";

import { RecoverPasswordSchema } from "@/src/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { useState, useTransition } from "react";
import { resetPassword } from "@/src/actions/recover-password"; // Adjust the path as needed
import { Button } from "../../ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { FormError } from "../../form-error";
import { FormSuccess } from "../../form-success";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ResetPassword() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<any>("");
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
  
    startTransition(() => {
      resetPassword(values).then((data) => {
        if (data?.error) {
          setError(data.error);
          setSuccess("");
          toast({
            title: "Request Failed",
            description: data.error,
            variant: "destructive",
          });
          if (data.error === "User is not verified") {
            router.replace('/verify');
          }
        } else if (data?.message) {
          setError("");
          setSuccess(data.message);
          toast({
            title: "Email sent Successfully",
            description: "An email has been sent to reset your password.",
          });
  
          if (data.message === "Password reset link sent successfully") {
            router.replace('/login');
          }
        }
      });
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
        <FormSuccess message={success} />
        <FormError message={error} />
      </form>
    </FormProvider>
  );
}

export default ResetPassword;
