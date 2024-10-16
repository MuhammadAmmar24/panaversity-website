import { Suspense } from "react";
import LoginDialog from "../../../components/auth/login/login-dialog";

export default function RegisterModal() {
  return (
    <Suspense>
      <LoginDialog />
    </Suspense>
  );
}
