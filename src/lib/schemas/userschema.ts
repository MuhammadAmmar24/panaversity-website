import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().email({
    message: "Email is required",
  }),

  password: z.string().min(8, { message: "Invalid Password or Email" }).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: "Invalid Password or Email",
  }) // also change in UpdatePasswordSchema and PasswordUpdateSchema
});

export const RegisterSchema = z.object({
  fullname: z.string().min(1, {
    message: "FullName is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  // password: z.string().min(6, {
  //   message: "Minimum 6 characters required",
  // }),

  password: z.string().min(8, { message: "Minimum 8 characters required" }).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: "Password must contain at least 1 alphabet, 1 number, and 1 special character",
  }),

  phone: z.string().min(9, {
    message: "Phone number is required",
  }),
  affiliation: z.string().optional(),
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
    new_password: z.string().min(8, { message: "Minimum 8 characters required" }).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 alphabet, 1 number, and 1 special character",
    }),
    confirm_password: z.string().min(8, { message: "Minimum 8 characters required" }).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 alphabet, 1 number, and 1 special character",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // Error will show for the confirm_password field
  });

  export const ContactSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  });


  export const PasswordUpdateSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    current_password:  z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  new_password: z.string().min(8, { message: "Minimum 8 characters required" }).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: "Password must contain at least 1 alphabet, 1 number, and 1 special character",
  }),
  confirm_password: z.string().min(8, { message: "Minimum 8 characters required" }).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message: "Password must contain at least 1 alphabet, 1 number, and 1 special character",
  }),
})
.refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"], // Error will show for the confirm_password field
  });