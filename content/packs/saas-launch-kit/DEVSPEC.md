# DEVSPEC: SaaS Launch Kit

**Production SaaS Integration: Auth.js OAuth + Stripe Billing + Next.js App Router**

---

## Overview

This DevSpec provides a complete blueprint for integrating authentication, payments, and user management in a production SaaS application. It wires together Auth.js (NextAuth.js) for OAuth authentication, Stripe for billing, and Next.js App Router for the application framework.

### Goal

Build a production-ready SaaS application where:
- Users log in via OAuth (GitHub, Google, Discord)
- Users can purchase subscriptions via Stripe Checkout
- Subscription status controls access to features
- Webhooks keep database in sync with Stripe
- Users can manage billing via Stripe Customer Portal

### Prerequisites

You should have completed or understand:
1. `nextjs-app-router-starter` - Next.js 14 App Router basics
2. `auth-nextauth-oauth` - Auth.js OAuth setup
3. `stripe-checkout-webhooks` - Stripe Checkout + webhook handling

This DevSpec shows you how to **integrate all three**.

---

## Architecture

### Tech Stack

- **Next.js 14** - App Router, Server Components, API Routes
- **Auth.js v5** (NextAuth.js) - OAuth authentication, session management
- **Stripe** - Checkout, Subscriptions, Customer Portal, webhooks
- **Prisma** - ORM for PostgreSQL
- **TypeScript** - Full type safety
- **Tailwind CSS** - Styling
- **Resend** - Transactional emails

### Data Flow

```
User → OAuth Login → Auth.js → Database (User + Account + Session)
                    ↓
               Stripe Customer created
                    ↓
User → Checkout → Stripe Checkout → Payment
                    ↓
            Webhook → Database (Subscription)
                    ↓
User → Dashboard → Check Subscription → Access Features
```

---

## Database Schema (Prisma)

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Auth.js schema
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  stripeCustomerId String? @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  subscriptions Subscription[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// Stripe subscription schema
model Subscription {
  id                 String   @id @default(cuid())
  userId             String
  stripeSubscriptionId String @unique
  stripePriceId      String
  stripeCurrentPeriodEnd DateTime
  status             String   // active, canceled, incomplete, incomplete_expired, past_due, trialing, unpaid
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Run Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## Auth.js Configuration

### `lib/auth.ts`

```typescript
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.stripeCustomerId = user.stripeCustomerId;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Create Stripe customer when user signs up
      if (user.email) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name || undefined,
          metadata: {
            userId: user.id,
          },
        });

        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id },
        });
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
};
```

### `lib/prisma.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

### `lib/stripe.ts`

```typescript
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});
```

### `app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

---

## Protected Routes (Middleware)

### `middleware.ts`

```typescript
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/api/protected/:path*"],
};
```

---

## Stripe Checkout

### `app/api/checkout/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: "Price ID is required" }, { status: 400 });
    }

    // Get user's Stripe customer ID
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { error: "Stripe customer not found" },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/dashboard`,
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
```

---

## Stripe Webhook Handler

### `app/api/webhook/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Webhook error";
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === "subscription" && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          await prisma.subscription.create({
            data: {
              userId: session.metadata?.userId!,
              stripeSubscriptionId: subscription.id,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
              status: subscription.status,
            },
          });
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            status: subscription.status,
          },
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: "canceled",
          },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Webhook handler failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
```

---

## User Dashboard

### `app/dashboard/page.tsx`

```typescript
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
      status: "active",
    },
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
        {subscription ? (
          <div>
            <p className="text-green-600 font-medium">Active</p>
            <p className="text-sm text-gray-600 mt-2">
              Renews on{" "}
              {new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600">No active subscription</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Subscribe Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Billing Portal

### `app/api/portal/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { error: "Stripe customer not found" },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${baseUrl}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Portal creation failed";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
```

---

## Environment Variables

### `.env.example`

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/saas"

# Next.js
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Auth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OAuth Providers
GITHUB_ID="your-github-oauth-app-id"
GITHUB_SECRET="your-github-oauth-app-secret"
GOOGLE_ID="your-google-oauth-client-id"
GOOGLE_SECRET="your-google-oauth-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (optional)
RESEND_API_KEY="re_..."
```

---

## Testing Checklist

- [ ] OAuth login with GitHub works
- [ ] OAuth login with Google works
- [ ] User record created in database
- [ ] Stripe Customer created automatically
- [ ] Checkout Session creation works
- [ ] Subscription created after payment
- [ ] Webhook receives checkout.session.completed
- [ ] Subscription record created in database
- [ ] Dashboard shows active subscription
- [ ] Billing Portal redirects correctly
- [ ] Subscription cancellation via portal works
- [ ] Webhook updates subscription status

---

## Production Deployment

### Pre-deployment

1. Set up production PostgreSQL database
2. Configure production OAuth apps (GitHub, Google)
3. Use production Stripe keys
4. Add webhook endpoint in Stripe dashboard
5. Generate strong NEXTAUTH_SECRET
6. Set production NEXTAUTH_URL and NEXT_PUBLIC_SITE_URL

### Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel:
```bash
vercel --prod
```

### Post-deployment

1. Test OAuth login in production
2. Complete test payment in production
3. Verify webhook fires correctly
4. Monitor Stripe webhook logs
5. Set up error tracking (Sentry)

---

## Additional Features (Optional)

### Usage Tracking

Add a `Usage` model to track API calls or feature usage:

```prisma
model Usage {
  id        String   @id @default(cuid())
  userId    String
  feature   String
  count     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, feature])
}
```

### Email Notifications

Send transactional emails with Resend:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "noreply@yourdomain.com",
  to: user.email,
  subject: "Subscription Activated",
  html: "<p>Your subscription is now active!</p>",
});
```

### Admin Panel

Build an admin dashboard to:
- View all users
- Monitor subscriptions
- Track MRR (Monthly Recurring Revenue)
- Manage refunds

---

## Support

This DevSpec is a complete technical specification. Reference it while building, and use your AI coding assistant to implement each section.

For questions about specific integrations:
- **Auth.js docs**: https://authjs.dev
- **Stripe docs**: https://stripe.com/docs
- **Prisma docs**: https://www.prisma.io/docs

---

**Built by HACODE SOLUTIONS**  
https://hacode.solutions
