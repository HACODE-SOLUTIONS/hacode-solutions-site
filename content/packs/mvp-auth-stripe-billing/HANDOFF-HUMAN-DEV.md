# HANDOFF — Human developer (when AI stalls)

**One-pager.** Use when the agent failed twice on the same blocker or you are past the timebox.

---

## What you are building

Auth.js v5 (JWT) → Stripe Checkout **subscription** → signed webhooks → `Entitlement` (`pro`) → gated routes.  
Specs: `DEVSPEC.md` · matrix: `ENTITLEMENTS.md` · compose: `MODULE-MAP.md`.

**Not building:** multi-tenant SaaS, compliance audit, or a second billing product.

---

## Fast triage (15 minutes)

1. **Auth works?** Sign in; `session.user.id` present in a server log or `/api/me/access`.
2. **Checkout creates?** Stripe Dashboard → Payments/Subscriptions shows a new test subscription; Session metadata includes `userId`.
3. **Webhook reaches app?** Stripe CLI or Dashboard delivery `2xx`. If `400`, fix signature/raw body before anything else.
4. **Row written?** `StripeEvent`, `Subscription`, `Entitlement` for that user.
5. **Gate reads DB?** Paid page uses `requireEntitlement`, not only middleware auth.

---

## Paste this status block to a teammate

```text
Symptom:
Env (local/staging/prod):
Stripe mode (test/live):
Last event id + type:
HTTP status from webhook:
Session userId present? (yes/no)
Checkout metadata.userId present? (yes/no)
Entitlement row? (yes/no + status)
Tried already:
1)
2)
Logs (redact secrets):
```

---

## Likely human fixes

| Blocker | Fix |
|---------|-----|
| Body parsed before verify | Use `await request.text()`; verify; then `JSON.parse` if needed |
| Wrong `whsec_` | CLI secret local; Dashboard secret per endpoint in deploy |
| JWT without `user.id` | Auth.js callbacks: put `token.sub` / user id on session |
| Orphan subscription | Backfill from Stripe Session retrieve; write Customer + Entitlement; fix metadata on create |
| SQLite / serverless file issues | Move smoke to Postgres for deploy; keep SQLite only local |
| OAuth callback mismatch | Align provider console URLs with `NEXT_PUBLIC_APP_URL` |

---

## Minimum code surfaces to inspect

- `auth.ts` / `auth.config.ts` — JWT + session callbacks  
- `app/api/checkout/route.ts` — auth, price, metadata  
- `app/api/webhooks/stripe/route.ts` — raw body, idempotency, handlers  
- `lib/entitlements.ts` — `isPaid` / `requireEntitlement`  
- `prisma/schema.prisma` — unique `event.id`, `(userId, key)`  

---

## Done for human take-over

Smoke steps 1–7 in `SMOKE-TEST.md` pass once. Then return leftover polish to the AI if desired (UI copy, portal button), not core verification.
