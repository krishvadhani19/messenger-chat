"use client";

// Module Imports

// File Imports
import "./page.scss";
import Button from "@/components/Button/Button";
import SocialButton from "@/components/SocialButton/SocialButton";
import { GitHubIcon, GoogleIcon } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FORM_TYPES } from "@/constants/auth-constants";
import Input from "@/components/Input/Input";
import axios from "axios";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const onSubmit = () => {
    setIsLoading(true);
    console.log({ formData });

    axios.post("/api/register", formData);
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
  };

  return (
    <form className="signup-container">
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

      {/* Continue with text */}
      <div className="auth-form-continue-with-container">
        <div className="line"></div>

        <div className="text">or continue with</div>

        <div className="line"></div>
      </div>

      <div className="auth-form-socials-container">
        <SocialButton icon={<GitHubIcon />} onClick={() => {}} />
        <SocialButton icon={<GoogleIcon />} onClick={() => {}} />
      </div>

      <div className="auth-form-login-container">
        Create new account?
        <span
          onClick={() => router.push("/login/signup")}
          className="auth-form-login-button"
        >
          Register
        </span>
      </div>
    </form>
  );
}
