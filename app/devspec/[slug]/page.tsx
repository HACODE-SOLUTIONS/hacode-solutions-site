import { notFound } from "next/navigation";
import Link from "next/link";
import { devSpecs } from "@/data/devspecs";
import CheckoutButton from "@/components/CheckoutButton";
import { generateSEO, generateProductJsonLd } from "@/lib/seo";

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

      <div className="container mx-auto px-4 py-16">
        <Link
          href="/catalog"
          className="text-brand-purple hover:text-purple-400 mb-8 inline-flex items-center gap-2"
        >
          ← Back to Catalog
        </Link>

        <div className="grid lg:grid-cols-3 gap-12 mt-8">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              {spec.isPaid ? (
                <span className="inline-block bg-brand-purple px-4 py-2 rounded-full text-sm font-semibold">
                  ${spec.price} USD
                </span>
              ) : (
                <span className="inline-block bg-green-600 px-4 py-2 rounded-full text-sm font-semibold">
                  FREE
                </span>
              )}
              {spec.popular && (
                <span className="inline-block bg-purple-600/30 border border-purple-500 px-4 py-2 rounded-full text-sm font-semibold">
                  POPULAR
                </span>
              )}
              <span className="text-gray-400 text-sm">{spec.category}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{spec.name}</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {spec.longDescription}
            </p>

            <div className="bg-brand-gray rounded-xl p-6 mb-8 border border-brand-purple/30">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> Works With Any AI Tool
              </h2>
              <p className="text-gray-400 mb-4">
                This DevSpec works with all AI coding assistants and LLMs:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-brand-darker rounded border border-brand-gray text-sm">
                  Cursor
                </span>
                <span className="px-3 py-1 bg-brand-darker rounded border border-brand-gray text-sm">
                  Claude Code
                </span>
                <span className="px-3 py-1 bg-brand-darker rounded border border-brand-gray text-sm">
                  GitHub Copilot
                </span>
                <span className="px-3 py-1 bg-brand-darker rounded border border-brand-gray text-sm">
                  ChatGPT
                </span>
                <span className="px-3 py-1 bg-brand-darker rounded border border-brand-gray text-sm">
                  Gemini
                </span>
                <span className="px-3 py-1 bg-brand-darker rounded border border-brand-gray text-sm">
                  Any LLM
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What's Included</h2>
              <ul className="space-y-3">
                {spec.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">File Structure</h2>
              <div className="bg-brand-darker rounded-lg p-6 border border-brand-gray">
                <div className="font-mono text-sm space-y-2">
                  <div className="text-gray-500 mb-3">
                    📦 {spec.fileCount} files in this pack
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-green-400">📄</span>
                    <span>README.md</span>
                    <span className="text-gray-500 text-xs">— Setup guide</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-green-400">📄</span>
                    <span>DEVSPEC.md</span>
                    <span className="text-gray-500 text-xs">— AI specifications</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-brand-purple">📁</span>
                    <span>src/</span>
                    <span className="text-gray-500 text-xs">— Source structure</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 pl-4">
                    <span className="text-blue-400">📄</span>
                    <span>app/</span>
                    <span className="text-gray-500 text-xs">— Application code</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 pl-4">
                    <span className="text-blue-400">📄</span>
                    <span>components/</span>
                    <span className="text-gray-500 text-xs">— React components</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 pl-4">
                    <span className="text-blue-400">📄</span>
                    <span>lib/</span>
                    <span className="text-gray-500 text-xs">— Utilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-yellow-400">📄</span>
                    <span>package.json</span>
                    <span className="text-gray-500 text-xs">— Dependencies</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-blue-400">📄</span>
                    <span>Configuration files</span>
                    <span className="text-gray-500 text-xs">— TypeScript, Tailwind, etc.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {spec.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-brand-gray rounded-lg border border-brand-purple/30 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-brand-gray rounded-xl p-6">
                <h3 className="font-bold mb-2 text-lg">Who It's For</h3>
                <p className="text-gray-400">{spec.whoFor}</p>
              </div>
              {spec.diyTime && (
                <div className="bg-brand-gray rounded-xl p-6">
                  <h3 className="font-bold mb-2 text-lg">DIY Time Saved</h3>
                  <p className="text-gray-400">
                    Building this from scratch: <strong className="text-white">{spec.diyTime}</strong>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    With this DevSpec: minutes
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-brand-gray rounded-xl p-6 sticky top-24 border border-brand-purple/30">
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Package Contents</div>
                <div className="text-2xl font-bold mb-1">{spec.fileCount} files</div>
                <div className="text-sm text-gray-400">
                  Specs + scaffolds + config
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Category</div>
                <div className="font-semibold">{spec.category}</div>
              </div>

              {spec.isPaid && spec.stripePriceId ? (
                <>
                  <div className="mb-6 pb-6 border-b border-brand-darker">
                    <div className="text-3xl font-bold mb-2">${spec.price}</div>
                    <div className="text-sm text-gray-400">
                      One-time purchase • Lifetime access
                    </div>
                  </div>
                  <CheckoutButton
                    priceId={spec.stripePriceId}
                    productName={spec.name}
                  />
                  <div className="mt-4 text-xs text-gray-400 text-center">
                    Secure checkout powered by Stripe
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6 pb-6 border-b border-brand-darker">
                    <div className="text-3xl font-bold mb-2 text-green-500">Free</div>
                    <div className="text-sm text-gray-400">
                      Open source • MIT License
                    </div>
                  </div>
                  <Link
                    href={spec.githubUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors text-center"
                  >
                    View on GitHub
                  </Link>
                  <div className="mt-4 text-xs text-gray-400 text-center">
                    Clone or download • Start building
                  </div>
                </>
              )}

              <div className="mt-6 pt-6 border-t border-brand-darker">
                <div className="text-sm font-semibold mb-3">Instant Delivery</div>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Complete file structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>AI-ready specifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Production patterns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
