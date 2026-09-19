import { generateSEO } from "@/lib/seo";
import Link from "next/link";

export const metadata = generateSEO({
  title: "Success",
  description: "Thank you for your purchase. Your DevSpec is ready to download.",
  path: "/success",
  noIndex: true,
});

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
      <div className="bg-green-600/20 border-2 border-green-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">✓</span>
      </div>

      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl text-gray-400 mb-8">
        Thank you for your purchase. Your DevSpec pack is ready.
      </p>

      <div className="bg-brand-gray rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
        <ol className="text-left space-y-4 text-gray-300">
          <li className="flex gap-3">
            <span className="text-brand-purple font-bold">1.</span>
            <span>Check your email for the download link and instructions</span>
          </li>
          <li className="flex gap-3">
            <span className="text-brand-purple font-bold">2.</span>
            <span>Add the DevSpec files to your project directory</span>
          </li>
          <li className="flex gap-3">
            <span className="text-brand-purple font-bold">3.</span>
            <span>Use your AI coding agent to build with the specifications</span>
          </li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/catalog"
          className="bg-brand-purple hover:bg-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Browse More DevSpecs
        </Link>
        <Link
          href="/"
          className="bg-brand-gray hover:bg-brand-gray/80 px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Back to Home
        </Link>
      </div>

      <div className="mt-12 text-sm text-gray-400">
        <p>
          Need help?{" "}
          <Link href="/contact" className="text-brand-purple hover:text-purple-400">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
