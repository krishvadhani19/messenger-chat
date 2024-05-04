import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/index.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <AppRouterCacheProvider> */}
      <body className={inter.className}>{children}</body>
      {/* </AppRouterCacheProvider> */}
    </html>
  );
}
