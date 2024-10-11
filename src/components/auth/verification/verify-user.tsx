"use client";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/src/components/auth/card-wrapper";
import VerifyEmail from "./verify-email";
import UpdatePassword from "@/src/components/auth/update-password/update-password";


const Verify = () => {
  const searchParams = useSearchParams();
  const token : any = searchParams.get("token");
  const type = searchParams.get("type");
  console.log("This is type", type);

  if (type === "email") {
    return <VerifyEmail token={token} />;
  } else if (type === "reset") {
    return (
      <div className="flex items-center justify-center">

          <CardWrapper headerLabel="Update Password">
            <UpdatePassword token={token}/>
          </CardWrapper>

      </div>
    );
  }
};

export default Verify;
