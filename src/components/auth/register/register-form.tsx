"use client";

import { register } from "@/src/app/actions/register";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ToastAction } from "@/src/components/ui/toast";
import { useToast } from "@/src/components/ui/use-toast";
import { affiliations } from "@/src/constants/affiliation";
import { RegisterSchema } from "@/src/lib/schemas/userschema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as z from "zod";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  // Initialize form with react-hook-form and zod schema
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
              <Link href={"/verify"} replace>
                <ToastAction altText="Verify to Continue">
                  Verify Email
                </ToastAction>
              </Link>
            ),
          });
          router.replace("/verify");
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
                    id="fullName"
                    autoComplete="fullName"
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
                    autoComplete="email"
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
                      id="password"
                      disabled={isPending}
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="password"
                      className="pl-3 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        !isPending && setShowPassword((prev) => !prev)
                      }
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      id="confirmPassword"
                      disabled={isPending}
                      placeholder="Confirm your password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="confirmPassword"
                      className="pl-3 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        !isPending && setShowPassword((prev) => !prev)
                      }
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
                      <SelectValue placeholder="The Student&#39;s affiliation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="focus:border-none focus:ring-0">
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
        <p className="w-full text-textPrimary text-center text-xs font-medium">
          Already have an account?&nbsp;&nbsp;
          <Link href="/login" replace className="group">
            <span className="group-hover:underline text-accent text-sm underline-offset-4 transition-colors duration-200">
              Login
            </span>
          </Link>
        </p>
      </form>
    </Form>
  );
};
