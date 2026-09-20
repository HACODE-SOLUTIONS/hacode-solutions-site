"use client";

import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";
import { Reveal, FadeIn } from "@/components/Reveal";

interface PassClientProps {
  earlyBirdPriceId?: string;
}

// Custom Instagram icon (lucide-react doesn't have brand icons)
const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function PassClient({ earlyBirdPriceId }: PassClientProps) {
  const hasEarlyBirdCheckout = Boolean(earlyBirdPriceId);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="inline-block px-3 py-1 border border-brand-purple text-brand-purple text-xs rounded-full mb-6">
              LIMITED TO FIRST 25 BUYERS
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-medium mb-6 tracking-tight">
              DevSpec Pass
              <br />
              <span className="text-gray-400">Early Bird Access</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl text-gray-400 mb-4 leading-relaxed max-w-2xl mx-auto">
              Unlock all premium DevSpecs for 90 days.
              <br />
              Build production SaaS faster with AI agents.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mb-12">
              <div className="text-5xl font-medium mb-2">
                $197
                <span className="text-lg text-gray-600 ml-2">/ 90 days</span>
              </div>
              <div className="text-sm text-gray-600">
                Early-bird pricing · First 25 buyers only
              </div>
              <div className="text-sm text-gray-700 mt-1">
                Regular price: $97/month
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            {hasEarlyBirdCheckout ? (
              <div className="flex flex-col items-center gap-4">
                <CheckoutButton
                  priceId={earlyBirdPriceId!}
                  productName="DevSpec Pass - Early Bird (90 days)"
                />
                <p className="text-xs text-gray-600">
                  Secure checkout powered by Stripe
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <a
                  href="https://www.instagram.com/hacodesolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded text-sm font-medium transition-colors"
                >
                  <InstagramIcon />
                  Comment PASS on Instagram
                </a>
                <p className="text-sm text-gray-600">
                  Join the waitlist · Checkout launching soon
                </p>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* What's Included */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-medium mb-12 text-center">
              What You Get
            </h2>
          </FadeIn>

          <Reveal stagger={0.1}>
            <div className="space-y-6">
              <div className="bg-brand-gray rounded border border-brand-border p-8">
                <h3 className="text-lg font-medium mb-3">
                  All Premium DevSpecs
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Instant access to every paid DevSpec pack we offer — currently
                  the SaaS Launch Kit ($199 value) plus all future premium packs
                  released during your 90 days.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-purple mt-0.5">✓</span>
                    <span>SaaS Launch Kit (Auth.js + Stripe + Next.js integration)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-purple mt-0.5">✓</span>
                    <span>Future premium DevSpecs released in 90 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-purple mt-0.5">✓</span>
                    <span>Full markdown specs, file trees, acceptance tests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-purple mt-0.5">✓</span>
                    <span>AI agent prompts optimized for all LLMs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-8">
                <h3 className="text-lg font-medium mb-3">90 Days Full Access</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Three full months to build. Download everything once, keep the
                  files forever. Build multiple projects, iterate with AI agents,
                  ship production code.
                </p>
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-8">
                <h3 className="text-lg font-medium mb-3">
                  Free Starters Stay Free
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  You still get all five free GitHub starters (Next.js, Stripe,
                  Auth.js, Telegram, Design handoff) — the Pass unlocks only the
                  premium integration packs.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who It's For */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-medium mb-12 text-center">
              Perfect For
            </h2>
          </FadeIn>

          <Reveal stagger={0.1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-brand-gray rounded border border-brand-border p-6">
                <h3 className="font-medium mb-2 text-sm">
                  Founders Shipping Fast
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Launch multiple SaaS MVPs in 90 days. Get the architecture
                  blueprints, wire them with AI agents, ship to customers.
                </p>
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-6">
                <h3 className="font-medium mb-2 text-sm">AI Power Users</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  You use Cursor, Claude, Copilot, or ChatGPT daily. DevSpecs
                  give your AI agents the context to build production-grade
                  integrations.
                </p>
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-6">
                <h3 className="font-medium mb-2 text-sm">Agencies Building Client Projects</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ship client projects faster with pre-built integration patterns.
                  One Pass covers unlimited projects for 90 days.
                </p>
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-6">
                <h3 className="font-medium mb-2 text-sm">
                  Developers Learning Fast
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Study production-grade architecture patterns. See how Auth.js,
                  Stripe, and Next.js wire together in real integration specs.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-medium mb-12 text-center">
              Early Bird vs Regular
            </h2>
          </FadeIn>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-brand-gray rounded border-2 border-brand-purple p-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-purple text-white text-xs rounded-full">
                  LIMITED OFFER
                </div>
                <h3 className="text-xl font-medium mb-2">Early Bird</h3>
                <div className="text-4xl font-medium mb-4">
                  $197
                  <span className="text-sm text-gray-600 ml-2">/ 90 days</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-400 mb-6">
                  <li>✓ 90 days full access</li>
                  <li>✓ All premium DevSpecs</li>
                  <li>✓ Future packs included</li>
                  <li>✓ First 25 buyers only</li>
                </ul>
                {hasEarlyBirdCheckout ? (
                  <CheckoutButton
                    priceId={earlyBirdPriceId!}
                    productName="DevSpec Pass - Early Bird (90 days)"
                  />
                ) : (
                  <a
                    href="https://www.instagram.com/hacodesolutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded text-sm font-medium transition-colors"
                  >
                    <InstagramIcon />
                    Join Waitlist
                  </a>
                )}
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-8 opacity-60">
                <h3 className="text-xl font-medium mb-2">Regular</h3>
                <div className="text-4xl font-medium mb-4">
                  $97
                  <span className="text-sm text-gray-600 ml-2">/ month</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-400 mb-6">
                  <li>✓ Monthly access</li>
                  <li>✓ All premium DevSpecs</li>
                  <li>✓ Future packs included</li>
                  <li>✓ After early-bird sold out</li>
                </ul>
                <button
                  disabled
                  className="w-full bg-brand-border text-gray-600 px-6 py-3 rounded text-sm font-medium cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </Reveal>

          <FadeIn delay={0.2}>
            <p className="text-center text-sm text-gray-600 mt-8">
              Early-bird saves you $94 if you build for 90 days.
              <br />
              Regular monthly pricing launches after first 25 sales.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-medium mb-12 text-center">
              Frequently Asked Questions
            </h2>
          </FadeIn>

          <Reveal stagger={0.08}>
            <div className="space-y-6">
              <div className="bg-brand-gray rounded border border-brand-border p-6">
                <h3 className="font-medium mb-2 text-sm">
                  What happens after 90 days?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  You keep all the DevSpec files you downloaded. They're yours
                  forever. You just won't get new premium packs released after
                  your 90 days end.
                </p>
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-6">
                <h3 className="font-medium mb-2 text-sm">
                  Can I use this for client projects?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes. Build unlimited projects — personal, client work, or
                  commercial products. No per-project fees.
                </p>
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-6">
                <h3 className="font-medium mb-2 text-sm">
                  Do free DevSpecs stay free?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes. The five free GitHub starters (Next.js, Stripe webhooks,
                  Auth.js, Telegram bot, Design handoff) remain free and public
                  forever. The Pass unlocks only the premium integration packs.
                </p>
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-6">
                <h3 className="font-medium mb-2 text-sm">
                  Which AI coding tools work with DevSpecs?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All of them. DevSpecs are markdown files optimized for LLMs —
                  Cursor, Claude, GitHub Copilot, ChatGPT, Gemini, or any AI
                  coding assistant.
                </p>
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-6">
                <h3 className="font-medium mb-2 text-sm">
                  What if I only need one DevSpec?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Buy individual packs like the SaaS Launch Kit ($199) from the
                  catalog. The Pass makes sense if you're building multiple
                  projects or want future premium packs.
                </p>
              </div>

              <div className="bg-brand-gray rounded border border-brand-border p-6">
                <h3 className="font-medium mb-2 text-sm">Refund policy?</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Since DevSpecs are digital downloads, all sales are final. Try
                  the free GitHub starters first to see if our format works for
                  you.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <FadeIn>
        <section className="container mx-auto px-4 py-24 mb-32">
          <div className="bg-brand-gray rounded border border-brand-border p-16 text-center max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 border border-brand-purple text-brand-purple text-xs rounded-full mb-6">
              LIMITED TO FIRST 25 BUYERS
            </div>
            <h2 className="text-3xl font-medium mb-4">
              Get Early Bird Access
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              $197 for 90 days. Unlock all premium DevSpecs. Build faster with AI
              agents.
            </p>
            {hasEarlyBirdCheckout ? (
              <div className="flex flex-col items-center gap-4">
                <CheckoutButton
                  priceId={earlyBirdPriceId!}
                  productName="DevSpec Pass - Early Bird (90 days)"
                />
                <Link
                  href="/catalog"
                  className="text-sm text-gray-600 hover:text-white transition-colors"
                >
                  Or browse individual DevSpecs →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <a
                  href="https://www.instagram.com/hacodesolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded text-sm font-medium transition-colors"
                >
                  <InstagramIcon />
                  Comment PASS on Instagram
                </a>
                <p className="text-sm text-gray-600">
                  Join the waitlist · Checkout launching soon
                </p>
              </div>
            )}
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
