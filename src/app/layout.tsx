import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Hydrate from "./components/Hydrate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next E-commerce",
  description: "Next E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body
          className={clsx(
            `${geistSans.variable} ${geistMono.variable} antialiased`,
            "bg-slate-700"
          )}
        >
          <Hydrate>
            <Navbar />
            <main className="h-screen p-16">{children}</main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  );
}
