"use client";

import * as React from "react";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RegisterSchema } from "@/src/schemas/userschema";
import { Input } from "@/src/components/ui/input";
import { useRouter } from "next/navigation";
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
import { register } from "@/src/actions/register";
import { useToast } from "@/src/components/ui/use-toast";
import { ToastAction } from "@/src/components/ui/toast";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { affiliations } from "@/src/constants/affiliation";
import Link from "next/link";

export default function RegisterDialog(){
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get all the query params
  const redirect_uri = searchParams.get("redirect_uri");
  const client_id = searchParams.get("client_id");
  const response_type = searchParams.get("response_type");
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const queryParams = `?redirect_uri=${redirect_uri}&state=${state}&response_type=${response_type}&client_id=${client_id}&code=${code}`;

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
        setError(data.error);
        setSuccess(data.success);
        if (data?.error) {
          toast({
            title: "Signup Failed",
            description: data?.error,
            variant: "destructive",
          });
        }
        if (data?.success) {
          toast({
            title: "Signup Success",
            description: "Please Login To Continue",
            action: (
              <Link href={redirect_uri ? `/login${queryParams}` : "/login"}>
                <ToastAction altText="Login to Continue!">Login Now</ToastAction>
              </Link> 
            ),
          });
          setOpen(false);
          router.push("/login");
        }
      });
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Register</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
        {/* <RegisterForm /> */}
          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 p-1" aria-label="Close">
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

