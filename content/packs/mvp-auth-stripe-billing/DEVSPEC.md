# DEVSPEC — MVP Auth + Stripe Billing

**Pack:** MVP Auth + Stripe Billing DevSpec Pack  
**Promise:** Hand Cursor or Claude Code this brief and ship a working Auth → Checkout → Entitlement path in one focused day.  
**Stack (locked):** Next.js App Router · Auth.js (NextAuth v5) · Stripe Checkout · signed webhooks · Prisma  
**Billing v1:** One recurring Stripe Price ID (subscription-primary). One-time payments are an extension, not the core path.  
**DB:** Postgres in production · SQLite allowed for local 10-minute smoke.  
**Pack type:** Markdown + skill files only — do not scaffold a full Next.js app inside this pack folder.

---

## 1. Problem

Solo founders and small agencies using AI coding tools lose 8–20 hours wiring Auth.js, Stripe Checkout, webhook verification, and a paid entitlement gate. Free single-module DevSpecs exist; the thrash is composing them into one money path without inventing idempotency or access rules.

## 2. Goal

Deliver a production-shaped **signed-in user → Stripe Checkout (subscription) → webhook → entitlement → gated route** path that:

1. Authenticates with Auth.js v5 (JWT sessions, OAuth and/or credentials as configured).
2. Creates a Stripe Checkout Session for one subscription Price ID, with `client_reference_id` or metadata linking to the app user.
3. Verifies Stripe webhook signatures, processes events idempotently, and upserts subscription + entitlement state.
4. Gates paid routes/API by entitlement (not by “session exists”).
5. Passes the smoke path in `SMOKE-TEST.md`.

## 3. Non-goals (Not for)

- Full multi-tenant SaaS boilerplate (orgs, seats, RBAC trees, white-label).
- Custom agency implementation or paid build-out.
- Legal/compliance audit of payment flows (PCI scope, tax, SCA legalese).
- Notion templates or standalone prompt dumps without a system brief.
- Building a complete Next.js app **inside this pack zip** (buyer scaffolds from free modules + this glue).
- Multiple products, coupons, trials-as-core, usage metering, or marketplace payouts (extensions only).

## 4. Stack constraints

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js App Router (14+/15) | TypeScript |
| Auth | Auth.js / NextAuth v5 | **JWT session strategy** (edge-compatible middleware) |
| Payments | Stripe Checkout | Hosted Checkout; no raw card forms in v1 |
| Events | Stripe webhooks | Signature verify with `STRIPE_WEBHOOK_SECRET` |
| ORM / DB | Prisma | Postgres prod; SQLite ok for local smoke |
| Entitlements | App DB row(s) | Driven by webhook events; never trust client alone |

Align with free HACODE modules (see `MODULE-MAP.md`):

- https://github.com/HACODE-SOLUTIONS/nextjs-app-router-starter
- https://github.com/HACODE-SOLUTIONS/auth-nextauth-oauth
- https://github.com/HACODE-SOLUTIONS/stripe-checkout-webhooks

This pack’s unique value is **entitlements glue**: free → paid matrix, event → access gate, idempotent webhook → DB, gated routes.

## 5. Architecture (in words)

1. **Browser** hits a public marketing or pricing page. User signs in via Auth.js (`/api/auth/*`). Session is a JWT cookie; middleware can read it on the edge.
2. **Authenticated user** calls `POST /api/checkout` (or similar). Server loads `session.user.id`, creates a Stripe Checkout Session in `subscription` mode with `line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }]`, sets `success_url` / `cancel_url`, and attaches `metadata.userId` (and optionally `client_reference_id`).
3. **Stripe Checkout** collects payment. On success, Stripe emits webhooks (notably `checkout.session.completed`, then `customer.subscription.*` / `invoice.paid` as applicable).
4. **`POST /api/webhooks/stripe`** reads the raw body, verifies `stripe-signature`, loads or creates a `StripeEvent` row by `event.id` for idempotency, then maps the event to subscription + entitlement upserts. Never grant access from the success URL alone.
5. **Gated routes** (`/app`, `/dashboard/pro`, `GET /api/me/access`) call `auth()`, then check entitlement status for that user (e.g. `active` / `trialing`). Missing or inactive entitlement → redirect to pricing or `402`/`403`.
6. **Customer Portal** (optional v1.1): `POST /api/billing/portal` creates a Stripe Billing Portal session for the linked `stripeCustomerId`.

Data flow is unidirectional for money: **Stripe is source of truth for payment state; your DB is source of truth for app access**, synced via verified webhooks.

## 6. Data model

Prisma-shaped entities (names may match Auth.js adapter conventions where used). JWT sessions do **not** require a Session table at runtime, but Account/User tables remain useful for OAuth linking and billing foreign keys.

### User
- `id` (cuid/uuid), `email` (unique), `emailVerified`, `name`, `image`, `createdAt`, `updatedAt`
- Relation: optional `stripeCustomer`, `subscriptions`, `entitlements`

### Account (OAuth)
- Auth.js Account fields: `userId`, `provider`, `providerAccountId`, tokens as needed
- Required if using OAuth providers from the free auth pack

