"use client";

import { useState } from "react";
import { FadeIn } from "./Reveal";

export default function ProofStrip() {
  const [expanded, setExpanded] = useState(false);

  return (
    <FadeIn delay={0.25}>
      <div className="bg-brand-gray rounded border border-brand-border p-6 mb-12">
        <h2 className="text-lg font-medium mb-3">
          What you get in 10 minutes
        </h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          A stranger can follow the pack's money path with{" "}
          <span className="text-white">test keys only</span>, no production
          secrets, and see{" "}
          <span className="text-white">
            Auth → Checkout → Webhook → Gated route
          </span>
          .
        </p>

        {/* Timeline Steps */}
        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="text-xs text-gray-600 font-mono pt-1 w-20 flex-shrink-0">
              Min 0–2
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              Point the agent at DEVSPEC.md + env setup — starter → auth →
              stripe → entitlements for a single "pro" subscription
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-xs text-gray-600 font-mono pt-1 w-20 flex-shrink-0">
              Min 2–5
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              Sign-in working, <code className="text-gray-300 bg-brand-black px-1.5 py-0.5 rounded text-xs">POST /api/checkout</code> returns Stripe URL,{" "}
              <code className="text-gray-300 bg-brand-black px-1.5 py-0.5 rounded text-xs">POST /api/webhooks/stripe</code> verifies signatures
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-xs text-gray-600 font-mono pt-1 w-20 flex-shrink-0">
              Min 5–8
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              Run the happy path: sign in → blocked page → checkout with{" "}
              <span className="text-gray-300">4242 4242 4242 4242</span> →
              webhook fires → page unlocks
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-xs text-gray-600 font-mono pt-1 w-20 flex-shrink-0">
              Min 8–10
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              Prove you didn't cheat: resend event → still one entitlement,
              cancel subscription → page locks again
            </div>
          </div>
        </div>

        {/* JSON Example */}
        <div className="bg-brand-black rounded border border-brand-border p-4 mb-4">
          <div className="text-xs text-gray-600 mb-2 font-mono">
            GET /api/me/access (redacted example)
          </div>
          <pre className="text-xs text-gray-400 font-mono overflow-x-auto">
            {`{
  "authenticated": true,
  "entitlements": [
    {
      "key": "pro",
      "status": "active",
      "validUntil": null
    }
  ]
}`}
          </pre>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          {expanded ? "Hide full walkthrough ↑" : "See full walkthrough →"}
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-6 pt-6 border-t border-brand-border space-y-4 text-xs text-gray-500 leading-relaxed">
            <div>
              <h3 className="text-sm font-medium text-white mb-2">
                What you need open
              </h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>This pack folder (after purchase)</li>
                <li>A Next.js App Router app</li>
                <li>Stripe account in test mode + Stripe CLI</li>
                <li>One OAuth app (GitHub)</li>
                <li>Cursor or Claude Code with the pack's files</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white mb-2">
                What "good" looks like vs vague prompting
              </h3>
              <div className="bg-brand-gray rounded border border-brand-border p-3 space-y-2">
                <div className="flex gap-3">
                  <div className="text-gray-600 w-40 flex-shrink-0">
                    Vague prompt only
                  </div>
                  <div className="text-gray-600">→</div>
                  <div className="text-gray-500">
                    Agent unlocks page on redirect
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-gray-400 w-40 flex-shrink-0">
                    With this pack
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-gray-300">
                    Webhook + Entitlement row
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white mb-2">
                Honest limits
              </h3>
              <ul className="space-y-1 text-gray-500">
                <li>• Sample does not include a downloadable running SaaS</li>
                <li>• Legal/tax/PCI advisory is out of scope</li>
                <li>
                  • One subscription Price ID is the v1 path; teams/seats are
                  not
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  );
}
