import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Contact Us",
  description:
    "Get in touch with HACODE SOLUTIONS. Questions about DevSpecs, custom specifications, or partnerships? We're here to help.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
      <p className="text-xl text-gray-400 mb-12">
        Have questions about DevSpecs? Need custom specifications? Let's talk.
      </p>

      <div className="bg-brand-gray rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2">Email</h3>
            <a
              href="mailto:contact@hacode.solutions"
              className="text-brand-purple hover:text-purple-400"
            >
              contact@hacode.solutions
            </a>
          </div>

          <div>
            <h3 className="font-bold mb-2">GitHub</h3>
            <a
              href="https://github.com/HACODE-SOLUTIONS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-purple hover:text-purple-400"
            >
              github.com/HACODE-SOLUTIONS
            </a>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-brand-gray rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Sales Inquiries</h3>
          <p className="text-gray-400 mb-4">
            Interested in custom DevSpecs or enterprise solutions?
          </p>
          <a
            href="mailto:sales@hacode.solutions"
            className="text-brand-purple hover:text-purple-400 font-semibold"
          >
            sales@hacode.solutions
          </a>
        </div>

        <div className="bg-brand-gray rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3">Support</h3>
          <p className="text-gray-400 mb-4">
            Need help with a DevSpec you purchased?
          </p>
          <a
            href="mailto:support@hacode.solutions"
            className="text-brand-purple hover:text-purple-400 font-semibold"
          >
            support@hacode.solutions
          </a>
        </div>
      </div>

      <div className="mt-12 bg-brand-dark rounded-xl p-8 border border-brand-gray">
        <h2 className="text-2xl font-bold mb-4">Before You Contact Us</h2>
        <p className="text-gray-300 mb-4">
          Many common questions are answered in our{" "}
          <a href="/how-it-works" className="text-brand-purple hover:text-purple-400">
            How It Works
          </a>{" "}
          page. For technical questions about using DevSpecs with AI coding
          agents, check out our documentation on GitHub.
        </p>
        <p className="text-gray-300">
          We typically respond to all inquiries within 24-48 hours during
          business days.
        </p>
      </div>
    </div>
  );
}
