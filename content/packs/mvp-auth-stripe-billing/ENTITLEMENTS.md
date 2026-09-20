# ENTITLEMENTS — Free → paid matrix (subscription-primary)

**Principle:** Stripe is source of truth for payment state. Your `Entitlement` rows are source of truth for app access. Sync only through verified webhooks.

**v1 product key:** `pro`  
**v1 billing:** one recurring Stripe Price ID (`STRIPE_PRICE_ID`, `mode: subscription`).

---

## Access tiers

| Tier | Who | Entitlement | What they can access |
|------|-----|-------------|----------------------|
| Anonymous | No session | none | Marketing, pricing, sign-in |
| Free (signed-in) | Session, no active `pro` | none or `pro=inactive` | `/dashboard` basics, account, “Upgrade” CTA |
| Paid | Session + `pro=active` (or grace) | `pro` | `/dashboard/pro`, paid APIs |

One-time payment → same `pro` key is an **extension**: treat `checkout.session.completed` with `mode=payment` as grant-with-`validUntil` if you add it later. Not required for v1.

---

## Event → access gate

| Stripe event | Subscription row | Entitlement `pro` | User-visible effect |
|--------------|------------------|-------------------|---------------------|
| `checkout.session.completed` (subscription) | Upsert; status from session/subscription | Set `active` if subscription active/trialing (or wait for subscription events — pick one path and stay consistent; recommended: set active when status is `active` or `trialing`) | Success page may still show “confirming…” until row exists |
| `customer.subscription.created` | Upsert by `stripeSubscriptionId` | `active` if `status` in `active`, `trialing` | Paid routes unlock |
| `customer.subscription.updated` | Update status, period end, cancel flags | Recalculate: `active` / `grace` / `inactive` per rules below | Access may change without new Checkout |
| `customer.subscription.deleted` | `canceled` / deleted | `inactive` | Paid routes lock; CTA to resubscribe |
| `invoice.paid` | Refresh period end if needed | Ensure `active` when subscription healthy | Renewals stay unlocked |
| `invoice.payment_failed` | Status often `past_due` | **Grace:** keep `active` or set `grace` for a fixed window (default below) | Soft nag in UI; do not hard-lock on first failure unless you choose strict mode |
| `checkout.session.expired` / abandoned | No grant | unchanged | No access change |

### Default grace rule (v1)

- `past_due` → entitlement status `grace` (still allow access) until `customer.subscription.deleted` **or** `status` becomes `unpaid`/`canceled`, or `currentPeriodEnd` + 3 days — choose **one** and document in code comments.
- **Pack default:** allow access while status is `active`, `trialing`, or `past_due`; revoke on `canceled`, `unpaid`, `incomplete_expired`, and on `customer.subscription.deleted`.

Helper logic (conceptual):

```
function isPaid(entitlement, subscription):
  if entitlement.status == "inactive": return false
  if subscription.status in ["active", "trialing", "past_due"]: return true
  return false
```

---

## Free → paid matrix (product behavior)

| Action | Free user | Paid user |
|--------|-----------|-----------|
| View pricing | Yes | Yes (or “Manage billing”) |
| Start Checkout | Yes | Prefer Billing Portal; optional block if already `active` |
| Open `/dashboard` | Yes | Yes |
| Open `/dashboard/pro` | Redirect `/pricing` or 403 | Yes |
| Call paid API | 403 | 200 |
| Cancel subscription | N/A | Via Stripe Customer Portal (recommended) → webhook revokes |

---

## Mapping fields (minimum)

On Checkout create:

- `metadata.userId` = app user id  
- `client_reference_id` = app user id (backup)  
- `customer` = existing Stripe Customer if known  

On webhook:

1. Resolve `userId` from metadata / client_reference_id / `StripeCustomer` lookup.  
2. Upsert `Subscription`.  
3. Upsert `Entitlement` where `key = "pro"`.  
4. Never trust query string `?success=true` for grants.

---

## Gate implementation checklist

- [ ] `getEntitlement(userId, "pro")` reads DB (not Stripe) on request path.
- [ ] `requireEntitlement` used by paid pages and paid APIs.
- [ ] Auth middleware ≠ entitlement check.
- [ ] UI upgrade button only shown when not paid (or show Manage when paid).
- [ ] Cancel/resubscribe reflected within one webhook delivery (seconds), not only on next login.

---

## Out of scope for v1 matrix

Seat-based entitlements, feature flags per plan tier beyond `pro`, trials as a separate product, usage credits, and team sharing. Add a new entitlement key and matrix row when you introduce a second plan.
