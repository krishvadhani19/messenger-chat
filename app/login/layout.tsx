import Image from "next/image";
import React from "react";
import "./layout.scss";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="main-container">
      <div className="main-container-header">
        <Image
          src="/images/logo.png"
          alt=""
          height={48}
          width={48}
          className="main-container-logo"
        />
        <h2>Sign in to your account</h2>
      </div>

      <div>{children}</div>
    </main>
  );
};

export default LoginLayout;
