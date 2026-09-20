import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  path = "",
  ogImage = "/og-default.png",
  noIndex = false,
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hacode.solutions";
  const url = `${siteUrl}${path}`;

  return {
    title: `${title} | HACODE SOLUTIONS`,
    description,
    applicationName: "HACODE SOLUTIONS",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | HACODE SOLUTIONS`,
      description,
      url,
      siteName: "HACODE SOLUTIONS",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | HACODE SOLUTIONS`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function generateProductJsonLd(product: {
  name: string;
  description: string;
  price?: number;
  url: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hacode.solutions";
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: `${siteUrl}${product.url}`,
    brand: {
      "@type": "Organization",
      name: "HACODE SOLUTIONS",
    },
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };
}

export function generateOrganizationJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hacode.solutions";
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HACODE SOLUTIONS",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Premium DevSpec packs for AI coding agents. Build production-ready applications faster with comprehensive specification documents.",
    sameAs: ["https://github.com/HACODE-SOLUTIONS"],
  };
}

export function generateFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
