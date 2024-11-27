import * as z from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .min(1, { message: "Email is required" }),

  password: z
    .string()
    .min(8, { message: "Invalid email or password" })
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message: "Invalid email or password",
    }),
});

export const RegisterSchema = z
  .object({
    fullname: z.string().min(1, {
      message: "FullName is required",
    }),
    email: z.string().email({
      message: "Email is required",
    }),
    // password: z.string().min(6, {
    //   message: "Minimum 6 characters required",
    // }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
          "Password must include a letter, number, and special character.",
      }),

    confirmPassword: z.string(),

    phone: z.string().min(9, {
      message: "Phone number is required",
    }),
    affiliation: z.string().optional(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export const RecoverPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const VerifyNumberSchema = z.object({
  phone: z.string().min(9, {
    message: "Phone number is required",
  }),
});

export const ResendLinkSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const UpdatePasswordSchema = z
  .object({
    token: z.string().min(1, {
      message: "Token is required",
    }),
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
          "Password must contain at least 1 alphabet, 1 number, and 1 special character",
      }),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export const PasswordUpdateSchema = z
  .object({
    email: z
      .string()
      .email({
        message: "Invalid email address",
      })
      .min(1, { message: "Email is required" }),

    current_password: z.string().min(1, { message: "Current password is required" }),
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
          "Password must contain at least 1 alphabet, 1 number, and 1 special character",
      }),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // Error will show for the confirm_password field
  });
