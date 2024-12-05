"use client";
import { updatePassword } from "@/src/app/actions/update-password";
import { UpdatePasswordSchema } from "@/src/lib/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
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

type VerifyEmailProps = {
  token: string;
};

function UpdatePassword({ token }: VerifyEmailProps) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      token: token,
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      updatePassword(values).then((data: any) => {
        if (data?.error) {
          setError(data.error);
          setSuccess("");
          toast.error("An error occurred. Please try again.");

          if (data.error === "User is not verified") {
            window.location.href = "/verify";
          }
        } else if (data?.message) {
          form.reset();
          setError("");
          setSuccess(data.message);
          toast.success("Your password has been updated.");

          if (data.message === "Password updated successfully") {
            localStorage.setItem("updatePassword", "true");
            window.location.href = "/login";
          }
        }
        startTransition(() => {});
      });
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
                      type={showNewPassword ? "text" : "password"}
                      className="pl-3 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        !isPending && setShowNewPassword((prev) => !prev)
                      }
                      disabled={isPending}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                    >
                      {showNewPassword ? (
                        <AiOutlineEyeInvisible className="h-5 w-5" />
                      ) : (
                        <AiOutlineEye className="h-5 w-5" />
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
                      type={showConfirmPassword ? "text" : "password"}
                      className="pl-3 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        !isPending && setShowConfirmPassword((prev) => !prev)
                      }
                      disabled={isPending}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible className="h-5 w-5" />
                      ) : (
                        <AiOutlineEye className="h-5 w-5" />
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
        {!success && (
          <Button
            disabled={isPending || !!success}
            type="submit"
            className="w-full rounded-md bg-accent py-2 text-center font-medium text-white hover:bg-[#18c781]"
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
        )}
      </form>
    </FormProvider>
  );
}

export default UpdatePassword;
