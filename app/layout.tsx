import type { Metadata } from "next";
import "./globals.css";
import { Rubik } from "next/font/google";
import NavbarWrapper from "@/components/NavbarWrapper";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const rubik = Rubik({ subsets: ["arabic"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body>
        <div className={rubik.className}>
          <NavbarWrapper />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
