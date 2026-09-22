"use client";

import { useState } from "react";
import { FadeIn } from "./Reveal";
import Link from "next/link";

export default function ClientOnboardingProof() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Sharp Not-for Block */}
      <FadeIn delay={0.2}>
        <div className="bg-brand-gray rounded border border-brand-border p-6 mb-8">
          <h2 className="text-lg font-medium mb-3 text-white">Not for</h2>
          <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="text-gray-600 mt-0.5 flex-shrink-0">×</span>
              <span>Lead-gen or finding clients</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-600 mt-0.5 flex-shrink-0">×</span>
              <span>Agency PMO or multi-client program ops</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-600 mt-0.5 flex-shrink-0">×</span>
              <span>Legal contracts or MSA drafting</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-gray-600 mt-0.5 flex-shrink-0">×</span>
              <span>
                Replacing the{" "}
                <Link
                  href="/devspec/mvp-auth-stripe-billing"
                  className="text-white hover:text-gray-300 underline"
                >
                  MVP Auth + Stripe DevSpec
                </Link>{" "}
                when your client needs Auth→Checkout→Entitlement
              </span>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 3 Use Scenarios + Honesty Line */}
      <FadeIn delay={0.22}>
        <div className="bg-brand-gray rounded border border-brand-border p-6 mb-8">
          <h2 className="text-lg font-medium mb-3 text-white">
            When to use this pack
          </h2>
          <div className="space-y-3 mb-4">
            <div className="text-sm text-gray-400 leading-relaxed">
              <span className="text-white font-medium">Scenario 1:</span> Deposit
              cleared — need first-week OS today
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              <span className="text-white font-medium">Scenario 2:</span> Blocked on
              access or owners — need checklist before kickoff
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              <span className="text-white font-medium">Scenario 3:</span> Stakeholders
              disagree on done — need DoD + scope lock
            </div>
          </div>
          <div className="pt-3 border-t border-brand-border">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="text-gray-400 font-medium">Honest limits:</span> Won't
              find clients. Docs without owners or DoD still stall week 1.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Anti-$19 Word/Notion positioning */}
      <FadeIn delay={0.24}>
        <div className="bg-brand-black rounded border border-brand-border p-6 mb-8">
          <h3 className="text-sm font-medium text-white mb-2">
            Not another $19 Word/Notion template zip
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Generic onboarding packs give you static Word docs or Notion pages. This
            pack includes a <span className="text-white">Cursor/Claude AI skill</span>{" "}
            that drafts the project brief from your messy notes, plus{" "}
            <span className="text-white">DevSpec-style handoff patterns</span> for
            freelancers who build with AI coding tools—not copy-paste templates.
          </p>
        </div>
      </FadeIn>

      {/* Existing SAMPLE Proof Section */}
      <FadeIn delay={0.25}>
        <div className="bg-brand-gray rounded border border-brand-border p-6 mb-12">
          <h2 className="text-lg font-medium mb-3">
            10-Minute Proof: Messy Notes → Client Brief
          </h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          A stranger can turn{" "}
          <span className="text-white">messy call notes</span> into a coherent
          brief + scope boundary + sendable welcome email in{" "}
          <span className="text-white">≤10 minutes</span>, without a real
          client on the call.
        </p>

        {/* Timeline Steps */}
        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <div className="text-xs text-gray-600 font-mono pt-1 w-20 flex-shrink-0">
              Min 0–2
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              Skim START-HERE.md promise + Not for. Confirm this is post-yes ops,
              not lead hunting
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-xs text-gray-600 font-mono pt-1 w-20 flex-shrink-0">
              Min 2–6
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              Point agent at SKILL.md + .cursorrules. Paste messy notes →
              produce intake gaps + PROJECT-BRIEF.md + SCOPE-CHECKLIST.md
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-xs text-gray-600 font-mono pt-1 w-20 flex-shrink-0">
              Min 6–8
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              Review output: decision-maker named, in/out list clear, first-week
              DoD defined, access owners called out
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-xs text-gray-600 font-mono pt-1 w-20 flex-shrink-0">
              Min 8–10
            </div>
            <div className="text-sm text-gray-400 leading-relaxed">
              Generate send-ready welcome email from template. Open KICKOFF-AGENDA.md
              and confirm decision-lock list matches brief
            </div>
          </div>
        </div>

        {/* Example Output */}
        <div className="bg-brand-black rounded border border-brand-border p-4 mb-4">
          <div className="text-xs text-gray-600 mb-2 font-mono">
            Example: Scope checklist (excerpt from SAMPLE.md)
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <div className="text-gray-300">
              <strong>In:</strong> web app; tutor auth; session notes; parent
              read visibility
            </div>
            <div className="text-gray-400">
              <strong>Out:</strong> mobile apps; marketplace; Stripe
              subscriptions (until kickoff)
            </div>
            <div className="text-gray-500">
              <strong>Compose note:</strong> If kickoff moves Stripe In, use{" "}
              <Link
                href="/devspec/mvp-auth-stripe-billing"
                className="text-brand-purple hover:underline"
              >
                MVP Auth + Stripe Billing DevSpec
              </Link>{" "}
              ($49)
            </div>
          </div>
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
                <li>Cursor or Claude Code with SKILL.md + .cursorrules visible</li>
                <li>Ten minutes on a timer</li>
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
                    Fluffy legal-ish SOW essay
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-gray-400 w-40 flex-shrink-0">
                    With this pack
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-gray-300">
                    Brief + non-legal scope checklist
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="text-gray-600 w-40 flex-shrink-0">
                    Vague prompt
                  </div>
                  <div className="text-gray-600">→</div>
                  <div className="text-gray-500">
                    No decision-maker
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-gray-400 w-40 flex-shrink-0">
                    With this pack
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="text-gray-300">
                    Explicit GAP blocks "scope locked"
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white mb-2">
                Honest limits
              </h3>
              <ul className="space-y-1 text-gray-500">
                <li>• Not a lead-gen system, legal contract pack, or enterprise PMO suite</li>
                <li>• Sample does not include a Notion import file or PDF suite</li>
                <li>• Stripe implementation detail lives in{" "}
                  <Link
                    href="/devspec/mvp-auth-stripe-billing"
                    className="text-gray-400 hover:underline"
                  >
                    Product #1
                  </Link>, not here
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </FadeIn>
    </>
  );
}
