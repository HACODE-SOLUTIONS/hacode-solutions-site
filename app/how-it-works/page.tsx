import { generateSEO, generateFAQJsonLd } from "@/lib/seo";

const faqs = [
  {
    question: "What are DevSpecs?",
    answer:
      "DevSpecs are comprehensive specification documents designed for AI coding agents like Cursor, Claude Code, Codex, and Gemini. They contain detailed instructions, code patterns, and best practices that guide AI agents to build production-ready applications quickly and correctly.",
  },
  {
    question: "How do AI coding agents use DevSpecs?",
    answer:
      "AI coding agents read DevSpec documents to understand exactly how to structure code, implement features, and follow best practices. DevSpecs provide context that helps AI agents generate better, more consistent code without requiring extensive prompting.",
  },
  {
    question: "What's the difference between free and premium DevSpecs?",
    answer:
      "Free DevSpecs cover essential patterns and single integrations, perfect for learning and rapid prototyping. Premium DevSpecs are comprehensive production-ready packs that include complete application architectures, multiple integrations, testing setups, and deployment configurations, saving weeks of development time.",
  },
  {
    question: "Can I use DevSpecs with any AI coding tool?",
    answer:
      "Yes! DevSpecs work with any AI coding agent including Cursor, Claude Code, GitHub Copilot, Gemini, and others. They're designed as standard markdown documents that any AI can read and understand.",
  },
  {
    question: "Are the free DevSpecs really free forever?",
    answer:
      "Absolutely. All our free DevSpecs are open source and available on GitHub under the MIT license. You can use them freely in any project, commercial or personal.",
  },
  {
    question: "What do I get with a premium DevSpec?",
    answer:
      "Premium DevSpecs include comprehensive documentation covering complete application architectures, production-ready code patterns, security best practices, testing strategies, deployment guides, and ongoing updates. They're designed to save weeks of development time for complex applications.",
  },
  {
    question: "How do I use a DevSpec with Cursor or Claude Code?",
    answer:
      "Simply add the DevSpec markdown files to your project directory or reference them in your prompts. AI agents will read and understand the specifications, then generate code following those patterns and best practices.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee on all premium DevSpecs. If you're not satisfied for any reason, contact us for a full refund.",
  },
];

export const metadata = generateSEO({
  title: "How DevSpecs Work",
  description:
    "Learn how DevSpec packs help AI coding agents build production-ready applications faster. Comprehensive guides for Cursor, Claude Code, Codex, and Gemini with FAQs and usage instructions.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQJsonLd(faqs)),
        }}
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          How DevSpecs Work
        </h1>
        <p className="text-xl text-gray-400 mb-12 text-center">
          DevSpecs are comprehensive specification documents designed to guide AI
          coding agents in building production-ready applications.
        </p>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">The Problem</h2>
          <p className="text-gray-300 mb-4">
            AI coding agents like Cursor, Claude Code, and Gemini are powerful, but
            they work best with clear context and specifications. Without proper
            guidance, they may generate inconsistent code, miss best practices, or
            require extensive back-and-forth to get things right.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">The Solution</h2>
          <p className="text-gray-300 mb-4">
            DevSpecs provide that missing context. Each pack contains detailed
            specifications, code patterns, architecture decisions, and best
            practices that guide AI agents to generate production-ready code on
            the first try.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">How to Use DevSpecs</h2>
          <div className="space-y-6">
            <div className="bg-brand-gray rounded-xl p-6">
              <div className="text-brand-purple font-bold mb-2">Step 1</div>
              <h3 className="text-xl font-bold mb-2">Choose Your DevSpec</h3>
              <p className="text-gray-400">
                Browse our catalog and select a DevSpec pack that matches your
                project needs. Start with free packs or invest in premium packs
                for comprehensive solutions.
              </p>
            </div>

            <div className="bg-brand-gray rounded-xl p-6">
              <div className="text-brand-purple font-bold mb-2">Step 2</div>
              <h3 className="text-xl font-bold mb-2">Add to Your Project</h3>
              <p className="text-gray-400">
                Clone the repository or download the DevSpec files. Add them to
                your project directory where your AI coding agent can access
                them.
              </p>
            </div>

            <div className="bg-brand-gray rounded-xl p-6">
              <div className="text-brand-purple font-bold mb-2">Step 3</div>
              <h3 className="text-xl font-bold mb-2">Let AI Build</h3>
              <p className="text-gray-400">
                Use your AI coding agent (Cursor, Claude Code, etc.) and
                reference the DevSpec. The AI will follow the specifications to
                generate production-ready code.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-brand-gray rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-brand-purple/20 to-purple-900/20 rounded-2xl p-8 text-center border border-brand-purple/30">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-6">
            Browse our catalog and start building faster with AI coding agents.
          </p>
          <a
            href="/catalog"
            className="inline-block bg-brand-purple hover:bg-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Browse DevSpecs
          </a>
        </section>
      </div>
    </>
  );
}
