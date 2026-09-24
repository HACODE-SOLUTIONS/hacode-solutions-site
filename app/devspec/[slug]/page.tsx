import { notFound } from "next/navigation";
import Link from "next/link";
import { devSpecs } from "@/data/devspecs";
import CheckoutButton from "@/components/CheckoutButton";
import { generateSEO, generateProductJsonLd } from "@/lib/seo";
import { FadeIn, Reveal } from "@/components/Reveal";
import ProofStrip from "@/components/ProofStrip";
import ClientOnboardingProof from "@/components/ClientOnboardingProof";

export async function generateStaticParams() {
  return devSpecs.filter(spec => !spec.sunset).map((spec) => ({
    slug: spec.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const spec = devSpecs.find((s) => s.slug === params.slug);

  if (!spec) {
    return {};
  }

  return generateSEO({
    title: spec.name,
    description: spec.description,
    path: `/devspec/${spec.slug}`,
    ogImage: `/og-${spec.slug}.png`,
  });
}

export default function DevSpecPage({ params }: { params: { slug: string } }) {
  const spec = devSpecs.find((s) => s.slug === params.slug);

  if (!spec || spec.sunset) {
    notFound();
  }

  const productJsonLd = generateProductJsonLd({
    name: spec.name,
    description: spec.description,
    price: spec.price,
    url: `/devspec/${spec.slug}`,
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
            href="/catalog"
            className="text-gray-500 hover:text-white mb-12 inline-flex items-center gap-2 text-sm transition-colors"
          >
            ← Back
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-16 mt-8">
          <div className="lg:col-span-2">
            <FadeIn delay={0.1}>
              <div className="mb-8 flex items-center gap-3 text-xs">
                {spec.isPaid ? (
                  <span className="text-gray-400">${spec.price}</span>
                ) : (
                  <span className="text-gray-400">Free</span>
                )}
                <span className="text-gray-700">·</span>
                <span className="text-gray-500">{spec.category}</span>
                {spec.popular && (
                  <>
                    <span className="text-gray-700">·</span>
                    <span className="text-gray-500">Popular</span>
                  </>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl font-medium mb-6 tracking-tight">
                {spec.name}
              </h1>
              <p className="text-lg text-gray-400 mb-12 leading-relaxed">
                {spec.longDescription}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-brand-gray rounded border border-brand-border p-6 mb-12">
                <h2 className="text-sm font-medium mb-3">Works With Any AI Tool</h2>
                <p className="text-gray-500 mb-4 text-xs leading-relaxed">
                  This DevSpec works with all AI coding assistants and LLMs.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                    Cursor
                  </span>
                  <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                    Claude
                  </span>
                  <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                    Copilot
                  </span>
                  <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                    ChatGPT
                  </span>
                  <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                    Gemini
                  </span>
                  <span className="px-2.5 py-1 bg-brand-black rounded border border-brand-border text-xs text-gray-500">
                    Any LLM
                  </span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="mb-12">
                <h2 className="text-lg font-medium mb-4">What's Included</h2>
                <Reveal stagger={0.05}>
                  <ul className="space-y-2.5">
                    {spec.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <span className="text-gray-600 mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-gray-400 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mb-12">
                <h2 className="text-lg font-medium mb-4">File Structure</h2>
                <div className="bg-brand-black rounded border border-brand-border p-6">
                  <div className="font-mono text-xs space-y-1.5">
                    <div className="text-gray-600 mb-3">
                      {spec.fileCount} files in this pack
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span>📄</span>
                      <span>README.md</span>
                      <span className="text-gray-700">Setup guide</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span>📄</span>
                      <span>DEVSPEC.md</span>
                      <span className="text-gray-700">AI specifications</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span>📁</span>
                      <span>src/</span>
                      <span className="text-gray-700">Source structure</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 pl-4">
                      <span>📄</span>
                      <span>app/</span>
                      <span className="text-gray-700">Application code</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 pl-4">
                      <span>📄</span>
                      <span>components/</span>
                      <span className="text-gray-700">React components</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 pl-4">
                      <span>📄</span>
                      <span>lib/</span>
                      <span className="text-gray-700">Utilities</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span>📄</span>
                      <span>package.json</span>
                      <span className="text-gray-700">Dependencies</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span>📄</span>
                      <span>Config files</span>
                      <span className="text-gray-700">TypeScript, Tailwind, etc.</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="mb-12">
                <h2 className="text-lg font-medium mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {spec.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-brand-gray rounded border border-brand-border text-xs text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {spec.slug === "mvp-auth-stripe-billing" && <ProofStrip />}
            {spec.slug === "freelancer-client-onboarding-kit" && <ClientOnboardingProof />}

            {spec.slug === "sales-call-scope-brief-kit" && (
              <>
                <FadeIn delay={0.5}>
                  <div className="mb-12 bg-brand-black rounded border border-red-900/30 p-6">
                    <h2 className="text-lg font-medium mb-4 text-red-400">Not For</h2>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                        <span>Not for CRM/lead-gen systems or cold outreach sequences</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                        <span>Not a full proposal writing course or sales training curriculum</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                        <span>Not lawyer-drafted MSAs or binding contract language</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                        <span>Not Product #2 Week 0 onboarding (that's post-yes ops, $39)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>
                        <span>Not Product #1 Auth+Stripe build code (that's when build needs billing, $49)</span>
                      </li>
                    </ul>
                  </div>
                </FadeIn>

                <FadeIn delay={0.55}>
                  <div className="mb-12">
                    <h2 className="text-lg font-medium mb-4">3 Use Scenarios</h2>
                    <div className="space-y-4">
                      <div className="bg-brand-gray rounded border border-brand-border p-5">
                        <h3 className="font-medium text-sm mb-2">Scenario 1: Discovery Call → Same-Day Scope Lock</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          You just hung up from a 45-minute discovery call. Notes are messy. Client said "make it pop" and "payment plans if easy." 
                          Use the SKILL to extract gaps, output a locked scope brief with In/Out lists, and send the "Heard you" recap—same day.
                        </p>
                      </div>
                      <div className="bg-brand-gray rounded border border-brand-border p-5">
                        <h3 className="font-medium text-sm mb-2">Scenario 2: Prevent Free Consulting Trap</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Prospect asks for "some ideas" or "a few options." Instead of writing a free strategy essay, use the recap email template 
                          to park vague requests as **Out** until they're written **In** with decision-maker confirmation.
                        </p>
                      </div>
                      <div className="bg-brand-gray rounded border border-brand-border p-5">
                        <h3 className="font-medium text-sm mb-2">Scenario 3: Missing Decision-Maker GAP</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Office manager says "yes" but the owner signs checks over $2k. The SKILL flags decision-maker GAPs so you don't lock 
                          scope or send a quote until the real buyer confirms.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-brand-black rounded border border-brand-border">
                      <p className="text-xs text-gray-500 italic">
                        <strong className="text-gray-400">Honest limits:</strong> Won't find clients for you. Won't close deals for you. 
                        Messy notes without a decision-maker confirmation still stall. This pack saves hours <em>after</em> the call, 
                        not before you have a real prospect.
                      </p>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.6}>
                  <div className="mb-12 bg-gradient-to-br from-brand-gray to-brand-black rounded border border-brand-border p-6">
                    <h2 className="text-lg font-medium mb-4">SAMPLE Proof: 10-Minute Stranger Path</h2>
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                      Real redacted discovery call → locked scope brief in ≤10 minutes (no live prospect, just the pack + AI skill). 
                      Included in the zip as <code className="text-xs bg-brand-black px-1.5 py-0.5 rounded">SAMPLE.md</code>.
                    </p>
                    <div className="bg-brand-black rounded border border-brand-border p-4 mb-4">
                      <div className="text-xs font-mono text-gray-500 space-y-2">
                        <div><span className="text-gray-600">Input:</span> Messy 8-line Zoom notes — "make the forms pop," "payment plans if easy," vague next step</div>
                        <div><span className="text-gray-600">Output:</span> 3 discovery GAPs identified → Scope brief with In/Out/Assumptions → "Heard you" recap email ready to send</div>
                        <div className="pt-2 border-t border-brand-border mt-2">
                          <span className="text-gray-600">Time:</span> ≤10 minutes for a stranger with no context
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      No fake testimonials. No invented star ratings. Just a reproducible before/after path you can test yourself after purchase.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.65}>
                  <div className="mb-12">
                    <h2 className="text-lg font-medium mb-4">Handoffs: What Happens Next</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-brand-gray rounded border border-brand-border p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">📦</span>
                          <h3 className="font-medium text-sm">After Deposit Clears</h3>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                          Client said yes and sent the deposit? Hand off Week 0 onboarding ops to Product #2.
                        </p>
                        <Link
                          href="/devspec/freelancer-client-onboarding-kit"
                          className="text-sm text-brand-purple hover:text-purple-400 transition-colors inline-flex items-center gap-1"
                        >
                          Freelancer Client Onboarding Kit →
                          <span className="text-xs text-gray-500">$39</span>
                        </Link>
                      </div>
                      <div className="bg-brand-gray rounded border border-brand-border p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl">🔐</span>
                          <h3 className="font-medium text-sm">When Build Needs Auth+Billing</h3>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                          Scoped build needs paid signup, user accounts, or Stripe checkout? Compose with Product #1.
                        </p>
                        <Link
                          href="/devspec/mvp-auth-stripe-billing"
                          className="text-sm text-brand-purple hover:text-purple-400 transition-colors inline-flex items-center gap-1"
                        >
                          MVP Auth + Stripe Billing →
                          <span className="text-xs text-gray-500">$49</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.7}>
                  <div className="mb-12 bg-brand-gray rounded border border-brand-border p-6">
                    <h2 className="text-lg font-medium mb-3">Not Another $19 Word Zip</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Generic $19–$29 proposal templates give you blank Word docs and a "customize this" note. This pack is $35 because it includes 
                      an <strong className="text-white">AI skill</strong> that outputs an executable scope brief from messy notes—not a fluff proposal essay. 
                      Plus explicit handoffs into the $39 onboarding kit and $49 DevSpec when the build needs Auth+Stripe.
                    </p>
                  </div>
                </FadeIn>
              </>
            )}

            <Reveal stagger={0.1}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-brand-gray rounded border border-brand-border p-6">
                  <h3 className="font-medium mb-2 text-sm">Who It's For</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {spec.whoFor}
                  </p>
                </div>
                {spec.diyTime && (
                  <div className="bg-brand-gray rounded border border-brand-border p-6">
                    <h3 className="font-medium mb-2 text-sm">Time Saved</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      DIY: <span className="text-white">{spec.diyTime}</span>
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      With DevSpec: minutes
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          <FadeIn delay={0.3} className="lg:col-span-1">
            <div className="bg-brand-gray rounded border border-brand-border p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-xs text-gray-600 mb-1">Package</div>
                <div className="text-xl font-medium mb-1">{spec.fileCount} files</div>
                <div className="text-xs text-gray-600">
                  Specs + scaffolds + config
                </div>
              </div>

              <div className="mb-6 pb-6 border-b border-brand-border">
                <div className="text-xs text-gray-600 mb-1">Category</div>
                <div className="font-medium text-sm">{spec.category}</div>
              </div>

              {spec.isPaid && spec.stripePriceId ? (
                <>
                  <div className="mb-6">
                    <div className="text-2xl font-medium mb-1">${spec.price}</div>
                    <div className="text-xs text-gray-600">
                      One-time • Lifetime access
                    </div>
                  </div>
                  <CheckoutButton
                    priceId={spec.stripePriceId}
                    productName={spec.name}
                    productSlug={spec.slug}
                    price={spec.price}
                  />
                  <div className="mt-3 text-xs text-gray-600 text-center">
                    Secure checkout via Stripe
                  </div>
                  <div className="mt-4 pt-4 border-t border-brand-border">
                    <p className="text-xs text-gray-500 text-center leading-relaxed">
                      7-day refund if the pack isn't useful. Email support with your order email.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="text-2xl font-medium mb-1">Free</div>
                    <div className="text-xs text-gray-600">
                      Open source • MIT License
                    </div>
                  </div>
                  <Link
                    href={spec.githubUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-black hover:bg-gray-200 px-6 py-3 rounded text-sm font-medium transition-colors text-center"
                  >
                    View on GitHub
                  </Link>
                  <div className="mt-3 text-xs text-gray-600 text-center">
                    Clone or download
                  </div>
                </>
              )}

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
