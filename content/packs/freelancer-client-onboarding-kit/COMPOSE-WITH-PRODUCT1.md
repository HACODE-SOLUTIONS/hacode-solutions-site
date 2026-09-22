# Compose with Product #1 — MVP Auth + Stripe Billing DevSpec

**This pack:** Freelancer Client Onboarding Kit (AI Coding Ops) — $39 — Week 0 client ops  
**Product #1:** MVP Auth + Stripe Billing DevSpec Pack — $49 — Auth → Checkout → Entitlement build brief  
**Checkout / catalog:** https://hacode.solutions  
**Product #1 pack folder name:** `mvp-auth-stripe-billing`  
*(Do not invent alternate paths; when both packs are on disk under the agency packs tree, Product #1 lives at `mvp-auth-stripe-billing`.)*

---

## One-sentence split

| Need | Use |
|------|-----|
| Client said yes; lock intake → brief → scope → kickoff | **This kit ($39)** |
| Client build must ship signed-in → pay → unlock | **Product #1 DevSpec ($49)** |

They compose: onboarding kit decides *whether* and *when* billing is in scope; Product #1 tells the AI coder *how* to implement the money path.

---

## When to sell or use Product #1 on a client build

Recommend or purchase Product #1 when **all** of the following are true:

1. v1 scope includes a **paid signup** or subscription unlock (not “payments later maybe”).
2. Stack can follow Product #1’s lock: **Next.js App Router · Auth.js v5 · Stripe Checkout subscription · webhooks · entitlements**.
3. You would otherwise invent webhook/entitlement rules in chat (high footgun risk).
4. The client (or you) will implement in a real app repo—not need a hosted multi-tenant boilerplate.

### Strong signals in intake

- “Users must pay before they see X”
- “Stripe subscription” / “Pro plan”
- “Gate the dashboard”
- HACODE free modules already in play (starter / auth / stripe) but entitlements glue missing

### Weak signals (do **not** upsell Product #1 yet)

- Marketing site only, no accounts
- Client pays *you* via invoice (your fees)—that is `INVOICE-MILESTONES.md`, not user billing
- Native mobile IAP as the core
- Enterprise procurement SSO-only with no Stripe

---

## How to wire it in Week 0

1. In `SCOPE-CHECKLIST.md`, add under Integrations: **Auth + Stripe Checkout + entitlement gate (per DevSpec)**.
2. In `PROJECT-BRIEF.md` deliverables, add: “Test-mode money path passes Product #1 smoke checklist.”
3. In `ACCESS-OWNERS.md`, assign Stripe **test** keys + OAuth app owners early; keep live keys client-owned.
4. In `DOD-FIRST-WEEK.md`, name a slice: “Auth session working” before “Checkout smoke.”
5. In kickoff decision-lock: “Payments in v1?” → Yes (test path) / Defer / Out.
6. Point the coding agent at Product #1’s `START-HERE.md` / `DEVSPEC.md` / `SKILL.md` / `.cursorrules` inside `mvp-auth-stripe-billing`—not at this onboarding skill for implementation.

---

## What this onboarding kit will not do

- Will not replace Product #1’s webhook idempotency or entitlements matrix.
- Will not include env samples for Stripe live/production beyond owner logging.
- Will not teach multi-tenant seats, metering, or tax as a core path.

---

## Buyer / client messaging (optional, honest)

> For the paid signup path we’ll follow a fixed DevSpec (Auth.js + Stripe Checkout + entitlements) so we don’t invent webhooks under deadline. I use the MVP Auth + Stripe Billing pack from hacode.solutions as that brief—same buyer lane as this onboarding kit, different job.

Freelancer license note: your purchase of either pack allows commercial *use* on client projects; do not redistribute either zip as your own product (see each pack’s `FAQ.md`).

---

## Quick decision tree

```text
Does v1 require end-user paid unlock?
  no  → stay in this onboarding kit only
  yes → Is Next.js App Router + Stripe Checkout subscription acceptable?
           no  → note alternate billing as custom scope (out of Product #1 v1)
           yes → add Product #1 to the build brief; keep this kit for Week 0 ops
```

---

## Links

- Catalog / checkout: https://hacode.solutions  
- This SKU: Freelancer Client Onboarding Kit — $39  
- Composed SKU: MVP Auth + Stripe Billing DevSpec — $49 — pack id `mvp-auth-stripe-billing`
