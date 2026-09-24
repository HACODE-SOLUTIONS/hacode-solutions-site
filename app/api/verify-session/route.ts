import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

// Check if a product is downloadable
function isDownloadableProduct(productName: string): boolean {
  const normalizedName = productName.toLowerCase();
  
  // List of downloadable products
  return (
    normalizedName.includes("saas launch kit") ||
    normalizedName.includes("mvp auth") ||
    normalizedName.includes("ship the money path")
  );
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { valid: false, error: "Session ID required" },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if payment was successful
    if (session.payment_status !== "paid") {
      return NextResponse.json({
        valid: false,
        error: "Payment not completed",
      });
    }

    // Check if this is for a downloadable product
    const productName = session.metadata?.productName || "";
    const isDownloadable = isDownloadableProduct(productName);

    return NextResponse.json({
      valid: true,
      productName: productName,
      isDownloadable: isDownloadable,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Verification failed";
    return NextResponse.json(
      { valid: false, error: errorMessage },
      { status: 500 }
    );
  }
}
