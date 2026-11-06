import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HACODE Solutions",
  description: "HACODE Solutions",
  openGraph: {
    title: "HACODE Solutions",
    description: "HACODE Solutions",
    siteName: "HACODE Solutions",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        alt: "HACODE Solutions",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "HACODE Solutions",
    description: "HACODE Solutions",
    images: ["/logo.webp"],
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <h1 className="sr-only">HACODE Solutions</h1>
      <picture>
        <source srcSet="/logo.webp" type="image/webp" />
        <img
          src="/logo.png"
          alt="HACODE Solutions"
          width={778}
          height={898}
          fetchPriority="high"
          decoding="async"
          className="h-auto w-auto max-h-[min(70vh,640px)] max-w-[min(84vw,420px)] object-contain"
        />
      </picture>
    </div>
  );
}
