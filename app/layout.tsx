import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hacode.solutions";

export const metadata: Metadata = {
  title: "HACODE SOLUTIONS - Premium DevSpec Packs for AI Coding Agents",
  description:
    "Build production-ready applications faster with comprehensive DevSpec packs designed for AI coding agents like Cursor, Claude Code, and Gemini.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "HACODE SOLUTIONS - Premium DevSpec Packs for AI Coding Agents",
    description:
      "Build production-ready applications faster with comprehensive DevSpec packs designed for AI coding agents like Cursor, Claude Code, and Gemini.",
    url: siteUrl,
    siteName: "HACODE SOLUTIONS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HACODE SOLUTIONS - Premium DevSpec Packs for AI Coding Agents",
    description:
      "Build production-ready applications faster with comprehensive DevSpec packs designed for AI coding agents like Cursor, Claude Code, and Gemini.",
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.webp", sizes: "32x32", type: "image/webp" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
