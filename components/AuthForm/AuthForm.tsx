"use client";

// Module Imports
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

// File Imports
import "./AuthForm.scss";
import Input from "@/components/Input/Input";
import Button from "../Button/Button";
import SocialButton from "../SocialButton/SocialButton";
import { GitHubIcon, GoogleIcon } from "../Icons";
import { FORM_TYPES } from "@/constants/auth-constants";

const AuthForm = () => {
  const [variant, setVariant] = useState<keyof typeof FORM_TYPES>(
    FORM_TYPES.LOGIN
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "" });
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
    <form className="auth-form-container" onSubmit={onSubmit}>
      {/* Register */}
      {variant === FORM_TYPES.REGISTER && (
        <Input
          label="Name"
          id="name"
          required
          onChange={(value: string) =>
            setFormData((prev) => ({ ...prev, email: value }))
          }
          value={formData?.email}
          type="text"
          placeholder="Enter your name"
        />
      )}

      {/* Login */}
      {variant === FORM_TYPES.LOGIN && (
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
              setFormData((prev) => ({ ...prev, email: value }))
            }
            value={formData?.email}
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
            Already have an account?
            <span
              onClick={() => router.push("/signup")}
              className="auth-form-login-button"
            >
              Login
            </span>
          </div>
        </>
      )}
    </form>
  );
};

export default AuthForm;
