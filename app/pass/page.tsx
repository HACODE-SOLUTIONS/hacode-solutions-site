import { generateSEO } from "@/lib/seo";
import PassClient from "@/components/PassClient";

export const metadata = generateSEO({
  title: "DevSpec Pass - Early Bird Access",
  description:
    "Get unlimited access to all premium DevSpecs for 90 days. Early-bird pricing: $197 for the first 25 buyers. Build faster with comprehensive AI-ready specifications for Auth.js, Stripe, and more.",
  path: "/pass",
});

export default function PassPage() {
  const earlyBirdPriceId = process.env.STRIPE_PRICE_ID_DEVSPEC_PASS_EARLYBIRD;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "DevSpec Pass - Early Bird Access",
            description:
              "Unlimited access to all premium DevSpecs for 90 days. Comprehensive AI-ready specifications for building production SaaS applications.",
            brand: {
              "@type": "Brand",
              name: "HACODE SOLUTIONS",
            },
            offers: {
              "@type": "Offer",
              price: "197",
              priceCurrency: "USD",
              availability: "https://schema.org/LimitedAvailability",
              priceValidUntil: "2026-12-31",
            },
          }),
        }}
      />
      <PassClient earlyBirdPriceId={earlyBirdPriceId} />
    </>
  );
}
