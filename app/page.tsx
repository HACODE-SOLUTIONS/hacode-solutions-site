import Link from "next/link";
import DevSpecCard from "@/components/DevSpecCard";
import { devSpecs } from "@/data/devspecs";
import { generateSEO, generateOrganizationJsonLd } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Home",
  description:
    "DevSpecs for AI coding agents. Structured markdown specifications and starter scaffolds that guide Cursor, Claude, Copilot, ChatGPT, and Gemini to build real products.",
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

      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              DevSpecs for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-purple-400">
                AI Coding Agents
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              HACODE SOLUTIONS provides <strong>DevSpec files</strong> — structured
              markdown specifications and starter scaffolds that guide AI coding
              agents to build real products.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Get empty project structures + comprehensive specs. Your AI agent
              reads the docs, follows the patterns, and ships production code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/catalog"
                className="bg-brand-purple hover:bg-purple-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors text-center"
              >
                Browse DevSpecs
              </Link>
              <Link
                href="/catalog?filter=free"
                className="bg-brand-gray hover:bg-brand-gray/80 px-8 py-3 rounded-lg font-semibold text-lg transition-colors border border-brand-gray text-center"
              >
                Start Free
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-gray-400">
              <span>Works with:</span>
              <span className="text-white">Cursor</span>
              <span>•</span>
              <span className="text-white">Claude</span>
              <span>•</span>
              <span className="text-white">Copilot</span>
              <span>•</span>
              <span className="text-white">ChatGPT</span>
              <span>•</span>
              <span className="text-white">Gemini</span>
            </div>
          </div>

          <div className="bg-brand-gray rounded-xl p-6 border border-brand-purple/30 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brand-darker">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-gray-400 text-sm ml-2">
                ~/devspecs/nextjs-starter/
              </span>
            </div>
            
            <div className="space-y-2 mb-4 font-mono text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-brand-purple">📁</span>
                <span>src/</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 pl-4">
                <span className="text-blue-400">📄</span>
                <span>app/</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 pl-4">
                <span className="text-blue-400">📄</span>
                <span>components/</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 pl-4">
                <span className="text-blue-400">📄</span>
                <span>lib/</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">📄</span>
                <span>README.md</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">📄</span>
                <span>DEVSPEC.md</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-yellow-400">📄</span>
                <span>package.json</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-blue-400">📄</span>
                <span>tsconfig.json</span>
              </div>
            </div>

            <div className="bg-brand-darker rounded-lg p-4 border border-brand-gray">
              <div className="text-xs text-gray-500 mb-2">DEVSPEC.md</div>
              <div className="text-sm text-gray-300 space-y-1 font-mono">
                <div># Next.js Starter DevSpec</div>
                <div className="text-gray-500">## Architecture</div>
                <div className="text-gray-400">- App Router patterns</div>
                <div className="text-gray-400">- Server Components</div>
                <div className="text-gray-400">- TypeScript strict mode</div>
                <div className="text-gray-500 mt-2">## Implementation...</div>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              Preview: What you get on GitHub
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Browse by Category
        </h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Link
            href="/catalog?filter=free"
            className="bg-brand-gray hover:bg-brand-gray/80 rounded-xl p-6 border border-green-500/30 hover:border-green-500 transition-all group"
          >
            <div className="text-green-500 text-3xl mb-3">🎁</div>
            <h3 className="font-bold mb-2 group-hover:text-green-400 transition-colors">
              Free Starters
            </h3>
            <p className="text-sm text-gray-400">
              Essential patterns and integrations
            </p>
          </Link>

          <Link
            href="/catalog"
            className="bg-brand-gray hover:bg-brand-gray/80 rounded-xl p-6 border border-blue-500/30 hover:border-blue-500 transition-all group"
          >
            <div className="text-blue-400 text-3xl mb-3">💳</div>
            <h3 className="font-bold mb-2 group-hover:text-blue-400 transition-colors">
              Payments
            </h3>
            <p className="text-sm text-gray-400">
              Stripe, checkout, webhooks
            </p>
          </Link>

          <Link
            href="/catalog"
            className="bg-brand-gray hover:bg-brand-gray/80 rounded-xl p-6 border border-purple-500/30 hover:border-purple-500 transition-all group"
          >
            <div className="text-purple-400 text-3xl mb-3">🔐</div>
            <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors">
              Authentication
            </h3>
            <p className="text-sm text-gray-400">
              NextAuth, OAuth, sessions
            </p>
          </Link>

          <Link
            href="/catalog?filter=paid"
            className="bg-brand-gray hover:bg-brand-gray/80 rounded-xl p-6 border border-brand-purple/50 hover:border-brand-purple transition-all group"
          >
            <div className="text-brand-purple text-3xl mb-3">🚀</div>
            <h3 className="font-bold mb-2 group-hover:text-brand-purple transition-colors">
              Full Products
            </h3>
            <p className="text-sm text-gray-400">
              Complete SaaS starters
            </p>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Use DevSpecs</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-brand-purple/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-purple">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="font-bold mb-2">Pick a DevSpec</h3>
              <p className="text-sm text-gray-400">
                Browse free or premium packs. Free specs are on GitHub, premium ones deliver instant download.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-purple/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-purple">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="font-bold mb-2">Open with Your AI Tool</h3>
              <p className="text-sm text-gray-400">
                Clone the repo or add files to your project. Works with any AI coding tool or LLM.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-purple/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-purple">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="font-bold mb-2">Ship Production Code</h3>
              <p className="text-sm text-gray-400">
                Your AI agent reads the specs and scaffolds, follows the patterns, generates working code.
              </p>
            </div>
          </div>

          <div className="bg-brand-gray rounded-xl p-8 border border-brand-purple/30">
            <h3 className="font-bold mb-4 text-lg">Works With Any AI Coding Tool</h3>
            <p className="text-gray-400 mb-6">
              DevSpecs are model-agnostic. Use them with <strong className="text-white">Cursor</strong>, <strong className="text-white">Claude Code</strong>, <strong className="text-white">GitHub Copilot</strong>, <strong className="text-white">ChatGPT</strong>, <strong className="text-white">Gemini Code Assist</strong>, or any other LLM-powered coding assistant. The specs work everywhere.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-brand-darker rounded-lg text-sm border border-brand-gray">
                🔨 Cursor
              </div>
              <div className="px-4 py-2 bg-brand-darker rounded-lg text-sm border border-brand-gray">
                🤖 Claude Code
              </div>
              <div className="px-4 py-2 bg-brand-darker rounded-lg text-sm border border-brand-gray">
                ⚡ GitHub Copilot
              </div>
              <div className="px-4 py-2 bg-brand-darker rounded-lg text-sm border border-brand-gray">
                💎 Gemini Code Assist
              </div>
              <div className="px-4 py-2 bg-brand-darker rounded-lg text-sm border border-brand-gray">
                💬 ChatGPT
              </div>
              <div className="px-4 py-2 bg-brand-darker rounded-lg text-sm border border-brand-gray">
                🦾 Any LLM
              </div>
            </div>
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
