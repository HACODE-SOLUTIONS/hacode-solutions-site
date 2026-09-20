# SaaS Launch Kit - DevSpec Pack

**Complete production SaaS blueprint integrating Auth.js OAuth, Stripe billing, and Next.js App Router.**

## What's Included

This DevSpec pack contains everything you need to wire together a production SaaS application with authentication and payments:

- **DEVSPEC.md** - Complete technical specification with architecture, file structure, API contracts, and integration patterns
- **SKILL.md** - Step-by-step AI agent instructions optimized for Cursor, Claude, Copilot, ChatGPT, and Gemini
- **README.md** - This file: overview, prerequisites, and usage guide

## Prerequisites

Before using this DevSpec pack, clone and understand these free starter packs from HACODE-SOLUTIONS GitHub:

1. **nextjs-app-router-starter** - Next.js 14 App Router foundation
2. **auth-nextauth-oauth** - NextAuth.js (Auth.js) OAuth patterns
3. **stripe-checkout-webhooks** - Stripe Checkout + webhook handling

The SaaS Launch Kit shows you how to **integrate all three** into one cohesive production application.

## What You'll Build

A production-ready SaaS application with:

- **Authentication**: OAuth login with GitHub, Google, or Discord via Auth.js
- **Authorization**: Protected routes, middleware, session management
- **Billing**: Stripe Checkout for subscriptions, one-time payments, and usage-based pricing
- **Webhooks**: Secure Stripe webhook handling for subscription lifecycle events
- **Database**: Prisma schema for users, accounts, sessions, subscriptions, and usage tracking
- **Email**: Transactional emails with Resend or SendGrid
- **User Dashboard**: Account management, billing portal, usage stats
- **Admin Panel**: User management, subscription overview, metrics
- **Deployment**: Production configuration for Vercel, Railway, or Fly.io

## How to Use This Pack

### With AI Coding Agents (Recommended)

This DevSpec is optimized for AI agents. Follow this workflow:

1. **Setup your Next.js project** using the `nextjs-app-router-starter` DevSpec
2. **Add the DEVSPEC.md and SKILL.md files** from this pack to your project root
3. **Open your AI coding assistant** (Cursor, Claude, Copilot, ChatGPT, etc.)
4. **Reference the SKILL.md file** and ask your AI agent to implement each section
5. **The agent will read DEVSPEC.md** for technical details and generate production code
6. **Test each integration** as you build (auth, payments, webhooks)
7. **Deploy** using the deployment guides in DEVSPEC.md

### Manual Implementation

If you prefer to build manually:

1. Read **DEVSPEC.md** for complete architecture and technical specifications
2. Follow the **file structure** and **API contracts** exactly as documented
3. Reference the **integration patterns** for wiring Auth.js ↔ Stripe ↔ Next.js
4. Use the **acceptance tests** to verify each integration point works
5. Deploy following the production checklist

## Stack

This integration uses:

- **Next.js 14** - App Router, Server Components, API Routes
- **Auth.js (NextAuth.js)** - OAuth, sessions, JWT, database sessions
- **Stripe** - Checkout, Customer Portal, webhooks, subscriptions
- **Prisma** - Type-safe database ORM with PostgreSQL
- **TypeScript** - Full type safety across the stack
- **Tailwind CSS** - Utility-first styling
- **Resend** - Transactional email delivery

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  - Login buttons (OAuth)                                     │
│  - Protected routes (middleware)                             │
│  - Checkout buttons (Stripe)                                 │
│  - User dashboard                                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js App Router (App)                   │
│  - pages/                                                    │
│  - app/api/auth/[...nextauth]/route.ts (Auth.js)            │
│  - app/api/checkout/route.ts (Stripe Checkout)              │
│  - app/api/webhook/route.ts (Stripe webhook)                │
│  - middleware.ts (protect routes)                            │
└─────────────────────────────────────────────────────────────┘
                    │                       │
        ┌───────────┘                       └──────────┐
        ▼                                              ▼