### Session
- Optional when using JWT strategy. Prefer JWT for this pack’s default so middleware stays edge-simple.
- If database sessions are chosen later, keep Auth.js Session model; do not mix strategies casually.

### StripeCustomer
- `id`, `userId` (unique), `stripeCustomerId` (unique), `email`, `createdAt`, `updatedAt`
- Created on first checkout or on `checkout.session.completed` if missing

### Subscription (or Payment — subscription-primary)
- `id`, `userId`, `stripeSubscriptionId` (unique, nullable until created), `stripePriceId`, `status` (`incomplete` | `trialing` | `active` | `past_due` | `canceled` | `unpaid` | …)
- `currentPeriodEnd`, `cancelAtPeriodEnd`, `raw` JSON optional for debugging
- One-time Payment extension: separate `Payment` with `stripePaymentIntentId` / `checkoutSessionId` — not required for v1 core path

### Entitlement
- `id`, `userId`, `key` (e.g. `pro`), `status` (`active` | `inactive` | `grace`), `source` (`stripe_subscription`), `validUntil` (nullable), `updatedAt`
- Unique on `(userId, key)`
- Access checks read Entitlement, not raw Stripe API on every request

### StripeEvent (idempotency)
- `id` = Stripe `event.id` (primary key), `type`, `processedAt`, `payload` optional
- Insert-before-process or unique-constraint-on-conflict = already processed → return `200` without re-applying side effects

## 7. API contracts

### `POST /api/checkout`
**Auth:** Required (session).  
**Body (optional):** `{ "priceId"?: string }` — default to `process.env.STRIPE_PRICE_ID`.  
**Behavior:**
1. Reject if no session → `401`.
2. Resolve or create Stripe Customer for user; store `StripeCustomer`.
3. `stripe.checkout.sessions.create({ mode: "subscription", customer, line_items, success_url, cancel_url, metadata: { userId }, client_reference_id: userId, allow_promotion_codes optional })`.
4. Return `{ url: session.url }` → client redirects.

**Errors:** `400` missing price; `401` unauthenticated; `502` Stripe API failure (log request id, do not leak secrets).

