"use client";

// Module imports
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

// File imports
import "./layout.scss";
import SocialButton from "@/components/SocialButton/SocialButton";
import { GitHubIcon, GoogleIcon } from "@/components/Icons";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const redirectionPathname =
    pathname !== "/auth/login" ? "/auth/login" : "/auth/register";

  return (
    <main className="main-auth-container">
      <Image
        src="/logo.png"
        alt=""
        height={48}
        width={48}
        className="main-container-logo"
      />
      <h2>Sign in to your account</h2>

      <div className="auth-card-container">
        {children}

        {/* Continue with text */}
        <div className="auth-card-continue-with">
          <div className="line"></div>

          <div className="text">or continue with</div>

          <div className="line"></div>
        </div>

        {/* SSO Button */}
        <div className="auth-card-socials">
          <SocialButton icon={<GitHubIcon />} onClick={() => {}} />
          <SocialButton icon={<GoogleIcon />} onClick={() => {}} />
        </div>

        {/*  */}
        <div
          className="auth-card-text"
          onClick={() => router.push(redirectionPathname)}
        >
          {!redirectionPathname.includes("login")
            ? "Create an account?"
            : "Already have an account?"}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
