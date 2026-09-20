# SKILL: SaaS Launch Kit Implementation Guide

**Step-by-step AI agent instructions for building a production SaaS with Auth.js, Stripe, and Next.js**

This file contains structured prompts you can give to your AI coding assistant (Cursor, Claude, Copilot, ChatGPT, Gemini) to implement the SaaS Launch Kit integration.

---

## Prerequisites

Before starting, make sure you have:
- [ ] Next.js 14 project initialized
- [ ] PostgreSQL database running (local or cloud)
- [ ] Stripe account with test keys
- [ ] OAuth apps created (GitHub and/or Google)
- [ ] Basic understanding of the free starter DevSpecs

---

## Phase 1: Database Setup

### Prompt 1.1: Install Dependencies

```
Install the following packages for a Next.js SaaS application with Auth.js and Stripe:
- next-auth
- @auth/prisma-adapter
- @prisma/client
- prisma (dev dependency)
- stripe
- @stripe/stripe-js

Use npm or the package manager for this project.
```

### Prompt 1.2: Create Prisma Schema

```
Create a Prisma schema at prisma/schema.prisma with:
1. PostgreSQL datasource using DATABASE_URL
2. Auth.js adapter schema (User, Account, Session, VerificationToken)
3. Subscription model with fields: id, userId, stripeSubscriptionId (unique), stripePriceId, stripeCurrentPeriodEnd (DateTime), status (String), createdAt, updatedAt
4. Add stripeCustomerId field to User model (String, optional, unique)
5. Add relation from Subscription to User
```

### Prompt 1.3: Run Migrations

```
Generate Prisma client and run the initial migration:
1. npx prisma generate
2. npx prisma migrate dev --name init

Confirm the database schema is created.
```

---

## Phase 2: Auth.js Configuration

### Prompt 2.1: Create Prisma and Stripe Clients

```
Create lib/prisma.ts with a singleton Prisma client that:
- Uses global scope to prevent multiple instances in development
- Logs queries in development mode

Create lib/stripe.ts with a Stripe client using:
- STRIPE_SECRET_KEY from environment variables
- API version "2023-10-16"
```

### Prompt 2.2: Configure Auth.js

```
Create lib/auth.ts with NextAuth configuration:
1. Use PrismaAdapter with the Prisma client
2. Add GitHub and Google OAuth providers (use GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET from env)
3. Add session callback to include user.id and user.stripeCustomerId in the session object
4. Add createUser event that creates a Stripe Customer when a new user signs up:
   - Create customer with email and name
   - Add userId to customer metadata
   - Update User record with stripeCustomerId
5. Set custom pages: signIn at /login, error at /error
```

### Prompt 2.3: Create Auth API Route

```
Create app/api/auth/[...nextauth]/route.ts that:
- Imports NextAuth from "next-auth"
- Imports authOptions from lib/auth
- Exports GET and POST handlers
```

### Prompt 2.4: Add Middleware for Protected Routes

```
Create middleware.ts that:
- Exports the default middleware from "next-auth/middleware"
- Protects these routes: /dashboard, /settings, /api/protected
- Uses the matcher config pattern
```

---

## Phase 3: Stripe Checkout

### Prompt 3.1: Create Checkout API Route

```
Create app/api/checkout/route.ts that:
1. Gets the current session with getServerSession
2. Returns 401 if no session
3. Accepts priceId from request body
4. Fetches the user's stripeCustomerId from the database
5. Returns 400 if no Stripe customer found
6. Creates a Stripe Checkout Session with:
   - mode: "subscription"
   - customer: user's stripeCustomerId
   - line_items: one item with the priceId
   - success_url: /dashboard?session_id={CHECKOUT_SESSION_ID}
   - cancel_url: /dashboard
   - metadata: userId
7. Returns the session ID as JSON
8. Handles errors and returns safe error messages
```

### Prompt 3.2: Create Checkout Button Component

```
Create components/SubscribeButton.tsx that:
- Takes priceId as a prop
- Uses @stripe/stripe-js to load Stripe
- Calls /api/checkout on click
- Redirects to Stripe Checkout with the session ID
- Shows loading state while creating session
- Handles and displays errors
```

---

## Phase 4: Stripe Webhooks

### Prompt 4.1: Create Webhook Handler

```
Create app/api/webhook/route.ts that:
1. Reads the raw request body as text
2. Gets the stripe-signature header
3. Verifies the webhook signature using stripe.webhooks.constructEvent with STRIPE_WEBHOOK_SECRET
4. Handles these events:
   - checkout.session.completed (subscription mode):
     * Retrieve the full subscription from Stripe
     * Create a Subscription record with userId from metadata, stripeSubscriptionId, stripePriceId, stripeCurrentPeriodEnd, and status
   - customer.subscription.updated:
     * Update the Subscription record with new stripePriceId, stripeCurrentPeriodEnd, and status
   - customer.subscription.deleted:
     * Update the Subscription status to "canceled"
5. Returns { received: true } on success
6. Returns error with status 400 for invalid signatures
7. Returns error with status 500 for processing errors
```

### Prompt 4.2: Test Webhook Locally

```
Explain how to test the webhook locally using Stripe CLI:
1. Install Stripe CLI
2. Login with stripe login
3. Forward webhooks to localhost:3000/api/webhook
4. Copy the webhook secret to .env.local as STRIPE_WEBHOOK_SECRET
5. Complete a test checkout and verify the webhook fires
```

---

## Phase 5: User Dashboard

### Prompt 5.1: Create Dashboard Page

