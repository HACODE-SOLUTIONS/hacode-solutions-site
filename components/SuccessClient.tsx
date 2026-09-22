"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FadeIn } from "@/components/Reveal";

// Helper to get filename from product name
function getDownloadFilename(productName: string): string {
  const normalizedName = productName.toLowerCase();
  
  if (normalizedName.includes("saas launch kit")) {
    return "saas-launch-kit-devspec.zip";
  }
  
  if (normalizedName.includes("mvp auth") || normalizedName.includes("ship the money path")) {
    return "mvp-auth-stripe-billing-devspec.zip";
  }
  
  // Fallback: create slug from product name
  const slug = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug}-devspec.zip`;
}

export default function SuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [productName, setProductName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [priceId, setPriceId] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      verifySession();
    }
  }, [sessionId]);

  async function verifySession() {
    if (!sessionId) return;

    setVerifying(true);
    try {
      const response = await fetch(`/api/verify-session?session_id=${sessionId}`);
      const data = await response.json();

      if (response.ok && data.valid) {
        setVerified(true);
        setProductName(data.productName);
        
        const purchaseKey = `ga4_purchase_${sessionId}`;
        const alreadyTracked = sessionStorage.getItem(purchaseKey);
        
        if (!alreadyTracked && typeof window.gtag === "function") {
          const value = data.amountTotal ? data.amountTotal / 100 : 0;
          const currency = (data.currency || "usd").toUpperCase();
          
          window.gtag("event", "purchase", {
            transaction_id: sessionId,
            value: value,
            currency: currency,
            items: [
              {
                item_name: data.productName,
                price: value,
                quantity: 1,
              },
            ],
          });
          
          sessionStorage.setItem(purchaseKey, "true");
        }
      } else {
        setError(data.error || "Unable to verify your purchase");
      }
    } catch (err) {
      setError("Failed to verify your purchase");
    } finally {
      setVerifying(false);
    }
  }

  async function handleDownload() {
    if (!sessionId) return;

    setDownloading(true);
    try {
      const response = await fetch(`/api/download?session_id=${sessionId}`);

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Download failed");
        return;
      }

      // Create a blob from the response and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = getDownloadFilename(productName || "devspec");
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <FadeIn>
        <div className="max-w-2xl w-full bg-brand-gray rounded border border-brand-border p-12 text-center">
          {verifying ? (
            <>
              <div className="w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h1 className="text-2xl font-medium mb-2">Verifying your purchase...</h1>
              <p className="text-gray-500 text-sm">Please wait</p>
            </>
          ) : error ? (
            <>
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-medium mb-2">Unable to verify purchase</h1>
              <p className="text-gray-500 text-sm mb-8">{error}</p>
              <Link
                href="/catalog"
                className="inline-block bg-white text-black hover:bg-gray-200 px-6 py-3 rounded text-sm font-medium transition-colors"
              >
                Back to Catalog
              </Link>
            </>
          ) : verified && productName ? (
            <>
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-medium mb-2">Payment Successful!</h1>
              <p className="text-gray-400 mb-2">Thank you for your purchase</p>
              <p className="text-sm text-gray-600 mb-8">{productName}</p>

              <div className="bg-brand-black rounded border border-brand-border p-6 mb-8">
                <h2 className="text-lg font-medium mb-3">Download Your DevSpec Pack</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Your purchase includes DEVSPEC.md, SKILL.md, and README with
                  complete integration instructions for Auth.js + Stripe + Next.js
                  App Router.
                </p>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="bg-white text-black hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-500 px-8 py-3 rounded text-sm font-medium transition-colors w-full sm:w-auto"
                >
                  {downloading ? "Downloading..." : "Download Pack (ZIP)"}
                </button>
              </div>

              <div className="space-y-4 text-left">
                <div className="bg-brand-black rounded border border-brand-border p-4">
                  <h3 className="font-medium text-sm mb-2">What's Next?</h3>
                  <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
                    <li>Download and extract the ZIP file</li>
                    <li>Read the README.md for an overview</li>
                    <li>Open SKILL.md in your AI coding assistant</li>
                    <li>Follow the step-by-step prompts to build your SaaS</li>
                  </ol>
                </div>

                <div className="bg-brand-black rounded border border-brand-border p-4">
                  <h3 className="font-medium text-sm mb-2">Need Help?</h3>
                  <p className="text-xs text-gray-500 mb-3">
                    The pack includes comprehensive documentation. Reference
                    DEVSPEC.md for technical details and use SKILL.md with your AI
                    agent.
                  </p>
                  <Link
                    href="/how-it-works"
                    className="text-xs text-brand-purple hover:text-purple-400 transition-colors"
                  >
                    How to use DevSpecs →
                  </Link>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-brand-border">
                <Link
                  href="/catalog"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  ← Back to Catalog
                </Link>
              </div>
            </>
          ) : sessionId ? (
            <>
              <h1 className="text-2xl font-medium mb-2">Payment Received</h1>
              <p className="text-gray-500 text-sm mb-8">
                Your payment was successful! If you purchased a downloadable product,
                it will appear here shortly.
              </p>
              <Link
                href="/catalog"
                className="inline-block bg-white text-black hover:bg-gray-200 px-6 py-3 rounded text-sm font-medium transition-colors"
              >
                Back to Catalog
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-medium mb-2">Purchase Complete</h1>
              <p className="text-gray-500 text-sm mb-8">
                Thank you for your purchase! Check your email for confirmation.
              </p>
              <Link
                href="/catalog"
                className="inline-block bg-white text-black hover:bg-gray-200 px-6 py-3 rounded text-sm font-medium transition-colors"
              >
                Back to Catalog
              </Link>
            </>
          )}
        </div>
      </FadeIn>
    </div>
  );
}
