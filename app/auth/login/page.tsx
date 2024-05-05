"use client";

// Module Imports
import { useCallback, useState, useTransition } from "react";
import * as z from "zod";

// File Imports
import "./page.scss";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { login } from "@/server/actions/login";
import { LoginSchema } from "@/server/schemas/LoginSchema";
import { FORM_STATUS } from "@/constants/auth-constants";

type STATUS_TYPE = (typeof FORM_STATUS)[keyof typeof FORM_STATUS];

const LoginPage = () => {
  const [formData, setFormData] = useState<z.infer<typeof LoginSchema>>({
    email: "",
    password: "",
  });
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: STATUS_TYPE | undefined;
    message: string;
  }>({ type: undefined, message: "" });

  const onSubmit = useCallback(() => {
    startTransition(async () => {
      const loginStatus = await login(formData);

      if (loginStatus?.error) {
        setStatus({ type: FORM_STATUS.ERROR, message: loginStatus?.error });
      } else if (loginStatus?.success) {
        setStatus({ type: FORM_STATUS.SUCCESS, message: loginStatus?.success });
      }
    });
    setFormData({ email: "", password: "" });
  }, [formData]);

  return (
    <>
      <Input
        label="Email"
        type="email"
        required
        onChange={(value: string) => {
          setFormData((prev) => ({ ...prev, email: value }));
        }}
        value={formData?.email}
        placeholder="Enter your email"
        disabled={isPending}
      />

      <Input
        label="Password"
        type="password"
        required
        onChange={(value: string) =>
          setFormData((prev) => ({ ...prev, password: value }))
        }
        value={formData?.password}
        placeholder="Enter your password"
        disabled={isPending}
      />

      {/* Button */}
      <Button fullWidth onClick={onSubmit} disabled={isPending}>
        Continue
      </Button>
    </>
  );
};

export default LoginPage;
