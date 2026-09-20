# SKILL — MVP Auth + Stripe Billing DevSpec Pack

**Skill name:** `mvp-auth-stripe-billing`  
**For:** Claude Code, Cursor Agent, and similar coding agents  
**Pack root:** this folder (markdown + skill only)  
**Buyer delivery:** https://hacode.solutions  

---

## When to use

Use this skill when the user wants to:

- Ship **Auth.js (NextAuth v5) + Stripe Checkout (subscription) + entitlements** in one path.
- Compose free HACODE modules (starter → auth → stripe) without inventing webhook/entitlement glue.
- Gate routes by **paid entitlement**, not merely by being signed in.

Do **not** use this skill for multi-tenant SaaS boilers, compliance audits, Notion templates, or prompting without implementing against `DEVSPEC.md`.

---

## Preconditions

1. Read `DEVSPEC.md`, `MODULE-MAP.md`, `ENTITLEMENTS.md`, `ENV-EXAMPLE.md`.
2. Confirm stack: App Router + Auth.js v5 JWT + Stripe Checkout + webhooks + Prisma.
3. Work in the **buyer’s app repo**, not by scaffolding a full Next.js app inside this pack folder.
4. Prefer free module patterns:
   - https://github.com/HACODE-SOLUTIONS/nextjs-app-router-starter
   - https://github.com/HACODE-SOLUTIONS/auth-nextauth-oauth
   - https://github.com/HACODE-SOLUTIONS/stripe-checkout-webhooks

---

## Workflow

1. **Orient** — Quote non-goals; refuse multi-tenant scope creep.
2. **Scaffold** — Starter + Prisma (SQLite local / Postgres prod).
3. **Auth** — JWT sessions, OAuth, `user.id` on session, middleware auth gate.
4. **Stripe** — Checkout subscription + signed webhook + `StripeEvent` idempotency.
5. **Entitlements** — Event → `pro` access per `ENTITLEMENTS.md`; `requireEntitlement`.
6. **Verify** — `SMOKE-TEST.md` + `WEBHOOK-IDEMPOTENCY-CHECKLIST.md`.
7. **Stall rule** — After two failed fixes on the same blocker, stop and produce `HANDOFF-HUMAN-DEV.md` notes for the human.

---

## Copy-paste prompts

### Bootstrap
```
You are implementing the MVP Auth + Stripe Billing path. Read DEVSPEC.md, MODULE-MAP.md, ENTITLEMENTS.md, and ENV-EXAMPLE.md from this pack. Follow the ordered sequence starter → auth → stripe → entitlements. Do not build multi-tenant features. Do not grant access from success_url alone.
```

### Auth phase
```
Add Auth.js v5 with JWT sessions and GitHub OAuth. Expose session.user.id. Protect /dashboard with middleware for authentication only. Match patterns from the HACODE auth-nextauth-oauth free pack.
```

### Stripe phase
```
Implement POST /api/checkout (subscription mode, STRIPE_PRICE_ID, metadata.userId) and POST /api/webhooks/stripe (raw body, signature verification, StripeEvent idempotency). Handle checkout.session.completed, customer.subscription.*, invoice.paid, invoice.payment_failed.
```

### Entitlements phase
```
Add Entitlement key "pro" per ENTITLEMENTS.md. Upsert from webhook handlers. Gate /dashboard/pro and GET /api/me/access with requireEntitlement. Auth middleware must not be the only paid check.
```

### QA phase
```
Execute SMOKE-TEST.md in Stripe test mode with Stripe CLI forwarding. Fix failures without disabling signature checks or idempotency. Report a short pass/fail list.
```

---

## Example input → output

**Input:** “Add Stripe to my Next app so users can pay.”  
**Bad agent behavior:** Client-only Stripe.js charge; unlock page on `?success=1`; no webhook.  
**Good agent behavior:** Auth first if missing; Checkout Session with `userId`; webhook verify + entitlement; smoke test.

**Input:** “Make /dashboard paid.”  
**Good behavior:** Split `/dashboard` (signed-in) vs `/dashboard/pro` (entitled); pricing CTA → checkout.

---

## Failure modes + tips

| Failure | Tip |
|---------|-----|
| Webhook `400` locally | Use CLI `whsec_` in `.env.local`; restart dev server after env change |
| Paid after redirect but webhook pending | Pending UI + poll `/api/me/access`; do not write entitlement in success page from query params |
| `userId` missing on event | Ensure Checkout metadata; backfill via Customer mapping |
| Agent rewrites working auth | Point at MODULE-MAP; forbid drive-by refactors |
| JWT still shows paid after cancel | Gate on DB entitlement, not a stale JWT claim |
| Scope explosion | Re-read non-goals; cut seats/teams/usage |

---

## Definition of done (agent)

Smoke path green; checklist items in `DEVSPEC.md` §11 checked; no secrets committed; hand off deploy notes from `DEVSPEC.md` §12.
