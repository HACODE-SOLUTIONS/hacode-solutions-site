# CHECKLIST — Done means X

Use this as the ship gate for the money path and as the buyer’s “I’m done” criteria. Check boxes only when verified in Stripe **test mode** (or live after a deliberate cutover).

---

## A. Pack install (buyer environment)

- [ ] Pack unzipped; `START-HERE.md` read once.
- [ ] App repo is separate from the pack folder (no Next.js app inside the zip).
- [ ] Agent can see `DEVSPEC.md`, `MODULE-MAP.md`, `ENTITLEMENTS.md`, `ENV-EXAMPLE.md`, `.cursorrules` / `SKILL.md`.
- [ ] `.env.local` filled from `ENV-EXAMPLE.md` with **test** Stripe keys only.
- [ ] `AUTH_SECRET` generated; OAuth callback matches `NEXT_PUBLIC_APP_URL`.
- [ ] `STRIPE_PRICE_ID` is a **recurring** test Price.
- [ ] Stripe CLI `listen` forwards to `/api/webhooks/stripe`; `whsec_…` matches env.

---

## B. Auth (signed-in ≠ paid)

- [ ] Unauthenticated visit to `/dashboard` (or equivalent) redirects to sign-in.
- [ ] OAuth (or configured credentials) creates/links a `User` with stable `id`.
- [ ] Session strategy is **JWT**; session exposes `user.id` to server code.
- [ ] Middleware enforces **authentication only** on protected prefixes — not entitlement.
- [ ] Signed-in free user can open `/dashboard` and see an Upgrade CTA.

---

## C. Checkout (subscription)

- [ ] `POST /api/checkout` returns `401` when signed out.
- [ ] Signed-in call returns `{ url }` for Stripe-hosted Checkout (`mode: subscription`).
- [ ] Session includes `metadata.userId` (and preferably `client_reference_id`).
- [ ] Test card `4242 4242 4242 4242` completes Checkout.
- [ ] Success URL does **not** write an `Entitlement` row by itself.

---

## D. Webhook + idempotency

- [ ] Invalid `stripe-signature` → `400`; DB unchanged.
- [ ] Valid `checkout.session.completed` and/or `customer.subscription.*` upserts `Subscription` + `Entitlement` (`key: pro`).
- [ ] `StripeEvent` (or equivalent) keyed by `event.id` prevents duplicate side effects.
- [ ] Replaying the same `event.id` → `2xx`, one entitlement row, stable status.
- [ ] `customer.subscription.deleted` (or cancel path) sets entitlement inactive per `ENTITLEMENTS.md`.
- [ ] Spot-check `WEBHOOK-IDEMPOTENCY-CHECKLIST.md`.

---

## E. Entitlement gate

- [ ] Signed-in, non-entitled user opening `/dashboard/pro` → redirect `/pricing` or `403`.
- [ ] Entitled user opens `/dashboard/pro` → paid content renders.
- [ ] Paid API routes return `401` (no session) / `403` (no entitlement) / `200` (entitled).
- [ ] `GET /api/me/access` returns entitlements from the DB (not from query params or client claims alone).
- [ ] Cancel in Stripe Dashboard → paid route locks again after webhook.

---

## F. Ship gate (definition of done for “MVP money path”)

All of the following must be true:

1. Anonymous users never see paid content.
2. Free signed-in users never unlock paid routes without an active (or grace) entitlement.
3. Access is granted only after a **verified** webhook updates the DB.
4. Duplicate webhook delivery does not duplicate entitlements or crash the handler.
5. Cancel / delete path revokes access per the matrix.
6. No secrets committed; env documented from `ENV-EXAMPLE.md`.
7. `SMOKE-TEST.md` completed once in test mode with a recorded pass.

If any item fails, the money path is **not** shipped—even if Checkout “looks pretty.”

---

## G. Buyer done criteria (you can stop)

You are done with this pack’s job when:

- [ ] The 10-minute path in `START-HERE.md` (or full `SMOKE-TEST.md`) passed.
- [ ] You understand free vs paid is an **Entitlement** check, not “has session.”
- [ ] You know how to point a **production** Stripe webhook at `/api/webhooks/stripe` and swap to live keys only when ready (`DEVSPEC.md` ops notes).
- [ ] If the agent stalled twice on one blocker, you used `HANDOFF-HUMAN-DEV.md` instead of weakening signature verify or idempotency.

**Out of scope for “done”:** multi-tenant orgs, seats, coupons-as-core, usage metering, legal review, or a Notion rewrite of this pack.

---

## H. Production cutover (optional same week)

- [ ] Postgres (or managed Postgres) replaces local SQLite.
- [ ] OAuth callback URLs updated to production origin.
- [ ] Stripe Dashboard webhook endpoint + live signing secret in the prod env only.
- [ ] Test and live Stripe keys never mixed in one environment.
