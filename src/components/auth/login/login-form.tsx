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
import { toast } from "sonner";
import * as z from "zod";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

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
    startTransition(true);

    login(values)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          toast.error("Oops! Login failed. Please try again.");
          if (data?.error === "Email not verified") {
            router.push("/resend-link");
          }
          form.setValue("password", "");
        }

        if (data?.success) {
          form.reset();
          setSuccess(data.success);
          toast.success("Welcome back! You’re now logged in.");

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    placeholder="user@gmail.com"
                    type="email"
                    autoComplete="username"
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
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      id="current-password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 transform"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="sm" variant="link" asChild className="px-0 font-normal">
            <Link
              href="/reset-password"
              className="underline-offset-4 transition-colors duration-200 hover:underline"
            >
              Forgot password?
            </Link>
          </Button>
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
                Submitting...
              </>
            ) : (
              "Login"
            )}
          </Button>
        )}

        <p className="w-full text-center text-xs font-medium text-textPrimary">
          Don't have an account?&nbsp;&nbsp;
          <Link
            href="/register"
            aria-label="Go to register page"
            replace
            className="group"
          >
            <span className="text-sm text-accent underline-offset-4 transition-colors duration-200 group-hover:underline">
              Register
            </span>
          </Link>
        </p>
      </form>
    </Form>
  );
};
