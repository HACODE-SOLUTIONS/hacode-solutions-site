"use client";

import Link from "next/link";
import DevSpecCard from "@/components/DevSpecCard";
import { devSpecs } from "@/data/devspecs";
import { Reveal, FadeIn } from "@/components/Reveal";

export default function HomeClient() {
  const freeSpecs = devSpecs.filter((s) => !s.isPaid);
  const paidSpecs = devSpecs.filter((s) => s.isPaid);
  const featuredFreeSpecs = freeSpecs.filter((s) => s.popular).slice(0, 5);
  const featuredPaidSpecs = paidSpecs.filter((s) => s.popular);

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div>
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-medium mb-6 tracking-tight">
                DevSpecs for
                <br />
                AI Coding Agents
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                HACODE SOLUTIONS provides{" "}
                <strong className="text-white font-medium">DevSpec files</strong> —
                structured markdown specifications and starter scaffolds that guide AI
                coding agents to build real products.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-gray-500 mb-10 leading-relaxed">
                Get empty project structures + comprehensive specs. Your AI agent reads
                the docs, follows the patterns, and ships production code.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/catalog"
                  className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded text-sm font-medium transition-colors text-center"
                >
                  Browse DevSpecs
                </Link>
                <Link
                  href="/catalog?filter=free"
                  className="border border-brand-border hover:border-gray-600 px-6 py-3 rounded text-sm font-medium transition-colors text-center"
                >
                  Start Free
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                <span>Works with</span>
                <span className="text-gray-400">Cursor</span>
                <span className="text-gray-700">·</span>
                <span className="text-gray-400">Claude</span>
                <span className="text-gray-700">·</span>
                <span className="text-gray-400">Copilot</span>
                <span className="text-gray-700">·</span>
                <span className="text-gray-400">ChatGPT</span>
                <span className="text-gray-700">·</span>
                <span className="text-gray-400">Gemini</span>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="bg-brand-gray rounded border border-brand-border p-6">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-border">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
                </div>
                <span className="text-gray-600 text-xs ml-2 font-mono">
                  ~/devspecs/nextjs-starter/
                </span>
              </div>

              <div className="space-y-1.5 mb-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <span>📁</span>
                  <span>src/</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 pl-4">
                  <span>📄</span>
                  <span>app/</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 pl-4">
                  <span>📄</span>
                  <span>components/</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 pl-4">
                  <span>📄</span>
                  <span>lib/</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>📄</span>
                  <span>README.md</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>📄</span>
                  <span>DEVSPEC.md</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>📄</span>
                  <span>package.json</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>📄</span>
                  <span>tsconfig.json</span>
                </div>
              </div>

              <div className="bg-brand-black rounded border border-brand-border p-4">
                <div className="text-xs text-gray-600 mb-2">DEVSPEC.md</div>
                <div className="text-xs text-gray-400 space-y-1 font-mono">
                  <div># Next.js Starter DevSpec</div>
                  <div className="text-gray-600">## Architecture</div>
                  <div className="text-gray-500">- App Router patterns</div>
                  <div className="text-gray-500">- Server Components</div>
                  <div className="text-gray-500">- TypeScript strict mode</div>
                  <div className="text-gray-600 mt-2">## Implementation...</div>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-600 text-center">
                What you get on GitHub
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <Reveal stagger={0.1}>
        <section className="container mx-auto px-4 py-24">
          <h2 className="text-2xl font-medium mb-10 text-center">
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <Link
              href="/catalog?filter=free"
              className="bg-brand-gray hover:bg-brand-border rounded border border-brand-border hover:border-gray-600 p-6 transition-all group"
            >
              <h3 className="font-medium mb-2 text-sm group-hover:text-white transition-colors">
                Free Starters
              </h3>
              <p className="text-xs text-gray-600">Essential patterns</p>
            </Link>

            <Link
              href="/catalog"
              className="bg-brand-gray hover:bg-brand-border rounded border border-brand-border hover:border-gray-600 p-6 transition-all group"
            >
              <h3 className="font-medium mb-2 text-sm group-hover:text-white transition-colors">
                Payments
              </h3>
              <p className="text-xs text-gray-600">Stripe integration</p>
            </Link>

            <Link
              href="/catalog"
              className="bg-brand-gray hover:bg-brand-border rounded border border-brand-border hover:border-gray-600 p-6 transition-all group"
            >
              <h3 className="font-medium mb-2 text-sm group-hover:text-white transition-colors">
                Authentication
              </h3>
              <p className="text-xs text-gray-600">Auth patterns</p>
            </Link>

            <Link
              href="/catalog?filter=paid"
              className="bg-brand-gray hover:bg-brand-border rounded border border-brand-border hover:border-gray-600 p-6 transition-all group"
            >
              <h3 className="font-medium mb-2 text-sm group-hover:text-white transition-colors">
                Full Products
              </h3>
              <p className="text-xs text-gray-600">SaaS starters</p>
            </Link>
          </div>
        </section>
      </Reveal>

      {/* How to Use */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl font-medium mb-12 text-center">
              How to Use DevSpecs
            </h2>
          </FadeIn>

          <Reveal stagger={0.15}>
            <div className="grid md:grid-cols-3 gap-10 mb-16">
              <div>
                <div className="text-gray-600 text-sm mb-3">01</div>
                <h3 className="font-medium mb-2 text-sm">Pick a DevSpec</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Browse free or premium packs. Free specs are on GitHub, premium
                  ones deliver instant download.
                </p>
              </div>

              <div>
                <div className="text-gray-600 text-sm mb-3">02</div>
                <h3 className="font-medium mb-2 text-sm">Open with Your AI Tool</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Clone the repo or add files to your project. Works with any AI
                  coding tool or LLM.
                </p>
              </div>

              <div>
                <div className="text-gray-600 text-sm mb-3">03</div>
                <h3 className="font-medium mb-2 text-sm">Ship Production Code</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your AI agent reads the specs and scaffolds, follows the patterns,
                  generates working code.
                </p>
              </div>
            </div>
          </Reveal>

          <FadeIn delay={0.2}>
            <div className="bg-brand-gray rounded border border-brand-border p-8">
              <h3 className="font-medium mb-4 text-sm">
                Works With Any AI Coding Tool
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                DevSpecs are model-agnostic. Use them with Cursor, Claude Code,
                GitHub Copilot, ChatGPT, Gemini Code Assist, or any other
                LLM-powered coding assistant.
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                  Cursor
                </div>
                <div className="px-3 py-1.5 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                  Claude Code
                </div>
                <div className="px-3 py-1.5 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                  GitHub Copilot
                </div>
                <div className="px-3 py-1.5 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                  Gemini
                </div>
                <div className="px-3 py-1.5 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                  ChatGPT
                </div>
                <div className="px-3 py-1.5 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                  Any LLM
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Product #1 - MVP Auth + Stripe Billing - Featured Hero */}
      <section className="container mx-auto px-4 py-24">
        <FadeIn>
          <div className="bg-gradient-to-br from-brand-gray to-brand-black rounded border border-brand-border p-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-brand-purple/10 border border-brand-purple text-brand-purple text-xs rounded-full">
                MOST POPULAR
              </span>
              <span className="text-gray-600 text-xs">Ship auth + billing in one day</span>
            </div>
            <h2 className="text-3xl font-medium mb-4">
              MVP Auth + Stripe Billing DevSpec Pack
            </h2>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-2xl">
              Hand Cursor or Claude Code a production Auth + Stripe Billing DevSpec and ship 
              a working paid signup path in one focused day—without inventing webhooks or 
              entitlements from scratch.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                Next.js App Router
              </span>
              <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                Auth.js v5
              </span>
              <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                Stripe
              </span>
              <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                Prisma
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <Link
                href="/devspec/mvp-auth-stripe-billing"
                className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded text-sm font-medium transition-colors inline-block"
              >
                View Details & Get Started
              </Link>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-medium">$49</span>
                <span className="text-xs text-gray-600">one-time</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Featured Free DevSpecs */}
      <section className="container mx-auto px-4 py-24">
        <FadeIn>
          <h2 className="text-2xl font-medium mb-2">Free Starter DevSpecs</h2>
          <p className="text-gray-400 mb-10 max-w-2xl text-sm">
            Clone from GitHub and start building with any AI coding assistant.
          </p>
        </FadeIn>
        <Reveal stagger={0.1}>
          <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {featuredFreeSpecs.map((spec) => (
              <DevSpecCard key={spec.id} spec={spec} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Featured Paid Product - Hero Upsell */}
      {featuredPaidSpecs.length > 0 && (
        <section className="container mx-auto px-4 py-24">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 border border-brand-purple text-brand-purple text-xs rounded-full mb-4">
                PREMIUM
              </div>
              <h2 className="text-3xl font-medium mb-4">
                Ready to wire it all together?
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
                The SaaS Launch Kit integrates Auth.js, Stripe, and Next.js App
                Router into one complete production path. Goes beyond individual
                starters to provide the full integration architecture.
              </p>
            </div>
          </FadeIn>
          <Reveal>
            <div className="max-w-3xl mx-auto">
              {featuredPaidSpecs.map((spec) => (
                <DevSpecCard key={spec.id} spec={spec} />
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* DevSpec Pass CTA */}
      <FadeIn>
        <section className="container mx-auto px-4 py-24">
          <div className="bg-gradient-to-br from-brand-gray to-brand-black rounded border border-brand-purple p-16 text-center max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 border border-brand-purple text-brand-purple text-xs rounded-full mb-6">
              LIMITED TO FIRST 25 BUYERS
            </div>
            <h2 className="text-3xl font-medium mb-4">Get the DevSpec Pass</h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto text-sm leading-relaxed">
              Unlock all premium DevSpecs for 90 days. Early-bird pricing: $197
              for the first 25 buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Link
                href="/pass"
                className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded text-sm font-medium transition-colors"
              >
                Get Early Bird Access
              </Link>
              <Link
                href="/catalog"
                className="border border-brand-border hover:border-gray-600 px-8 py-3 rounded text-sm font-medium transition-colors"
              >
                Browse Individual DevSpecs
              </Link>
            </div>
            <p className="text-xs text-gray-700">
              Regular price: $97/month after early-bird sold out
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Browse CTA */}
      <FadeIn>
        <section className="container mx-auto px-4 py-24 mb-32">
          <div className="bg-brand-gray rounded border border-brand-border p-16 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-medium mb-4">Ready to Build Faster?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              Browse our complete catalog of DevSpec packs and start building
              production-ready applications with AI coding agents.
            </p>
            <Link
              href="/catalog"
              className="inline-block bg-white text-black hover:bg-gray-200 px-6 py-3 rounded text-sm font-medium transition-colors"
            >
              View All DevSpecs
            </Link>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
