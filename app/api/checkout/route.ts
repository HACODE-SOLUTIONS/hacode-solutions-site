import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getDevSpecBySlug } from "@/data/devspecs";

export async function POST(request: NextRequest) {
  try {
    const { priceId, productName, productSlug } = await request.json();

    // Validate required environment variables
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe configuration missing. Please contact support." },
        { status: 500 }
      );
    }

    // Validate required request parameters
    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // Verify the product exists and is not sunset
    if (productSlug) {
      const product = getDevSpecBySlug(productSlug);
      if (!product || product.sunset) {
        return NextResponse.json(
          { error: "This product is no longer available for purchase." },
          { status: 410 }
        );
      }
    }

    // Initialize Stripe with validated key
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Fallback base URL for success/cancel redirects
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://hacode-solutions-site.vercel.app";

    // Build cancel_url: return to product page if slug provided, otherwise catalog
    let cancelUrl = `${baseUrl}/catalog`;
    if (productSlug) {
      cancelUrl = `${baseUrl}/devspec/${productSlug}`;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: {
        productName,
        productSlug: productSlug || "",
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    // Return safe error message (no secrets)
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create checkout session";
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
