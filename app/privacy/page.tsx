import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Privacy Policy",
  description:
    "HACODE SOLUTIONS Privacy Policy. Learn how we collect, use, and protect your personal information when you use our DevSpec catalog and services.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-400 mb-12">Last updated: September 19, 2026</p>

      <div className="prose prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-gray-300 mb-4">
            HACODE SOLUTIONS ("we," "our," or "us") respects your privacy and is
            committed to protecting your personal data. This privacy policy
            explains how we collect, use, and safeguard your information when you
            visit our website and use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3">Information You Provide</h3>
          <p className="text-gray-300 mb-4">
            When you purchase DevSpecs or contact us, we collect:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>Email address</li>
            <li>Payment information (processed securely by Stripe)</li>
            <li>Name and any information you provide in communications</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
          <p className="text-gray-300 mb-4">
            We collect standard web analytics data including:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>IP address and browser information</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
          <p className="text-gray-300 mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>Process payments and deliver purchased DevSpecs</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send important updates about your purchases</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Data Sharing</h2>
          <p className="text-gray-300 mb-4">
            We do not sell your personal information. We share data only with:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Payment processors:</strong> Stripe processes all payments
              securely
            </li>
            <li>
              <strong>Analytics providers:</strong> For understanding website
              usage
            </li>
            <li>
              <strong>Legal requirements:</strong> When required by law
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Data Security</h2>
          <p className="text-gray-300 mb-4">
            We implement appropriate security measures to protect your personal
            information. Payment data is handled entirely by Stripe and never
            stored on our servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
          <p className="text-gray-300 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction of your data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>
          <p className="text-gray-300 mb-4">
            To exercise these rights, contact us at privacy@hacode.solutions
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cookies</h2>
          <p className="text-gray-300 mb-4">
            We use essential cookies for site functionality and analytics cookies
            to understand how visitors use our site. You can control cookies
            through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
          <p className="text-gray-300 mb-4">
            We may update this privacy policy from time to time. We will notify
            you of significant changes by posting the new policy on this page with
            an updated date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-300">
            If you have questions about this privacy policy, contact us at{" "}
            <a
              href="mailto:privacy@hacode.solutions"
              className="text-brand-purple hover:text-purple-400"
            >
              privacy@hacode.solutions
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
