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

const AuthForm = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default AuthForm;
