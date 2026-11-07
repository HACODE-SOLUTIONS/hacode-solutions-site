import type { Metadata } from "next";
import Link from "next/link";
import HeroProcess from "@/components/HeroProcess";

const description =
  "We analyze the bottlenecks holding your company back, then deliver automation with AI and cloud services to save time, money, and manual work.";

export const metadata: Metadata = {
  title: "HACODE Solutions",
  description,
  openGraph: {
    title: "HACODE Solutions",
    description,
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
    description,
    images: ["/logo.webp"],
  },
};

export default function HomePage() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-screen flex-col bg-brand-black px-6 text-white sm:px-8 lg:px-10"
    >
      <div className="mx-auto my-auto grid w-full max-w-6xl items-center gap-12 py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,1.08fr)] lg:gap-14 xl:gap-20">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <div className="mb-7 flex items-center justify-center gap-3 lg:justify-start">
            <picture>
              <source srcSet="/logo-on-dark.webp" type="image/webp" />
              <img
                src="/logo-on-dark.png"
                alt="HACODE Solutions"
                width={778}
                height={898}
                fetchPriority="high"
                decoding="async"
                className="h-20 w-auto sm:h-24"
              />
            </picture>
            <p className="text-left text-sm font-semibold uppercase tracking-[0.18em] text-zinc-100">
              HACODE
              <span className="mt-1 block text-[11px] font-medium tracking-[0.22em] text-zinc-400">
                Solutions
              </span>
            </p>
          </div>

          <h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.35rem]"
          >
            Save time, save money, and replace manual work
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-300 lg:mx-0">
            We analyze the bottlenecks holding your company back, then deliver
            automation with AI and cloud services.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex min-h-11 min-w-44 items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-brand-black hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <HeroProcess />
      </div>
    </section>
  );
}
