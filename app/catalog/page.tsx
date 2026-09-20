import CatalogClient from "@/components/CatalogClient";
import { generateSEO } from "@/lib/seo";
import { FadeIn } from "@/components/Reveal";
import Link from "next/link";

export const metadata = generateSEO({
  title: "DevSpecs Catalog",
  description:
    "Browse DevSpec packs for AI coding agents. Free starters for Next.js, Stripe, and Auth. Premium production-ready SaaS kits. Works with Cursor, Claude, Copilot, ChatGPT, Gemini.",
  path: "/catalog",
});

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <FadeIn>
        <h1 className="text-4xl font-medium mb-4">DevSpecs Catalog</h1>
        <p className="text-gray-500 mb-8 max-w-2xl text-sm leading-relaxed">
          Structured specs and starter scaffolds for AI coding agents. Pick a pack,
          open with your AI tool, ship production code.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-brand-gray rounded border border-brand-purple p-6 mb-12 max-w-3xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-brand-purple/10 border border-brand-purple text-brand-purple text-xs rounded-full">
                  MOST POPULAR
                </span>
              </div>
              <h3 className="font-medium mb-1 text-sm">MVP Auth + Stripe Billing DevSpec Pack</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">
                Ship a working paid signup path in one day. Auth.js + Stripe webhooks + entitlements.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/devspec/mvp-auth-stripe-billing"
                  className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded text-xs font-medium transition-colors inline-block"
                >
                  View Details
                </Link>
                <span className="text-sm font-medium">$49</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <CatalogClient />
    </div>
  );
}
