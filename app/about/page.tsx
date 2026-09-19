import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "About Us",
  description:
    "HACODE SOLUTIONS creates premium DevSpec packs for AI coding agents. We help developers build production-ready applications faster by providing comprehensive specification documents.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">About HACODE SOLUTIONS</h1>
      <p className="text-xl text-gray-400 mb-12">
        We create premium DevSpec packs that empower AI coding agents to build
        production-ready applications.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-300 mb-4">
          At HACODE SOLUTIONS, we believe that AI coding agents represent the
          future of software development. However, these tools work best with
          clear specifications and best practices. Our mission is to bridge that
          gap by creating comprehensive DevSpec packs that guide AI agents to
          generate production-ready code.
        </p>
        <p className="text-gray-300">
          We've built our DevSpecs from real-world experience developing SaaS
          applications, e-commerce platforms, and enterprise software. Every
          specification is battle-tested and reflects current best practices.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">What We Do</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-brand-gray rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">Free DevSpecs</h3>
            <p className="text-gray-400">
              We maintain open-source DevSpec packs on GitHub covering essential
              patterns like Next.js setup, Stripe integration, and authentication
              flows.
            </p>
          </div>
          <div className="bg-brand-gray rounded-xl p-6">
            <h3 className="text-xl font-bold mb-3">Premium DevSpecs</h3>
            <p className="text-gray-400">
              Our premium packs provide comprehensive production-ready
              specifications for complex applications, saving weeks of development
              time.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Why DevSpecs?</h2>
        <p className="text-gray-300 mb-4">
          The rise of AI coding agents like Cursor, Claude Code, GitHub Copilot,
          and Gemini has transformed how we build software. But these tools need
          proper context to excel. DevSpecs provide that context in a structured,
          comprehensive format that AI agents can understand and apply.
        </p>
        <p className="text-gray-300">
          Instead of spending hours prompting and iterating with AI agents, our
          DevSpecs let you point to a specification and get production-ready code
          on the first try.
        </p>
      </section>

      <section className="bg-gradient-to-br from-brand-purple/20 to-purple-900/20 rounded-2xl p-8 border border-brand-purple/30">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-gray-300 mb-6">
          Have questions or suggestions? We'd love to hear from you.
        </p>
        <a
          href="/contact"
          className="inline-block bg-brand-purple hover:bg-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
