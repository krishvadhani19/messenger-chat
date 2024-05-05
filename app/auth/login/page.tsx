"use client";

// Module Imports
import { useRouter } from "next/navigation";
import { useState } from "react";

// File Imports
import "./page.scss";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const onSubmit = async () => {
    setIsLoading(true);
    await signIn();
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // SSO
  };

  return (
    <>
      <Input
        label="Email"
        id="email"
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
        id="password"
        required
        onChange={(value: string) =>
          setFormData((prev) => ({ ...prev, password: value }))
        }
        value={formData?.password}
        type="password"
        placeholder="Enter your password"
      />

      {/* Button */}
      <Button fullWidth onClick={onSubmit}>
        Continue
      </Button>
    </>
  );
};

export default LoginPage;
