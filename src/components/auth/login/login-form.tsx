"use client";

import { login } from "@/src/app/actions/login";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { FormError } from "@/src/components/ui/form-error";
import { FormSuccess } from "@/src/components/ui/form-success";
import { Input } from "@/src/components/ui/input";
import { ToastAction } from "@/src/components/ui/toast";
import { useToast } from "@/src/components/ui/use-toast";
import { LoginSchema } from "@/src/lib/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import * as z from "zod";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(true); // Set isPending to true when starting the login process

    login(values)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          toast({
            title: "Login Failed",
            description: data.message
              ? data.message
              : "Request Failed, Try Again",
            action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          });

          if (data?.error === "Email not verified") {
            router.push("/resend-link");
          }
          form.setValue("password", "");
        }

        if (data?.success) {
          form.reset();
          setSuccess(data.success);
          toast({
            title: "Login Success",
            description: data.message ? data.message : "Welcome to Panaversity",
            action: <ToastAction altText="Close">Close</ToastAction>,
          });

          // Handle redirection logic
          const previousPath = localStorage.getItem("previousPath");
          if (previousPath) {
            router.back(); 
            localStorage.removeItem("previousPath"); 
          } else {
            window.location.href = "/dashboard"; 
          }
        }
      })
      .catch(() => {
        setError("Login failed. Please try again.");
      })
      .finally(() => {
        startTransition(false); // Ensure isPending is set to false after completion
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="example@gmail.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() =>
                        !isPending && setShowPassword((prev) => !prev)
                      }
                      disabled={isPending}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                      ) : (
                        <AiOutlineEye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </FormControl>

                <Button
                  size="sm"
                  variant="link"
                  asChild
                  className="px-0 font-normal"
                >
                  <Link
                    href="/reset-password"
                    className="hover:underline underline-offset-4 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </Button>
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
                Submitting...
              </>
            ) : (
              "Login"
            )}
          </Button>
        )}

        <Button
          size="sm"
          variant="link"
          asChild
          className="w-full text-textPrimary"
        >
          <Link href="/register" replace className="group">
            Don't have an account?&nbsp;
            <span className="group-hover:underline text-accent underline-offset-4 transition-colors duration-200">
              Register
            </span>
          </Link>
        </Button>
      </form>
    </Form>
  );
};
