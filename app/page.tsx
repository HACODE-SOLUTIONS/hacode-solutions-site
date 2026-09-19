import Link from "next/link";
import DevSpecCard from "@/components/DevSpecCard";
import { devSpecs } from "@/data/devspecs";
import { generateSEO, generateOrganizationJsonLd } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Home",
  description:
    "Premium DevSpec packs for AI coding agents. Build production-ready applications faster with comprehensive specification documents for Cursor, Claude Code, Codex, and Gemini.",
  path: "/",
});

export default function HomePage() {
  const freeSpecs = devSpecs.filter((s) => !s.isPaid);
  const paidSpecs = devSpecs.filter((s) => s.isPaid);
  const featuredSpecs = devSpecs.filter((s) => s.popular).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationJsonLd()),
        }}
      />

      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Premium DevSpec Packs for
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-purple-400">
            AI Coding Agents
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto text-balance">
          Build production-ready applications faster with comprehensive
          specification documents designed for AI coding tools like Cursor,
          Claude Code, Codex, and Gemini.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <div className="px-4 py-2 bg-brand-gray rounded-lg text-sm border border-brand-gray">
            🔨 Cursor
          </div>
          <div className="px-4 py-2 bg-brand-gray rounded-lg text-sm border border-brand-gray">
            🤖 Claude Code
          </div>
          <div className="px-4 py-2 bg-brand-gray rounded-lg text-sm border border-brand-gray">
            ⚡ GitHub Copilot
          </div>
          <div className="px-4 py-2 bg-brand-gray rounded-lg text-sm border border-brand-gray">
            💎 Gemini
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/catalog"
            className="bg-brand-purple hover:bg-purple-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Browse All DevSpecs
          </Link>
          <Link
            href="/how-it-works"
            className="bg-brand-gray hover:bg-brand-gray/80 px-8 py-3 rounded-lg font-semibold text-lg transition-colors border border-brand-gray"
          >
            How It Works
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-brand-gray rounded-xl p-8 border border-green-500/30">
            <div className="text-green-500 text-4xl mb-4">🆓</div>
            <h2 className="text-2xl font-bold mb-3">Free DevSpecs</h2>
            <p className="text-gray-400 mb-4">
              Essential specification packs to get started with common patterns
              and integrations. Perfect for learning and rapid prototyping.
            </p>
            <Link
              href="/catalog?filter=free"
              className="text-green-500 hover:text-green-400 font-semibold inline-flex items-center gap-2"
            >
              Explore Free Packs →
            </Link>
          </div>

          <div className="bg-brand-gray rounded-xl p-8 border border-brand-purple/30">
            <div className="text-brand-purple text-4xl mb-4">💼</div>
            <h2 className="text-2xl font-bold mb-3">Premium DevSpecs</h2>
            <p className="text-gray-400 mb-4">
              Comprehensive production-ready packs that save weeks of
              development. Battle-tested patterns for enterprise applications.
            </p>
            <Link
              href="/catalog?filter=paid"
              className="text-brand-purple hover:text-purple-400 font-semibold inline-flex items-center gap-2"
            >
              View Premium Packs →
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured DevSpecs</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredSpecs.map((spec) => (
            <DevSpecCard key={spec.id} spec={spec} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-brand-purple/20 to-purple-900/20 rounded-2xl p-12 text-center border border-brand-purple/30">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Faster?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Browse our complete catalog of DevSpec packs and start building
            production-ready applications with AI coding agents today.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-brand-purple hover:bg-purple-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            View All DevSpecs
          </Link>
        </div>
      </section>
    </>
  );
}
