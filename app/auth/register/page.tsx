"use client";

// Module Imports
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// File Imports
import "./page.scss";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const onSubmit = () => {
    setIsLoading(true);

    axios.post("/api/register", formData);
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <>
      <Input
        label="Name"
        id="name"
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

export default SignupPage;
