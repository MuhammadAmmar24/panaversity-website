"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/src/schemas/userschema";
import { Input } from "@/src/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { Button } from "@/src/components/ui/button";
import { FormError } from "@/src/components/form-error";
import { FormSuccess } from "@/src/components/form-success";
import { login } from "@/src/actions/login";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useToast } from "@/src/components/ui/use-toast";
import { ToastAction } from "@/src/components/ui/toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();

  // Get all the query params
  const redirect_uri = searchParams.get("redirect_uri");
  const client_id = searchParams.get("client_id");
  const response_type = searchParams.get("response_type");
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const queryParams =
    `?redirect_uri=${redirect_uri}` +
    `&state=${state}` +
    `&response_type=${response_type}` +
    `&client_id=${client_id}` +
    `&code=${code}`;

  let callbackUrl: string | null = null;

  if (redirect_uri) {
    callbackUrl = `/admin/dashboard${queryParams}`;
  }

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
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
  
    startTransition(() => {
      login(values).then((data) => {
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
          setSuccess(data.success);
          toast({
            title: "Login Success",
            description: data.message ? data.message : "Welcome to Panaversity",
            action: <ToastAction altText="Close">Close</ToastAction>,
          });
  
          // Retrieve the previous path from localStorage
          const previousPath = localStorage.getItem("previousPath");
  
          if (previousPath) {
            // Redirect to the previous path after login
            router.push(previousPath);
            // Clear the previous path from localStorage
            localStorage.removeItem("previousPath");
          } else {
            console.log("No previous path stored");
            // If no previous path is stored, fallback to default redirect
            router.push("/dashboard");  // Replaces window.location.href
          }
        }
      });
    });
  };
  


 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <div className="space-y-4">
          <>
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
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link
                      href="/reset-password"
                      className="hover:underline  underline-offset-4 transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        </div>
        <FormError message={error || urlError} />
        <FormSuccess message={success} />
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
            "Login"
          )}
        </Button>

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
