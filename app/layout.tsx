import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hacode.solutions";

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "HACODE Solutions",
  description: "HACODE Solutions",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "HACODE Solutions",
    description: "HACODE Solutions",
    url: siteUrl,
    siteName: "HACODE Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "HACODE Solutions",
    description: "HACODE Solutions",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      style={{ backgroundColor: "#0A0A0B", colorScheme: "dark" }}
    >
      <body
        className={inter.className}
        style={{ backgroundColor: "#0A0A0B", color: "#ffffff" }}
      >
        <GoogleAnalytics />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
