"use client";

import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

// File Imports
import "./AuthForm.scss";

const FORM_TYPES = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
} as const;

const AuthForm = () => {
  const [variant, setVariant] = useState<keyof typeof FORM_TYPES>(
    FORM_TYPES.LOGIN
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return <div>AuthForm</div>;
};

export default AuthForm;
