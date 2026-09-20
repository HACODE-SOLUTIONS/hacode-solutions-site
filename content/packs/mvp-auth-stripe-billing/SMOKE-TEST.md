# SMOKE-TEST — Signup → Checkout → Webhook → Gated route

**Goal:** Prove the money path in Stripe **test mode** in one sitting.  
**Timebox:** about 10–20 minutes after env + Stripe CLI are ready.  
**DB:** SQLite local is fine.

---

## Prerequisites

- [ ] App runs at `NEXT_PUBLIC_APP_URL` (default `http://localhost:3000`).
- [ ] `.env.local` filled per `ENV-EXAMPLE.md` (test keys only).
- [ ] At least one OAuth provider works (or credentials if you added them).
- [ ] `STRIPE_PRICE_ID` is a **recurring** test Price.
- [ ] Stripe CLI installed and logged in.

Terminal A — app:

```bash
npm run dev
```

Terminal B — webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Put the CLI `whsec_…` into `STRIPE_WEBHOOK_SECRET` and restart Terminal A if needed.

---

## Steps

### 1. Anonymous gate
1. Open `/dashboard/pro` (or your paid route) while signed out.
2. **Expect:** redirect to sign-in or home — not paid content.

### 2. Signup / sign-in (free tier)
1. Sign in with OAuth.
2. Open `/dashboard`.
3. **Expect:** signed-in free experience; upgrade CTA visible.
4. Open `/dashboard/pro`.
5. **Expect:** redirect to `/pricing` or `403` — still not entitled.

### 3. Checkout
1. Click Upgrade / call `POST /api/checkout` (UI button preferred).
2. **Expect:** redirect to Stripe Checkout (test).
3. Pay with test card `4242 4242 4242 4242`, any future expiry, any CVC, any postal.
4. Complete Checkout; land on success URL.

### 4. Webhook → entitlement
1. In Terminal B, confirm events received (at least `checkout.session.completed` and/or `customer.subscription.*`).
2. App logs: signature OK; no unhandled errors.
3. Call `GET /api/me/access` while signed in.
4. **Expect:** `pro` entitlement `active` (or allowed status per `ENTITLEMENTS.md`).
5. If success page loaded before webhook: refresh once; pending → active.

### 5. Gated route unlock
1. Open `/dashboard/pro`.
2. **Expect:** paid content renders.

### 6. Idempotency spot-check
1. From Stripe CLI or Dashboard, resend the same event (or `stripe events resend evt_…`).
2. **Expect:** HTTP `2xx`; entitlement row not duplicated; status stable.

### 7. Revoke path
1. In Stripe Dashboard (test), cancel the subscription (immediately).
2. Confirm `customer.subscription.deleted` (or update to canceled) forwarded.
3. Refresh `/dashboard/pro` and `/api/me/access`.
4. **Expect:** access revoked per `ENTITLEMENTS.md`.

---

## Pass / fail

| Step | Pass criteria | Result |
|------|---------------|--------|
| 1 Anonymous | No paid content | |
| 2 Free signed-in | Dashboard yes; pro no | |
| 3 Checkout | Test payment completes | |
| 4 Webhook | Entitlement active | |
| 5 Gate open | Pro page visible | |
| 6 Replay | No duplicate grant | |
| 7 Cancel | Access removed | |

**Smoke passes** when 1–7 pass in test mode.

---

## Common failures (quick)

| Symptom | Check |
|---------|-------|
| Checkout 401 | Session / `auth()` on route |
| Webhook 400 | CLI `whsec_` vs env; raw body |
| Paid never unlocks | metadata `userId`; handler upsert; DB URL |
| Unlock without webhook | Remove success-url grant bug |
| Works local, fails prod | Dashboard webhook + prod secret + HTTPS URL |

If blocked twice on the same issue → `HANDOFF-HUMAN-DEV.md`.
