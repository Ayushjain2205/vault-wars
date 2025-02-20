import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Logo font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap"
          rel="stylesheet"
        />
        {/* Navigation font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`min-h-screen bg-white ${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
