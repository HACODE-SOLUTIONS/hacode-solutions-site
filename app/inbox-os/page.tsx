import { generateSEO, generateProductJsonLd } from "@/lib/seo";
import { FadeIn, Reveal } from "@/components/Reveal";
import CheckoutButton from "@/components/CheckoutButton";
import Link from "next/link";
import { getDevSpecBySlug } from "@/data/devspecs";
import { notFound } from "next/navigation";

export const metadata = generateSEO({
  title: "Inbox OS - Grok Bot Ready",
  description:
    "Configure a Grok Bot agent as your small-business inbox brain — WhatsApp, Instagram DMs, and multi-chat orders in one place. $79 one-time digital pack.",
  path: "/inbox-os",
});

export default function InboxOSPage() {
  const product = getDevSpecBySlug("inbox-os");

  if (!product || product.sunset) {
    notFound();
  }

  const productJsonLd = generateProductJsonLd({
    name: "Inbox OS",
    description:
      "Configure a Grok Bot agent that becomes your small-business inbox brain — WhatsApp, Instagram DMs, and other chats in one place — so you catch orders and manage conversations without tab-hopping.",
    price: 79,
    url: "/inbox-os",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <div className="container mx-auto px-4 py-24">
        <FadeIn>
          <Link
            href="/"
            className="text-gray-500 hover:text-white mb-12 inline-flex items-center gap-2 text-sm transition-colors"
          >
            ← Back
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-16 mt-8">
          <div className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <div className="mb-8 flex items-center gap-3 text-xs">
                <span className="text-gray-400">$79</span>
                <span className="text-gray-700">·</span>
                <span className="text-gray-500">Operating Kits</span>
                <span className="text-gray-700">·</span>
                <span className="px-2.5 py-1 bg-brand-purple/10 border border-brand-purple text-brand-purple rounded-full">
                  Grok Bot ready
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl font-medium mb-6 tracking-tight">
                Inbox OS
              </h1>
              <p className="text-lg text-gray-400 mb-12 leading-relaxed">
                Configure a Grok Bot agent that becomes your small-business{" "}
                <strong className="text-white">inbox brain</strong> — WhatsApp,
                Instagram DMs, and other chats in one place — so you catch orders
                and manage conversations without tab-hopping.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-brand-gray rounded border border-brand-border p-6 mb-12">
                <h2 className="text-sm font-medium mb-3">What This Is</h2>
                <p className="text-gray-500 mb-4 text-xs leading-relaxed">
                  Pack, not platform/channel: not InboxAgent email SaaS, not blank
                  Grok Bot, not WhatsApp Business itself. One-time digital SKU —
                  prompts, skills, context, setup.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                    Grok Bot
                  </span>
                  <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                    Cursor
                  </span>
                  <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                    ChatGPT Projects
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="mb-12 bg-brand-black rounded border border-red-900/30 p-6">
                <h2 className="text-lg font-medium mb-4 text-red-400">Not For</h2>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                    <span>
                      Not hosted bot seats, not Meta/WhatsApp Business API setup
                      done-for-you, not a CRM replacement
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                    <span>
                      Not legal advice on messaging compliance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                    <span>
                      Not for email-only triage SaaS buyers or enterprise contact
                      centers
                    </span>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mb-12">
                <h2 className="text-lg font-medium mb-4">What's Included</h2>
                <Reveal stagger={0.05}>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-400 leading-relaxed">
                        START-HERE.md — ≤60 min setup; load into Grok Bot; first
                        conversation test
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-400 leading-relaxed">
                        BUSINESS-CONTEXT.md — Fill-in: offer, hours, prices, FAQs,
                        tone, do/don't
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-400 leading-relaxed">
                        CHANNEL-MAP.md — WhatsApp / IG DM / email / other — what each
                        channel is for
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-400 leading-relaxed">
                        ORDER-INTAKE.md — Order fields, confirm/cancel scripts,
                        handoff to human
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-400 leading-relaxed">
                        INBOX-SKILL.md + .cursorrules — Triage → classify → draft
                        reply → log → escalate
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-400 leading-relaxed">
                        PROMPTS.md — Ready prompts: new lead, order confirm, FAQ,
                        angry customer, after-hours
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-400 leading-relaxed">
                        ESCALATION.md — When the bot must stop and ping a human
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-400 leading-relaxed">
                        SAMPLE.md — Redacted before/after: messy DMs → clean order
                        log + reply (≤10 min stranger path)
                      </span>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-gray-400 leading-relaxed">
                        CHECKLIST.md · FAQ.md · CONTENTS.md — Done means X · footguns
                        · exact zip list
                      </span>
                    </li>
                  </ul>
                </Reveal>
              </div>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="mb-12 bg-gradient-to-br from-brand-gray to-brand-black rounded border border-brand-border p-6">
                <h2 className="text-lg font-medium mb-4">
                  SAMPLE Proof: 10-Minute Stranger Path
                </h2>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Real redacted discovery — messy bakery DMs → structured order
                  log + guarded draft reply in ≤10 minutes (no live prospect,
                  just the pack + AI skill). Included in the zip as{" "}
                  <code className="text-xs bg-brand-black px-1.5 py-0.5 rounded">
                    SAMPLE.md
                  </code>
                  .
                </p>
                <div className="bg-brand-black rounded border border-brand-border p-4 mb-4">
                  <div className="text-xs font-mono text-gray-500 space-y-2">
                    <div>
                      <span className="text-gray-600">Input:</span> Messy WhatsApp
                      + IG DMs — "do u guys do birthday cakes?", "can u do 20% off
                      if i also get cupcakes", medical-cost liability ask
                    </div>
                    <div>
                      <span className="text-gray-600">Output:</span> Triage labels
                      → order log (6" cake $48, no invented discount) → guarded
                      draft reply → escalate=yes on medical liability → human verify
                      payment claim
                    </div>
                    <div className="pt-2 border-t border-brand-border mt-2">
                      <span className="text-gray-600">Time:</span> ≤10 minutes for
                      a stranger with no context
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  No fake testimonials. No invented star ratings. Just a
                  reproducible before/after path you can test yourself after
                  purchase.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="mb-12">
                <h2 className="text-lg font-medium mb-4">
                  Purchase Moment This Proves
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  "I have (or will get) Grok Bot; I need the inbox + orders kit
                  tonight."
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Not another $19 Word doc zip. This pack includes an{" "}
                  <strong className="text-gray-400">AI skill</strong> that outputs
                  structured order logs and guarded replies from messy notes — not
                  a fluff proposal essay.
                </p>
              </div>
            </FadeIn>

            <Reveal stagger={0.1}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-brand-gray rounded border border-brand-border p-6">
                  <h3 className="font-medium mb-2 text-sm">Who It's For</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Owners of small shops, studios, local services, and solo
                    operators who already get orders and questions in WhatsApp / IG
                    DMs and want one bot context that sorts, replies with
                    guardrails, and logs what matters.
                  </p>
                </div>
                <div className="bg-brand-gray rounded border border-brand-border p-6">
                  <h3 className="font-medium mb-2 text-sm">Time Saved</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    DIY: <span className="text-white">8-20 hours</span>
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    With this pack: ≤60 minutes setup
                  </p>
                </div>
              </div>
            </Reveal>

            <FadeIn delay={0.55}>
              <div className="mt-12 p-4 bg-brand-black rounded border border-brand-border">
                <p className="text-xs text-gray-500">
                  <strong className="text-gray-400">Independent digital pack</strong>{" "}
                  from hacode.solutions — not affiliated with, endorsed by, or part
                  of xAI, X, or Grok. Grok Bot is a third-party product; you need
                  your own access. Not certified Meta partnership; pack teaches how
                  to instruct an agent, not Business API provisioning.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} className="lg:col-span-1">
            <div className="bg-brand-gray rounded border border-brand-border p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-xs text-gray-600 mb-1">Package</div>
                <div className="text-xl font-medium mb-1">11 files</div>
                <div className="text-xs text-gray-600">
                  Context + skills + prompts
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-brand-border">
                <div className="text-xs text-gray-600 mb-1">Category</div>
                <div className="font-medium text-sm">Operating Kits</div>
              </div>

              <div className="mb-6">
                <div className="text-2xl font-medium mb-1">$79</div>
                <div className="text-xs text-gray-600">
                  One-time • Lifetime access
                </div>
              </div>

              <CheckoutButton
                priceId={process.env.STRIPE_PRICE_ID_INBOX_OS || ""}
                productName="Inbox OS"
                productSlug="inbox-os"
                price={79}
              />

              <div className="mt-3 text-xs text-gray-600 text-center">
                Secure checkout via Stripe
              </div>

              <div className="mt-4 pt-4 border-t border-brand-border">
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  7-day refund if the pack isn't useful. Email support with your
                  order email.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-brand-border">
                <div className="text-xs font-medium mb-3">Instant Delivery</div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">✓</span>
                    <span>Complete file structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">✓</span>
                    <span>AI-ready specifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">✓</span>
                    <span>Production patterns</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
