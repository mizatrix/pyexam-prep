import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PyExam Prep — BIS Introduction to Programming",
  description:
    "Interactive exam preparation tool for BIS Introduction to Programming (BIS2108) at MSA University. Practice Python programming with 250+ questions across 5 exam sections.",
  keywords: [
    "Python",
    "Programming",
    "Exam",
    "BIS2108",
    "MSA University",
    "Practice",
    "Quiz",
  ],
  authors: [{ name: "Dr. Moataz Samy" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
