# WEBHOOK + IDEMPOTENCY CHECKLIST

Use this before calling the money path “production.” Every box is required for v1.

---

## Endpoint hard requirements

- [ ] Route is `POST` only (e.g. `/api/webhooks/stripe`).
- [ ] Reads **raw body** as text/buffer — not parsed JSON beforehand.
- [ ] Verifies `stripe-signature` with `STRIPE_WEBHOOK_SECRET` via `constructEvent`.
- [ ] Returns `400` on missing/invalid signature — **no DB writes**.
- [ ] Does not require a user session cookie.
- [ ] Does not grant entitlements from Checkout `success_url` query params.
- [ ] Secrets never logged (no secret key, no webhook secret, no full card payloads).

---

## Idempotency

- [ ] Persist Stripe `event.id` in `StripeEvent` (or equivalent) with a **unique** constraint.
- [ ] On duplicate `event.id`: return `200` quickly; skip side effects.
- [ ] Side effects (subscription upsert, entitlement change, email) run **once** per event id.
- [ ] Handlers are safe if Stripe delivers out of order (upsert by `stripeSubscriptionId`, recalculate entitlement from latest status).
- [ ] No “increment credits++” without idempotency keys or event-id guards.
- [ ] DB transaction (where available): insert event row + apply updates atomically, or insert event first and treat conflict as done.

---

## Events subscribed (Dashboard + CLI)

Minimum for subscription-primary v1:

- [ ] `checkout.session.completed`
- [ ] `customer.subscription.created`
- [ ] `customer.subscription.updated`
- [ ] `customer.subscription.deleted`
- [ ] `invoice.paid`
- [ ] `invoice.payment_failed`

Local:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the CLI webhook secret into `.env.local` as `STRIPE_WEBHOOK_SECRET` for local only. Production uses the Dashboard endpoint’s signing secret.

---

## Test vs live isolation

- [ ] Test keys (`sk_test_`, `pk_test_`, test Price id) only in preview/local.
- [ ] Live keys only in production env.
- [ ] Webhook signing secret matches the endpoint environment (CLI secret ≠ Dashboard prod secret).
- [ ] No shared database between a live webhook and a test app accidentally.

---

## Failure behavior

- [ ] Handler catches processing errors, logs with `event.id` + type, returns `500` only when you want Stripe to retry **and** idempotency will make retry safe.
- [ ] Prefer: durable “received” record + retryable processing, or return `500` without marking processed.
- [ ] Alerting hook (even if just Stripe Dashboard email + your error tracker) for repeated failures.
- [ ] Document a manual repair: look up Checkout Session / Subscription in Stripe, upsert entitlement (admin-only).

---

## Replay / security tests

- [ ] Replay same event payload twice → one entitlement row, stable status.
- [ ] Tamper with body while keeping old signature → `400`.
- [ ] Hit success URL without webhook → user still not entitled (or pending UI only).
- [ ] Cancel subscription in Stripe test clock / Dashboard → access revoked per `ENTITLEMENTS.md`.

---

## Deploy day

- [ ] Production webhook URL HTTPS.
- [ ] Events selected match the list above.
- [ ] `STRIPE_WEBHOOK_SECRET` set in host (e.g. Vercel).
- [ ] Send test event from Stripe Dashboard; confirm `2xx` and DB row.
- [ ] Place a real test-mode payment against staging before enabling live mode.

---

## Anti-patterns (fail review)

- Parsing JSON then verifying signature.
- Granting paid access in the success page loader from `session_id` without server-side Stripe retrieve **and** still skipping entitlement persistence (retrieve is optional UX; entitlement must still come from webhook or a verified server retrieve that upserts the same tables).
- Using `STRIPE_SECRET_KEY` in client bundles.
- Catch-all `event.type` handler that silently ignores unknown events without logging.
- Deleting `StripeEvent` rows as “cleanup” within the retry window.
