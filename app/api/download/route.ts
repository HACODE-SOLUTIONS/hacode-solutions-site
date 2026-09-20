import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { existsSync } from "fs";
import { join } from "path";
import AdmZip from "adm-zip";

export const dynamic = "force-dynamic";

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

    // Check which product was purchased from metadata
    const productSlug = session.metadata?.productName;
    
    if (!productSlug || !productSlug.toLowerCase().includes("saas launch kit")) {
      return NextResponse.json(
        { error: "This session is not for a downloadable product" },
        { status: 403 }
      );
    }

    // Path to the SaaS Launch Kit content
    const packPath = join(process.cwd(), "content", "packs", "saas-launch-kit");

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

    // Return the zip file
    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="saas-launch-kit-devspec.zip"',
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
