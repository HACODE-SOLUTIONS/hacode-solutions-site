import CatalogClient from "@/components/CatalogClient";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "DevSpecs Catalog",
  description:
    "Browse DevSpec packs for AI coding agents. Free starters for Next.js, Stripe, and Auth. Premium production-ready SaaS kits. Works with Cursor, Claude, Copilot, ChatGPT, Gemini.",
  path: "/catalog",
});

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        DevSpecs Catalog
      </h1>
      <p className="text-xl text-gray-400 mb-12 text-center max-w-3xl mx-auto">
        Structured specs and starter scaffolds for AI coding agents. Pick a pack,
        open with your AI tool, ship production code.
      </p>

      <CatalogClient />
    </div>
  );
}
