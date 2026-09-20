import { notFound } from "next/navigation";
import Link from "next/link";
import { devSpecs } from "@/data/devspecs";
import CheckoutButton from "@/components/CheckoutButton";
import { generateSEO, generateProductJsonLd } from "@/lib/seo";
import { FadeIn, Reveal } from "@/components/Reveal";
import ProofStrip from "@/components/ProofStrip";

export async function generateStaticParams() {
  return devSpecs.map((spec) => ({
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

  if (!spec) {
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
