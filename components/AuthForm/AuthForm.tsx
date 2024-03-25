"use client";

// Module Imports
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

// File Imports
import "./AuthForm.scss";
import Input from "@/components/Input/Input";

const FORM_TYPES = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
} as const;

const AuthForm = () => {
  const [variant, setVariant] = useState<keyof typeof FORM_TYPES>(
    FORM_TYPES.LOGIN
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "" });

  const toggleVariant = useCallback(() => {
    if (variant === FORM_TYPES.LOGIN) {
      setVariant(FORM_TYPES.REGISTER);
    } else {
      setVariant(FORM_TYPES.LOGIN);
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = () => {
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
    <div className="auth-form-container">
      <div className="auth-form-input-field">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
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
              <div></div>
            </>
          )}

          {/*  */}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
