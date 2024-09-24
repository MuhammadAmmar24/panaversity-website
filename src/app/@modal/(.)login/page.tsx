import LoginDialog from "../../../components/auth/login/login-dialog";
import { Suspense } from "react";

export default function RegisterModal() {
  return (
    <Suspense>
      <LoginDialog />
    </Suspense>
  );
}
