import type { Metadata } from "next";
import Link from "next/link";
import HeroCommandCenter from "@/components/HeroCommandCenter";

const description =
  "HACODE is an AI-native service business delivering Outcomes as a Service. We find the bottlenecks slowing your company down and deliver the result — less time, lower cost, no manual work — not software.";

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
      <div className="mx-auto my-auto grid w-full min-w-0 max-w-6xl items-center gap-5 py-5 sm:gap-12 sm:py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,1.08fr)] lg:gap-14 xl:gap-20">
        <div className="w-full min-w-0 max-w-xl justify-self-center text-center lg:max-w-none lg:justify-self-stretch lg:text-left">
          <div className="mb-3 flex items-center justify-center gap-3 sm:mb-7 lg:justify-start">
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

          <div className="mb-3 flex w-full min-w-0 justify-center sm:mb-5 lg:justify-start">
            <p className="min-w-0 max-w-full rounded-full border border-violet-300/30 bg-brand-purple/15 px-3.5 py-1.5 text-center text-[13px] font-medium leading-snug text-violet-100 sm:text-sm lg:text-left">
              <span className="inline-block">AI-native service business</span>
              <span aria-hidden="true" className="px-1.5 text-violet-300">
                ·
              </span>
              <span className="inline-block">Outcomes as a Service</span>
            </p>
          </div>

          <h1
            id="hero-heading"
            className="text-balance text-[1.5rem] font-semibold leading-[1.15] tracking-tight min-[390px]:text-[1.7rem] min-[420px]:text-3xl sm:text-5xl lg:text-[3.35rem]"
          >
            <span className="max-sm:block sm:inline">Save time, save money, </span><span className="max-sm:block sm:inline">and replace manual work</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-zinc-300 sm:mt-5 lg:mx-0">
            You pay for outcomes. We find the bottlenecks slowing your company
            down and deliver the result — less time, lower cost, no manual
            work. AI and cloud run behind the scenes. No software to buy or
            manage.
          </p>
          <div className="mt-5 sm:mt-8">
            <Link
              href="/contact"
              className="inline-flex min-h-11 min-w-44 items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-brand-black hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <HeroCommandCenter />
      </div>
    </section>
  );
}
