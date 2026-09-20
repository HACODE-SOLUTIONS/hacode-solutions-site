# Sample 02 — Stripe Checkout + webhook: vague prompt vs DevSpec-driven

**Phase:** Subscription Checkout session + signed webhook + idempotency  
**Depends on:** Sample 01 (`session.user.id` available)

---

## Before — vague prompt

**Human paste:**

```text
Add Stripe subscriptions. When checkout succeeds, unlock pro.
Use the success URL to mark them paid so it's fast.
```

**Typical agent transcript (compressed):**

```text
Agent: Created /api/checkout — no auth check; price hard-coded in client…
Agent: success_url = /dashboard/pro?checkout=success
Agent: app/dashboard/pro/page.tsx:
       if (searchParams.checkout === "success") await db.user.update({ plan: "pro" })
Agent: Webhook route uses request.json() then stripe.webhooks.constructEvent…
Agent: On event, insert Subscription every time (no event.id table)
```

**Concrete bad outcome:**

| Symptom | What broke |
|---------|------------|
| Unsigned / wrong-secret body still parsed | `request.json()` consumed body; signature verify fails or is skipped |
| User opens success URL without paying | `?checkout=success` grants `pro` |
| Stripe retries webhook | Duplicate `Subscription` rows / double “welcome” side effects |
| Checkout session has no `userId` | Paid event cannot attach entitlement to the right user |
| Anonymous `POST /api/checkout` | Anyone can start sessions; metadata empty |

**Expected diff smell (bad):**

```diff
+ // success page
+ if (searchParams.checkout === "success") {
+   await prisma.user.update({ where: { id }, data: { plan: "pro" } });
+ }
+ // webhook
+ const body = await request.json(); // breaks constructEvent
+ await prisma.subscription.create({ data: { … } }); // no idempotency key
```

**Redacted bad access response after visiting success URL only (webhook never ran):**

```json
{ "authenticated": true, "entitlements": [{ "key": "pro", "status": "active" }] }
```

*(Granted from query string — fraud/race footgun.)*

---

## After — DevSpec-driven agent run

**Human paste (from pack):**

```text
Add Stripe Checkout in subscription mode for STRIPE_PRICE_ID.
POST /api/checkout requires auth, sets metadata.userId, returns session.url.
Add POST /api/webhooks/stripe with raw body signature verification and StripeEvent idempotency.
Do not grant access on success_url alone. Follow ENTITLEMENTS.md and WEBHOOK-IDEMPOTENCY-CHECKLIST.md.
```

**Typical agent transcript (compressed):**

```text
Agent: POST /api/checkout → auth(); reject 401; stripe.checkout.sessions.create mode=subscription
Agent: metadata.userId + client_reference_id = session.user.id
Agent: webhook: const raw = await request.text(); constructEvent(raw, sig, secret)
Agent: upsert StripeEvent by event.id; on conflict return 200 without re-apply
Agent: handlers: checkout.session.completed, customer.subscription.updated/deleted, invoice.paid/failed
Agent: success page shows “confirming payment…” and polls GET /api/me/access
```

**Concrete good outcome:**

| Check | Result |
|-------|--------|
| Signed-out checkout | `401` |
| Signed-in checkout | `{ "url": "https://checkout.stripe.com/…" }` |
| Bad signature | `400`; no DB writes |
| Pay with `4242…` + CLI forward | `Entitlement` `pro=active` after event |
| Resend same `event.id` | Still one entitlement; handler `200` |
| Hit success URL without webhook | UI pending; `/api/me/access` still empty/inactive |

**Expected diff smell (good):**

```diff
+ export async function POST(req: Request) {
+   const session = await auth();
+   if (!session?.user?.id) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
+   const checkout = await stripe.checkout.sessions.create({
+     mode: "subscription",
+     line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
+     success_url: `${appUrl}/dashboard?checkout=success`,
+     cancel_url: `${appUrl}/pricing`,
+     client_reference_id: session.user.id,
+     metadata: { userId: session.user.id },
+   });
+   return NextResponse.json({ url: checkout.url });
+ }
+
+ // webhook
+ const rawBody = await request.text();
+ const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
+ await prisma.stripeEvent.create({ data: { id: event.id, type: event.type } }); // unique → catch duplicate
```

**Redacted good access response only after verified webhook:**

```json
{
  "authenticated": true,
  "entitlements": [{ "key": "pro", "status": "active", "validUntil": null }]
}
```

---

## Annotation — what the pack changed

1. **Raw body + signature** before any business logic.
2. **Idempotency on `event.id`** so Stripe retries are safe.
3. **User linkage via metadata**, not email guessing or success-URL trust.
4. **Stripe owns payment state; DB entitlement owns access** — success page never writes `pro`.

When Checkout + webhook match the “After” column, continue to Sample 03 (entitlement gate).
