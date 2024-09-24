import RegisterDialog from "../../../components/auth/register/register-dialog";
import { Suspense } from "react";

export default function RegisterModal() {
  return (
    <Suspense>
      <RegisterDialog />
    </Suspense>
  );
}
