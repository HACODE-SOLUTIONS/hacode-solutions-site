import CatalogClient from "@/components/CatalogClient";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "DevSpecs Catalog",
  description:
    "Browse our complete catalog of DevSpec packs for AI coding agents. Choose from free starter packs or premium production-ready specifications for Next.js, Stripe, authentication, and more.",
  path: "/catalog",
});

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        DevSpecs Catalog
      </h1>
      <p className="text-xl text-gray-400 mb-12 text-center max-w-3xl mx-auto">
        Comprehensive specification packs designed for AI coding agents to build
        production-ready applications faster.
      </p>

      <CatalogClient />
    </div>
  );
}
