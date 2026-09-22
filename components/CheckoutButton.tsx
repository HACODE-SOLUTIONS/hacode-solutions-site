"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface CheckoutButtonProps {
  priceId: string;
  productName: string;
  productSlug?: string;
}

export default function CheckoutButton({
  priceId,
  productName,
  productSlug,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          productName,
          productSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || "Failed to create checkout session. Please try again.";
        alert(errorMessage);
        setLoading(false);
        return;
      }

      const { sessionId, url } = data;

      // Prefer direct URL redirect (most reliable across all browsers/webviews)
      if (url) {
        window.location.assign(url);
        return;
      }

      // Fallback to Stripe.js redirectToCheckout if URL not available
      if (!sessionId) {
        alert("Checkout session ID missing. Please contact support.");
        setLoading(false);
        return;
      }

      const stripe = await stripePromise;
      if (!stripe) {
        alert("Stripe configuration error. Please contact support.");
        setLoading(false);
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        alert(error.message || "Failed to redirect to checkout. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-white text-black hover:bg-gray-200 px-6 py-3 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Loading..." : "Purchase DevSpec"}
    </button>
  );
}
