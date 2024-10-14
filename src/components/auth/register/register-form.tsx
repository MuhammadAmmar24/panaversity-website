"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RegisterSchema } from "@/src/schemas/userschema";
import { Input } from "@/src/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastAction } from "@/src/components/ui/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import { FormError } from "@/src/components/form-error";
import { FormSuccess } from "@/src/components/form-success";
import { register } from "@/src/app/actions/register";
import { useToast } from "@/src/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { affiliations } from "@/src/constants/affiliation";
import Link from "next/link";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get all the query params for redirect
  const redirect_uri = searchParams.get("redirect_uri");
  const client_id = searchParams.get("client_id");
  const response_type = searchParams.get("response_type");
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const queryParams = `?redirect_uri=${redirect_uri}&state=${state}&response_type=${response_type}&client_id=${client_id}&code=${code}`;

  // Initialize form with react-hook-form and zod schema
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      phone: "",
      affiliation: "None",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          setError(data.error);
          setSuccess("");
          toast({
            title: "Signup Failed",
            description: data?.error,
            variant: "destructive",
          });
        } else if (data?.success) {
          form.reset();
          setError("");
          setSuccess(data.success);
          toast({
            title: "Signup Success",
            description: "Please Verify Email To Continue",
            action: (
              <Link
                href={redirect_uri ? `/verify${queryParams}` : "/verify"}
                replace
              >
                <ToastAction altText="Verify to Continue">
                  Verify Email
                </ToastAction>
              </Link>
            ),
          });
          // router.replace("/verify");
          window.location.replace("/verify");
          console.log(data.success);
        }
        startTransition(() => {});
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Enter your full name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder="user@email.com"
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
                      className="pl-3 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => !isPending && setShowPassword((prev) => !prev)}
                      disabled={isPending}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <ReactPhoneInput
                    country={"pk"}
                    value={field.value}
                    onChange={(phone: string) => field.onChange(phone)}
                    disabled={isPending}
                    placeholder="+921234567890"
                    buttonStyle={{ backgroundColor: "#f9fafb" }}
                    inputStyle={{
                      width: "100%",
                      backgroundColor: "transparent",
                      opacity: isPending ? 0.5 : 1,
                    }}
                    countryCodeEditable={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="affiliation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Affiliation</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger
                      className={
                        form.formState.errors.affiliation
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }
                    >
                      <SelectValue placeholder="The Student’s affiliation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {affiliations.map((affiliation, index) => (
                      <SelectItem
                        key={index}
                        value={affiliation}
                        disabled={isPending}
                      >
                        {affiliation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              "Create an account"
            )}
          </Button>
        )}
        <Button
          size="sm"
          variant="link"
          asChild
          className="w-full text-textPrimary"
        >
          <Link href="/login" replace className="group">
            Already have an account?&nbsp;
            <span className="group-hover:underline text-accent underline-offset-4 transition-colors duration-200">
              Login
            </span>
          </Link>
        </Button>
      </form>
    </Form>
  );
};