┌──────────────────┐                    ┌──────────────────────┐
│     Auth.js      │                    │       Stripe         │
│  - OAuth flow    │                    │  - Checkout          │
│  - Session mgmt  │                    │  - Subscriptions     │
│  - JWT/Database  │                    │  - Webhooks          │
└──────────────────┘                    └──────────────────────┘
        │                                              │
        └───────────┐                       ┌──────────┘
                    ▼                       ▼
           ┌─────────────────────────────────────┐
           │      PostgreSQL (via Prisma)        │
           │  - User                             │
           │  - Account (OAuth providers)        │
           │  - Session                          │
           │  - Subscription                     │
           │  - Usage                            │
           └─────────────────────────────────────┘
```

## Key Integration Points

### 1. Auth.js ↔ Database
- User records created on first OAuth login
- Account records link OAuth providers to users
- Session records track active sessions
- Prisma adapter handles all database operations

### 2. Auth.js ↔ Stripe
- After OAuth login, create Stripe Customer if none exists
- Link Stripe Customer ID to User record
- Use Customer ID for all Stripe operations

### 3. Stripe ↔ Database
- Webhook events update Subscription records
- `checkout.session.completed` creates Subscription
- `customer.subscription.updated` updates status
- `customer.subscription.deleted` marks as canceled
- Usage tracking increments on API calls

### 4. Protected Routes ↔ Subscriptions
- Middleware checks session exists (Auth.js)
- API routes check subscription status (Stripe via Database)
- Block features if subscription inactive

## File Structure

The DEVSPEC.md includes complete file-by-file implementation details. High-level structure:

```
/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── error/page.tsx
│   ├── (protected)/
│   │   ├── dashboard/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── checkout/route.ts
│   │   └── webhook/route.ts
│   └── layout.tsx
├── lib/
│   ├── auth.ts (Auth.js config)
│   ├── stripe.ts (Stripe client)
│   └── prisma.ts (Prisma client)
├── prisma/
│   └── schema.prisma
├── middleware.ts
├── .env.example
└── package.json
```

## Environment Variables

You'll need these environment variables (see DEVSPEC.md for complete setup):

```bash
# Database
DATABASE_URL=postgresql://...

# Auth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...
GOOGLE_ID=...
GOOGLE_SECRET=...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email
RESEND_API_KEY=re_...
```

## Testing the Integration

Follow this sequence to verify the integration works:

1. **OAuth Login** - Test GitHub/Google/Discord login
2. **Database** - Verify User, Account, Session created
3. **Stripe Customer** - Check Customer created in Stripe
4. **Checkout** - Complete test payment
5. **Webhook** - Verify Subscription record created
6. **Protected Route** - Access dashboard with active subscription
7. **Subscription Update** - Test status changes via webhook
8. **Billing Portal** - Test customer portal integration

## Deployment Checklist

Before deploying to production:

- [ ] Use production Stripe keys
- [ ] Configure production OAuth apps (GitHub, Google, Discord)
- [ ] Set up production database (PostgreSQL on Supabase, Railway, or Neon)
- [ ] Add webhook endpoint to Stripe dashboard
- [ ] Verify webhook secret matches production
- [ ] Configure production NEXTAUTH_URL
- [ ] Set strong NEXTAUTH_SECRET (generate with `openssl rand -base64 32`)
- [ ] Test OAuth login in production
- [ ] Test Stripe Checkout in production
- [ ] Verify webhooks fire correctly
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure email service (Resend, SendGrid)

## Support

This is a DevSpec pack — a comprehensive specification and implementation guide. It's not a code repository or boilerplate.

If you need help:
1. **Re-read the DEVSPEC.md** for technical details
2. **Check the SKILL.md** for step-by-step agent prompts
3. **Reference the free starters** for individual component patterns
4. **Ask your AI coding agent** to clarify any section

## License

This DevSpec pack is a commercial product from HACODE SOLUTIONS. Licensed for your use (personal, client work, or commercial products). You may not resell or redistribute this DevSpec itself.

---

**Built by HACODE SOLUTIONS**  
https://hacode.solutions  
DevSpecs for AI coding agents
