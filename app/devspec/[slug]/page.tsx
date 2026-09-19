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
            <div className="mb-6">
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
                <span className="inline-block bg-purple-600/30 border border-purple-500 px-4 py-2 rounded-full text-sm font-semibold ml-2">
                  POPULAR
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{spec.name}</h1>
            <p className="text-xl text-gray-300 mb-8">{spec.longDescription}</p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What's Included</h2>
              <ul className="space-y-3">
                {spec.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {spec.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-brand-gray rounded-lg border border-brand-purple/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-brand-gray rounded-xl p-6">
                <h3 className="font-bold mb-2">Who It's For</h3>
                <p className="text-gray-400">{spec.whoFor}</p>
              </div>
              {spec.diyTime && (
                <div className="bg-brand-gray rounded-xl p-6">
                  <h3 className="font-bold mb-2">DIY Time</h3>
                  <p className="text-gray-400">
                    Building this from scratch: {spec.diyTime}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-brand-gray rounded-xl p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Package Size</div>
                <div className="text-2xl font-bold">{spec.fileCount} files</div>
              </div>

              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Category</div>
                <div className="font-semibold">{spec.category}</div>
              </div>

              {spec.isPaid && spec.stripePriceId ? (
                <>
                  <div className="mb-6">
                    <div className="text-3xl font-bold mb-2">${spec.price}</div>
                    <div className="text-sm text-gray-400">One-time purchase</div>
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
                  <Link
                    href={spec.githubUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors text-center"
                  >
                    Get Free on GitHub
                  </Link>
                  <div className="mt-4 text-xs text-gray-400 text-center">
                    Open source • MIT License
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
