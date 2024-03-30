// Module Imports
import Image from "next/image";

// File Imports
import AuthForm from "@/components/AuthForm/AuthForm";
import "./page.scss";

export default function Home() {
  return (
    <main className="main-container">
      <div className="main-container-header">
        <Image src="/images/logo.png" alt="" height={48} width={48} className="main-container-logo"/>
        <h2>Sign in to your account</h2>
      </div>

      <AuthForm/>
    </main>
  );
}
