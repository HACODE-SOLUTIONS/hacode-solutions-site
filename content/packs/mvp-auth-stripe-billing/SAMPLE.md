# SAMPLE — 10-minute redacted walkthrough (listing proof)

**Product:** MVP Auth + Stripe Billing DevSpec Pack  
**Buy / deliver from:** https://hacode.solutions (Stripe Checkout + instant download)  
**What this sample shows:** a stranger can follow the pack’s money path with **test keys only**, no production secrets, and see Auth → Checkout → Webhook → Gated route.

This is a **redacted mini walkthrough**, not a full SaaS codebase. Replace bracketed values with your own test credentials. Never paste live `sk_live_` / `whsec_` into tickets or commits.

---

## What you need open

1. This pack folder (after purchase from https://hacode.solutions).
2. A Next.js App Router app (clone https://github.com/HACODE-SOLUTIONS/nextjs-app-router-starter or use your own).
3. Stripe account in **test mode** + Stripe CLI.
4. One OAuth app (GitHub is enough) pointed at `http://localhost:3000/api/auth/callback/github`.
5. Cursor or Claude Code with this pack’s `DEVSPEC.md` + `.cursorrules` / `SKILL.md`.

---

## Minute 0–2 — Point the agent

Paste:

```text
Read DEVSPEC.md, MODULE-MAP.md, ENTITLEMENTS.md, and ENV-EXAMPLE.md.
Implement starter → auth → stripe → entitlements for a single "pro" subscription.
Do not grant access from success_url. Use Auth.js v5 JWT + Prisma + Stripe Checkout subscription.
```

Fill `.env.local` using patterns from `ENV-EXAMPLE.md`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
AUTH_SECRET=[openssl-rand-base64-32]
AUTH_GITHUB_ID=[github-oauth-client-id]
AUTH_GITHUB_SECRET=[github-oauth-client-secret]
STRIPE_SECRET_KEY=sk_test_[redacted]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_[redacted]
STRIPE_WEBHOOK_SECRET=whsec_[from-stripe-listen]
STRIPE_PRICE_ID=price_[your-recurring-test-price]
```

---

## Minute 2–5 — Auth + Checkout surfaces

You (or the agent) should produce at least:

- Sign-in working; `/dashboard` requires session.
- `POST /api/checkout` returns a Stripe-hosted URL when signed in.
- `POST /api/webhooks/stripe` verifies signatures and upserts entitlement `pro`.

Start app + CLI:

```bash
npm run dev
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Minute 5–8 — Run the happy path

1. Sign in with GitHub (test account).
2. Open `/dashboard/pro` → expect **blocked** (redirect or 403).
3. Click **Upgrade**; pay with `4242 4242 4242 4242`.
4. Watch CLI for `checkout.session.completed` / `customer.subscription.updated`.
5. Open `/dashboard/pro` again → expect **unlocked**.
6. Hit `GET /api/me/access` → expect `pro` active.

**Redacted example response:**

```json
{
  "authenticated": true,
  "entitlements": [{ "key": "pro", "status": "active", "validUntil": null }]
}
```

---

## Minute 8–10 — Prove you did not cheat

1. Resend the same Stripe event → still one entitlement; page still works.
2. Cancel the test subscription in Stripe Dashboard → `/dashboard/pro` locks again.
3. Confirm you never set entitlement in the success page from `?checkout=success` alone.

If all three hold, the pack did its job: **composed money path**, not a prompt dump.

---

## What “good” looks like vs vague prompting

| Vague prompt only | With this pack |
|-------------------|----------------|
| Agent unlocks a page on redirect | Webhook + `Entitlement` row |
| No idea which free repo to start from | `MODULE-MAP.md` order |
| Double webhook creates duplicate “pro” | `StripeEvent` idempotency |
| Signed-in users see paid UI free | Separate auth gate vs entitlement gate |

---

## Listing bullets (Growth / page copy seeds)

- Hand Cursor or Claude a production Auth + Stripe Billing DevSpec — ship paid signup in one focused day.
- Composes free HACODE starter, Auth.js, and Stripe modules; adds entitlements glue.
- Includes webhook idempotency checklist, smoke test, env patterns, and human handoff one-pager.
- Stack: Next.js App Router, Auth.js v5, Stripe Checkout subscriptions, Prisma.
- Delivered as markdown + skill files via https://hacode.solutions — not a hosted multi-tenant boilerplate.

---

## Limits (honest)

- Sample does not include a downloadable running SaaS.
- Legal/tax/PCI advisory is out of scope.
- One subscription Price ID is the v1 path; teams/seats are not.

---

## Next after this sample

New buyers: start at `START-HERE.md` (promise, tools, explicit 10-minute path).  
Then follow `SMOKE-TEST.md` for the full checkbox run, tick `CHECKLIST.md`, and deploy with `DEVSPEC.md` ops notes (Postgres, Dashboard webhook, live keys only when ready).  
License, updates, and footguns: `FAQ.md`. Exact zip list: `CONTENTS.md`.  
Annotated vague-vs-DevSpec runs live in `SAMPLES/`.
