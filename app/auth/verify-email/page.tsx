"use client";

// import modules
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

// import files
import Input from "@/components/Input/Input";
import "./page.scss";
import Button from "@/components/Button/Button";
import { verifyEmail } from "@/server/actions/verify-email";
import { FORM_STATUS, FORM_STATUS_TYPE } from "@/constants/auth-constants";
import { LOGIN_PAGE } from "@/routes";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const [formData, setFormData] = useState<{ otp: string }>({ otp: "" });
  const [status, setStatus] = useState<{
    type: FORM_STATUS_TYPE;
    message: string;
  }>();

  const onSubmit = useCallback(async () => {
    const res = await verifyEmail(formData, email as string);
    if (res?.error) {
      setStatus({ type: FORM_STATUS.ERROR, message: res?.error });
    } else if (res?.success) {
      setStatus({ type: FORM_STATUS.SUCCESS, message: res?.success });
    }

    /**
     * Show status and delay then move to login page
     */
    setTimeout(() => {
      router.push(LOGIN_PAGE);
    }, 2000);
  }, [email, formData, router]);

  return (
    <>
      <Input
        label="Verification Code"
        type="text"
        required
        onChange={(value: string) => setFormData(() => ({ otp: value }))}
        value={formData?.otp}
        placeholder="Enter the verification code"
      />

      {status?.type && <div>{status?.message}</div>}

      {/* Button */}
      <Button fullWidth onClick={onSubmit}>
        Confirm
      </Button>
    </>
  );
};

export default VerifyEmailPage;
