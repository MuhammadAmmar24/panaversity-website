import { Suspense } from "react";
import RegisterDialog from "../../../components/auth/register/register-dialog";

export default function RegisterModal() {
  return (
    <Suspense>
      <RegisterDialog />
    </Suspense>
  );
}
