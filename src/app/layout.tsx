import type { Metadata, Viewport } from "next";

import "./globals.css";

import { Geist } from "next/font/google";

import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Smart Bus Monitoring System",

  description:
    "IoT dashboard for smart bus tracking and student safety",
};

export const viewport: Viewport = {
  width: "device-width",

  initialScale: 1,

  maximumScale: 1,

  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        "font-sans",
        geist.variable
      )}
    >
      <body>{children}</body>
    </html>
  );
}