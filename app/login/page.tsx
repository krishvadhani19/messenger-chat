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

export default function Home() {
  const [variant, setVariant] = useState<keyof typeof FORM_TYPES>(
    FORM_TYPES.LOGIN
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    if (variant === FORM_TYPES.LOGIN) {
      setVariant(FORM_TYPES.REGISTER);
    } else {
      setVariant(FORM_TYPES.LOGIN);
    }
  }, [variant]);

  const onSubmit = () => {
    setIsLoading(true);

    if (variant === FORM_TYPES.REGISTER) {
      // Axios Register}
    } else if (variant === FORM_TYPES.LOGIN) {
      // Next Auth SignIn
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // SSO
  };

  return (
    <form className="auth-form-container">
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
      <Button fullWidth onClick={() => {}}>
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
