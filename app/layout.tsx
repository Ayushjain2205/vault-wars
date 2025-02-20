import type React from "react";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";

// Load Space Grotesk font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
          href="https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`min-h-screen bg-white ${spaceGrotesk.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
