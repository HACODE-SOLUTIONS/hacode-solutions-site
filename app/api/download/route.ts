import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { existsSync } from "fs";
import { join } from "path";
import AdmZip from "adm-zip";

export const dynamic = "force-dynamic";

// Map product names to their slug and pack folder
function getProductSlug(productName: string): string | null {
  const normalizedName = productName.toLowerCase();
  
  if (normalizedName.includes("inbox os") || normalizedName.includes("grokbot")) {
    return "inbox-os";
  }
  
  if (normalizedName.includes("saas launch kit")) {
    return "saas-launch-kit";
  }
  
  if (normalizedName.includes("mvp auth") || normalizedName.includes("ship the money path")) {
    return "mvp-auth-stripe-billing";
  }
  
  if (normalizedName.includes("freelancer client onboarding") || normalizedName.includes("first-week client os")) {
    return "freelancer-client-onboarding-kit";
  }
  
  if (normalizedName.includes("sales call") || normalizedName.includes("scope brief")) {
    return "sales-call-scope-brief-kit";
  }
  
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    // Verify the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check payment status
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 403 }
      );
    }

    // Get the product slug from metadata (prefer explicit slug, fallback to name mapping)
    const productSlug = session.metadata?.productSlug;
    const productName = session.metadata?.productName;
    
    let finalSlug: string | null = null;
    
    if (productSlug) {
      // Use explicit slug if provided
      finalSlug = productSlug;
    } else if (productName) {
      // Fallback to name mapping for backward compatibility
      finalSlug = getProductSlug(productName);
    }
    
    if (!finalSlug) {
      return NextResponse.json(
        { error: "This session is not for a downloadable product" },
        { status: 403 }
      );
    }

    // Path to the product pack content
    const packPath = join(process.cwd(), "content", "packs", finalSlug);

    if (!existsSync(packPath)) {
      return NextResponse.json(
        { error: "Product content not found" },
        { status: 500 }
      );
    }

    // Create a zip archive
    const zip = new AdmZip();
    
    // Add all files from the pack directory
    zip.addLocalFolder(packPath);

    // Generate the zip buffer
    const zipBuffer = zip.toBuffer();

    // Return the zip file with product-specific filename
    const filename = `${finalSlug}-devspec.zip`;
    
    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": zipBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Download failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
