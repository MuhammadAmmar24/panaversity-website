import { CardWrapper } from "@/src/components/auth/card-wrapper";
import { RegisterForm } from "./register-form";


export const RegisterFormPage = () => {
 

    return (
      <CardWrapper
        headerLabel="Create an account"
      >
        <RegisterForm />
      </CardWrapper>
    );
  };