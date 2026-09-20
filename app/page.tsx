import HomeClient from "@/components/HomeClient";
import { generateSEO, generateOrganizationJsonLd } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Home",
  description:
    "DevSpecs for AI coding agents. Structured markdown specifications and starter scaffolds that guide Cursor, Claude, Copilot, ChatGPT, and Gemini to build real products.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationJsonLd()),
        }}
      />
      <HomeClient />
    </>
  );
}
