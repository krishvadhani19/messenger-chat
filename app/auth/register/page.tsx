"use client";

// Module Imports
import { useCallback, useState, useTransition } from "react";

// File Imports
import "./page.scss";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { FORM_STATUS, FORM_STATUS_TYPE } from "@/constants/auth-constants";
import { register } from "@/server/actions/register";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert/Alert";

const SignupPage = () => {
  const router = useRouter();
  const [isPending, setTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<{
    type: FORM_STATUS_TYPE;
    message: string;
  }>();

  const onSubmit = useCallback(async () => {
    const registerStatus = await register(formData);

    if (registerStatus?.error) {
      setStatus({ type: FORM_STATUS.ERROR, message: registerStatus?.error });
    } else if (registerStatus?.success) {
      setStatus({
        type: FORM_STATUS.SUCCESS,
        message: registerStatus?.success,
      });
    }

    router.push(`/verify-email?email=${formData?.email}`);
  }, [formData, router]);

  return (
    <>
      <Input
        label="Name"
        required
        onChange={(value: string) =>
          setFormData((prev) => ({ ...prev, name: value }))
        }
        value={formData?.name}
        type="text"
        placeholder="Enter your name"
      />

      <Input
        label="Email"
        required
        onChange={(value: string) =>
          setFormData((prev) => ({ ...prev, email: value }))
        }
        value={formData?.email}
        type="email"
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        required
        onChange={(value: string) =>
          setFormData((prev) => ({ ...prev, password: value }))
        }
        value={formData?.password}
        type="password"
        placeholder="Enter your password"
      />

      {status?.type && <Alert {...status} />}

      {/* Button */}
      <Button fullWidth onClick={onSubmit}>
        Continue
      </Button>
    </>
  );
};

export default SignupPage;
