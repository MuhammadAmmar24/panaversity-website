"use client";
import { UpdatePasswordSchema } from "@/src/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import * as z from "zod";
import { useToast } from "../../ui/use-toast";
import { useState, useTransition } from "react";
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
import { updatePassword } from "@/src/app/actions/update-password";
import { useRouter } from "next/navigation";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

type VerifyEmailProps = {
  token: string;
};

function UpdatePassword({ token }: VerifyEmailProps) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { toast } = useToast();
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
          toast({
            title: "Request Failed",
            description: data.error,
            variant: "destructive",
          });
          if (data.error === "User is not verified") {
            window.location.href = "/verify";
          }
        } else if (data?.message) {
          form.reset();
          setError("");
          setSuccess(data.message);
          toast({
            title: "Password updated successfully",
            description: "Your password has been updated.",
          });

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
                      onClick={() => !isPending && setShowNewPassword((prev) => !prev)}
                      disabled={isPending}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showNewPassword ? (
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
                      type={showConfirmPassword ? "text" : "password"}
                      className="pl-3 pr-10 "
                    />
                    <button
                      type="button"
                      onClick={() => !isPending && setShowConfirmPassword((prev) => !prev)}
                      disabled={isPending}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? (
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
        {!success && (
          <Button
            disabled={isPending || !!success}
            type="submit"
            className="w-full text-center py-2 text-white rounded-md bg-accent hover:bg-[#18c781] font-medium"
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
