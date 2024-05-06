"use client";

// import modules

// import files
import Input from "@/components/Input/Input";
import "./page.scss";
import { useCallback, useState } from "react";
import Button from "@/components/Button/Button";
import { verifyEmail } from "@/server/actions/verify-email";

const VerifyEmailPage = () => {
  const [formData, setFormData] = useState<{ otp: string }>({ otp: "" });
  const onSubmit = useCallback(async () => {
    const res = await verifyEmail(formData);
  }, [formData]);

  return (
    <>
      <Input
        label="Verification Code"
        type="text"
        required
        onChange={(value: string) =>
          setFormData((prev) => ({ ...prev, password: value }))
        }
        value={formData?.otp}
        placeholder="Enter the verification code"
      />

      {/* Button */}
      <Button fullWidth onClick={onSubmit}>
        Confirm
      </Button>
    </>
  );
};

export default VerifyEmailPage;
