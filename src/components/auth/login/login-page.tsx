import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { LoginForm } from "./login-form";

export const dynamic = 'force-static'

export const LoginFormPage = () => {
  return (
    <CardWrapper headerLabel="Login">
      <LoginForm />
    </CardWrapper>
  );
};