```
Create app/dashboard/page.tsx that:
1. Gets the server session with getServerSession
2. Redirects to /login if no session
3. Queries the database for an active subscription for the user
4. Displays:
   - Welcome message with user name
   - Subscription status (Active or No subscription)
   - If active, shows renewal date (stripeCurrentPeriodEnd)
   - If no subscription, shows a Subscribe button
5. Uses Server Components (async function)
```

### Prompt 5.2: Create Billing Portal Route

```
Create app/api/portal/route.ts that:
1. Gets the current session
2. Returns 401 if no session
3. Fetches the user's stripeCustomerId from database
4. Returns 400 if no Stripe customer
5. Creates a Stripe Billing Portal session with:
   - customer: stripeCustomerId
   - return_url: /dashboard
6. Returns the portal URL as JSON
7. Handles errors safely
```

### Prompt 5.3: Add Manage Subscription Button

```
Update the dashboard to add a "Manage Subscription" button that:
- Calls /api/portal
- Redirects to the returned URL
- Shows loading state
- Only displays if user has an active subscription
```

---

## Phase 6: Login and Protected Routes

### Prompt 6.1: Create Login Page

```
Create app/login/page.tsx that:
- Displays a centered login form
- Shows "Sign in with GitHub" button using signIn("github")
- Shows "Sign in with Google" button using signIn("google")
- Uses next-auth/react for signIn function (mark as "use client")
- Redirects to /dashboard after successful login
- Uses minimalist styling consistent with the site theme
```

### Prompt 6.2: Add Sign Out Button

```
Create components/UserMenu.tsx that:
- Shows the user's name and image from session
- Has a "Sign out" button that calls signOut()
- Uses "use client" directive
- Uses getSession from "next-auth/react"
- Place this in the dashboard layout or header
```

---

## Phase 7: Environment Variables

### Prompt 7.1: Update .env.example

```
Update .env.example to include all required environment variables:
- DATABASE_URL
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- GITHUB_ID and GITHUB_SECRET
- GOOGLE_ID and GOOGLE_SECRET
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- NEXT_PUBLIC_SITE_URL

Add comments explaining how to get each value.
```

---

## Phase 8: Testing

### Prompt 8.1: Test OAuth Flow

```
Test the complete OAuth flow:
1. Start the dev server
2. Navigate to /login
3. Click "Sign in with GitHub"
4. Authorize the app
5. Verify you're redirected to /dashboard
6. Check the database that User, Account, and Session records were created
7. Check Stripe dashboard that a Customer was created
8. Verify the Customer has the userId in metadata
```

### Prompt 8.2: Test Subscription Flow

```
Test the subscription checkout flow:
1. From /dashboard, click "Subscribe"
2. Complete test payment (use Stripe test card 4242 4242 4242 4242)
3. Verify redirect back to /dashboard
4. Check Stripe CLI webhook output for checkout.session.completed
5. Check database that Subscription record was created
6. Verify /dashboard shows "Active" subscription status
```

### Prompt 8.3: Test Billing Portal

```
Test the billing portal:
1. From /dashboard with active subscription, click "Manage Subscription"
2. Verify redirect to Stripe billing portal
3. Test subscription cancellation
4. Verify webhook fires (customer.subscription.deleted)
5. Check database that subscription status updated to "canceled"
6. Verify /dashboard no longer shows active subscription
```

---

## Phase 9: Deployment

### Prompt 9.1: Production Checklist

```
Create a deployment checklist for production:
1. Set up production PostgreSQL database (Supabase, Railway, or Neon)
2. Run prisma migrate deploy in production
3. Create production OAuth apps (GitHub, Google)
4. Use production Stripe keys
5. Add webhook endpoint in Stripe dashboard: https://yourdomain.com/api/webhook
6. Copy production webhook secret to environment variables
7. Generate strong NEXTAUTH_SECRET: openssl rand -base64 32
8. Set production NEXTAUTH_URL and NEXT_PUBLIC_SITE_URL
9. Deploy to Vercel or your platform
10. Test OAuth login in production
11. Test Stripe checkout in production
12. Monitor webhook logs in Stripe dashboard
```

---

## Common Issues and Fixes

### Issue: Stripe Customer not created

**Fix**: Check the Auth.js events.createUser callback. Make sure it's async and awaits both the Stripe API call and the Prisma update.

### Issue: Webhook not firing

**Fix**: 
1. Verify webhook secret matches .env.local
2. Check Stripe CLI is forwarding to correct port
3. Verify route is at /api/webhook exactly
4. Check webhook signature verification

### Issue: Session not persisting

**Fix**:
1. Check DATABASE_URL is correct
2. Run prisma migrate dev
3. Verify Session records are being created in database
4. Check NEXTAUTH_SECRET is set

### Issue: Subscription status not updating

**Fix**:
1. Check webhook handler for customer.subscription.updated
2. Verify Subscription.stripeSubscriptionId matches Stripe
3. Check webhook is receiving events (Stripe dashboard logs)

---

## Next Steps

After completing the base integration:

1. **Add email notifications** using Resend or SendGrid
2. **Implement usage tracking** for metered billing
3. **Build admin dashboard** for user management
4. **Add multiple subscription tiers** with feature gates
5. **Implement one-time purchases** alongside subscriptions
6. **Add customer support** with Intercom or Zendesk

---

## Reference

- Auth.js docs: https://authjs.dev
- Stripe docs: https://stripe.com/docs
- Prisma docs: https://www.prisma.io/docs
- Next.js docs: https://nextjs.org/docs

---

**Built by HACODE SOLUTIONS**  
https://hacode.solutions  
DevSpecs for AI coding agents