### `POST /api/webhooks/stripe`
**Auth:** Stripe signature only (no session).  
**Requirements:**
- Use raw body (disable body parser / use `request.text()`).
- `stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET)`.
- Idempotent on `event.id`.
- Handle at minimum: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`.
- Always return `2xx` after durable record of receipt when signature is valid; return `400` on bad signature.

**Side effects:** Upsert StripeCustomer, Subscription, Entitlement per `ENTITLEMENTS.md`.

### Gated routes
- **Page:** `auth()` then `getEntitlement(userId, "pro")`; if not active → `redirect("/pricing")`.
- **API:** same check → `401` if no session, `403` if no entitlement.
- Middleware may enforce “must be signed in”; entitlement checks stay in server components / route handlers (JWT should not embed paid status as sole source of truth unless refreshed carefully — prefer DB entitlement read).

### `GET /api/me/access` (recommended)
Returns `{ authenticated, entitlements: [{ key, status, validUntil }] }` for the current user. Useful for UI and smoke tests.

## 8. Edge cases + error states

| Case | Expected behavior |
|------|-------------------|
| Success URL hit before webhook | Show “confirming payment…”; poll `/api/me/access` or wait; **do not** grant from query params alone |
| Duplicate webhook delivery | Idempotent: second delivery no-ops; `200` |
| `checkout.session.completed` without `userId` metadata | Log + alert; do not invent user; optional email match fallback only if explicitly documented |
| Subscription `past_due` | Per matrix: usually keep access in short grace or revoke — pick one in `ENTITLEMENTS.md` and stick to it (default: grace until `deleted` / period end per your rule) |
| `customer.subscription.deleted` | Set subscription canceled; entitlement `inactive` |
| User already entitled starts Checkout again | Allow Customer Portal or block duplicate active sub; prefer Portal for manage |
| Webhook secret wrong / test vs live mix | Signature fails → `400`; fix env; never process unsigned |
| User signs out mid-Checkout | Session completed still ties via metadata `userId`; entitlement lands on that user |
| Stripe Customer exists, User deleted | Soft-delete users or block delete while active sub; document |
| Clock skew / replay | Signature timestamp tolerance (Stripe default); idempotency table covers replays |
| Local smoke without public URL | Stripe CLI `listen --forward-to` |

## 9. Ordered build sequence (AI coder)

1. **Scaffold** — Start from nextjs-app-router-starter (or equivalent App Router + TS + Tailwind). Confirm `npm run dev` and `npm run build`.
2. **Env** — Copy patterns from `ENV-EXAMPLE.md`. Generate `AUTH_SECRET`. Add Stripe test keys + Price ID. Do not commit secrets.
3. **Prisma** — Add schema for User/Account/(Session)/StripeCustomer/Subscription/Entitlement/StripeEvent. Migrate (SQLite local or Postgres).
4. **Auth** — Apply auth-nextauth-oauth patterns: Auth.js v5, JWT, at least one OAuth provider, middleware for `/dashboard` signed-in gate, `/api/auth/[...nextauth]`.
5. **Stripe client** — Server-only Stripe SDK with `STRIPE_SECRET_KEY`.
6. **Checkout route** — Implement `POST /api/checkout` with metadata `userId`.
7. **Webhook route** — Raw body + signature + idempotency + handlers per entitlements matrix.
8. **Entitlement helpers** — `getEntitlement`, `requireEntitlement` used by pages/API.
9. **Gated UI** — Pricing CTA → checkout; success page; paid page behind entitlement.
10. **Smoke** — Run `SMOKE-TEST.md` with Stripe test mode + CLI.
11. **Deploy** — Vercel (or similar): set env, Postgres, Stripe webhook endpoint to production URL, switch to live keys only when ready.

## 10. Prompt library (by phase)

### Scaffold
```
Read DEVSPEC.md and MODULE-MAP.md in this pack. Scaffold a Next.js App Router TypeScript app (or extend an existing starter) with Prisma. Do not invent multi-tenant features. Confirm build passes.
```

### Auth
```
Implement Auth.js (NextAuth v5) with JWT sessions per DEVSPEC.md. Add GitHub and/or Google OAuth. Protect /dashboard with middleware for authentication only (not entitlements yet). Extend session with user.id.
```

### Stripe
```
Add Stripe Checkout in subscription mode for STRIPE_PRICE_ID. POST /api/checkout requires auth, sets metadata.userId, returns session.url. Add POST /api/webhooks/stripe with raw body signature verification and StripeEvent idempotency. Do not grant access on success_url alone.
```

### Entitlements
```
Implement Entitlement model and helpers per ENTITLEMENTS.md. On relevant Stripe events, upsert Subscription and set entitlement key "pro" active/inactive. Gate /dashboard/pro and GET /api/me/access by entitlement status.
```

### QA
```
Run through SMOKE-TEST.md and WEBHOOK-IDEMPOTENCY-CHECKLIST.md. Fix any failures. Do not weaken signature verification or idempotency to make tests pass.
```

## 11. Acceptance tests (definition of done)

- [ ] Unauthenticated user cannot open paid route or successfully call checkout.
- [ ] Authenticated user receives a Checkout URL; test card completes in Stripe test mode.
- [ ] Webhook with invalid signature returns `400` and does not mutate DB.
- [ ] Valid `checkout.session.completed` (and/or subscription events) results in `Entitlement` active for that user.
- [ ] Replaying the same `event.id` does not duplicate entitlements or error fatally.
- [ ] `customer.subscription.deleted` (or equivalent cancel path) removes paid access per matrix.
- [ ] Paid page loads for entitled user; redirects or 403 for signed-in but non-entitled user.
- [ ] No secrets in git; `.env.example` / `ENV-EXAMPLE.md` documents every required key.
- [ ] `SMOKE-TEST.md` path completed once in test mode.

## 12. Ops notes

### Deploy
- Host app on Vercel (typical) with Postgres (Neon/Supabase/Vercel Postgres).
- Set all env vars from `ENV-EXAMPLE.md`.
- Stripe Dashboard → Webhooks → endpoint `https://<prod>/api/webhooks/stripe` → select events listed above → copy signing secret to `STRIPE_WEBHOOK_SECRET`.
- Update OAuth callback URLs to production origin.
- Keep test and live Stripe keys in separate environments.

### Costs (order of magnitude)
- This pack: one-time purchase via https://hacode.solutions (Link owns listing).
- Stripe: standard processing fees; no platform fee from this pack.
- Auth.js: free (self-hosted).
- Postgres: free tiers exist for MVP; expect low single-digit $/mo when you leave free tier.
- Vercel: hobby/pro per your plan.

### Failure modes
- **Webhook not configured in prod** → users pay, no access. Monitor Stripe webhook delivery + app logs; add admin “resync” later if needed.
- **Test webhook secret on live** → all events `400`.
- **Granting on success URL** → fraud/open redirect risk and race bugs.
- **Embedding `active` only in JWT without refresh** → stale access after cancel. Prefer DB entitlement reads for gates.
- **Missing idempotency** → double emails, corrupted counters, duplicate rows.
- **Logging raw webhook bodies with PII to public logs** → privacy incident; redact.

### Support boundary
If the AI agent stalls after two failed fix attempts on the same blocker, use `HANDOFF-HUMAN-DEV.md`.

---

## Deliverables list (this pack)

Core (Days 1–2): `DEVSPEC.md`, `MODULE-MAP.md`, `ENTITLEMENTS.md`, `WEBHOOK-IDEMPOTENCY-CHECKLIST.md`, `ENV-EXAMPLE.md`, `SKILL.md`, `.cursorrules`, `SMOKE-TEST.md`, `HANDOFF-HUMAN-DEV.md`, plus listing-proof `SAMPLE.md`.  
Later days: `START-HERE.md`, `CHECKLIST.md`, `FAQ.md`, `CONTENTS.md`, `PACK_READY.md`, `SAMPLES/*`.
