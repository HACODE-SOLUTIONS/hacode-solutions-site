import { generateSEO } from "@/lib/seo";
import { Suspense } from "react";
import SuccessClient from "@/components/SuccessClient";

export const metadata = generateSEO({
  title: "Success",
  description: "Thank you for your purchase. Your DevSpec is ready to download.",
  path: "/success",
  noIndex: true,
});

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
