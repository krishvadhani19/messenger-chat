// Module imports
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// File imports
import "@/styles/index.scss";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
