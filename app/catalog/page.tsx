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
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-medium mb-4">
        DevSpecs Catalog
      </h1>
      <p className="text-gray-500 mb-16 max-w-2xl text-sm leading-relaxed">
        Structured specs and starter scaffolds for AI coding agents. Pick a pack,
        open with your AI tool, ship production code.
      </p>

      <CatalogClient />
    </div>
  );
}
