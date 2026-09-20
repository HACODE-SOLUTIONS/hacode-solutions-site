# MODULE-MAP — Composing free HACODE packs into the money path

**This pack’s unique value:** entitlements glue (free → paid matrix, webhook → access gate, gated routes).  
Free modules give you starter, auth, and Stripe patterns. This pack tells you the **ordered sequence** and what to add between them.

---

## Free modules (cite these)

| Order | Module | URL | What you take from it |
|------:|--------|-----|------------------------|
| 1 | Next.js App Router Starter | https://github.com/HACODE-SOLUTIONS/nextjs-app-router-starter | App Router + TypeScript + Tailwind scaffold, DevSpec/SKILL habits, baseline scripts |
| 2 | Auth.js OAuth + sessions | https://github.com/HACODE-SOLUTIONS/auth-nextauth-oauth | Auth.js v5, JWT sessions, OAuth providers, middleware auth gate, `/api/auth/[...nextauth]` |
| 3 | Stripe Checkout + webhooks | https://github.com/HACODE-SOLUTIONS/stripe-checkout-webhooks | Checkout Session creation, signed webhooks, idempotency patterns, Stripe CLI local forward |

**Paid composed pack (this):** MVP Auth + Stripe Billing DevSpec Pack — https://hacode.solutions (delivery host; Link owns the product page).

---

## Ordered sequence

```
starter → auth → stripe → entitlements glue (THIS PACK)
```

### Phase A — Starter
1. Clone or recreate from `nextjs-app-router-starter`.
2. Confirm `npm install`, `npm run dev`, `npm run build`.
3. Add Prisma + DB URL (SQLite for local smoke, Postgres for deploy).

**Stop when:** empty App Router app builds and Prisma migrates.

### Phase B — Auth
1. Apply `auth-nextauth-oauth` patterns (or merge its `auth.ts` / `auth.config.ts` / middleware / login UI).
2. Use **JWT session strategy** (pack default; matches free auth pack edge middleware).
3. Ensure `session.user.id` is available in server code (JWT callbacks).
4. Middleware: require sign-in for `/dashboard` (auth only — not paid yet).

**Stop when:** OAuth sign-in works locally; protected page redirects anonymous users.

### Phase C — Stripe
1. Apply `stripe-checkout-webhooks` patterns for `POST /api/checkout` and `POST /api/webhooks/stripe`.
2. Force **subscription mode** + single `STRIPE_PRICE_ID` for v1 (core path).
3. Attach `metadata.userId` / `client_reference_id` on every Checkout Session.
4. Verify signatures; store Stripe Event ids for idempotency.

**Stop when:** test Checkout completes and webhook handler accepts CLI-forwarded events (even if entitlement write is still stubbed).

### Phase D — Entitlements glue (this pack)
1. Implement models + matrix from `ENTITLEMENTS.md`.
2. Map Stripe events → Subscription upsert → Entitlement active/inactive.
3. Replace “signed-in = paid” mistakes: gated routes call `requireEntitlement`.
4. Add `GET /api/me/access` for UI + smoke.
5. Run `SMOKE-TEST.md` and `WEBHOOK-IDEMPOTENCY-CHECKLIST.md`.

**Stop when:** signup → checkout → webhook → gated route passes in test mode.

---

## What each free pack does *not* give you

| Gap | Why it matters | Where this pack fills it |
|-----|----------------|---------------------------|
| Composed build order | Agents implement Stripe before auth or grant on success URL | This MODULE-MAP + DEVSPEC build sequence |
| Entitlement model | Checkout success ≠ app access | `ENTITLEMENTS.md` |
| User ↔ Customer ↔ Subscription linkage | Orphan payments | Data model in `DEVSPEC.md` |
| Access gate separate from auth middleware | Paying customers vs lurkers | Gated route contracts |
| Production webhook checklist | Double-processing, test/live mix | `WEBHOOK-IDEMPOTENCY-CHECKLIST.md` |
| Human handoff when AI loops | Weekend lost | `HANDOFF-HUMAN-DEV.md` |

---

## Suggested repo layout after composition

```
your-app/
├── auth.ts
├── auth.config.ts
├── middleware.ts                 # auth gate only
├── prisma/schema.prisma          # User, Account, Stripe*, Entitlement, StripeEvent
├── app/
│   ├── api/auth/[...nextauth]/
│   ├── api/checkout/route.ts
│   ├── api/webhooks/stripe/route.ts
│   ├── api/me/access/route.ts
│   ├── pricing/page.tsx
│   ├── dashboard/page.tsx        # signed-in
│   └── dashboard/pro/page.tsx    # entitlement-gated
└── lib/
    ├── stripe.ts
    ├── entitlements.ts
    └── prisma.ts
```

Keep this pack’s markdown **outside** the app (or in `/docs/pack/`) — do not paste secrets into the pack files.

---

## Dependency rules (do not violate)

1. No Checkout without a stable `userId`.
2. No entitlement grant without a verified webhook (or a documented admin repair tool).
3. No paid UI that only checks `session` without entitlement.
4. No skipping idempotency because “test mode only fires once.”
5. One subscription Price ID in v1; add products later behind a new migration + matrix row.
