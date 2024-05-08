"use client";

// Module Imports
import { useCallback, useState, useTransition } from "react";
import * as z from "zod";

// File Imports
import "./page.scss";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { login } from "@/server/actions/login";
import { LoginSchema } from "@/server/schemas/LoginSchema";
import { FORM_STATUS, FORM_STATUS_TYPE } from "@/constants/auth-constants";
import { useRouter } from "next/navigation";
import Alert from "@/components/ui/Alert/Alert";

const LoginPage = () => {
  const [formData, setFormData] = useState<z.infer<typeof LoginSchema>>({
    email: "",
    password: "",
  });
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: FORM_STATUS_TYPE;
    message: string;
  }>();

  const router = useRouter();

  const onSubmit = useCallback(() => {
    startTransition(async () => {
      const loginStatus = await login(formData);

      if (loginStatus?.error) {
        setStatus({ type: FORM_STATUS.ERROR, message: loginStatus?.error });
      } else if (loginStatus?.success) {
        setStatus({ type: FORM_STATUS.SUCCESS, message: loginStatus?.success });

        router.push("/home");
      }

      setFormData({ email: "", password: "" });
    });
  }, [router, formData]);

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

      {status?.type && <Alert {...status} />}

      {/* Button */}
      <Button fullWidth onClick={onSubmit} disabled={isPending}>
        Continue
      </Button>
    </>
  );
};

export default LoginPage;
