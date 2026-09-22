# Compose with Product #1 — MVP Auth + Stripe Billing DevSpec

**This pack:** Sales Call → Scope Brief Kit — $35 — discovery → locked scope brief  
**Product #1:** MVP Auth + Stripe Billing DevSpec Pack — $49 — Auth → Checkout → Entitlement build brief  
**Checkout / catalog:** https://hacode.solutions  
**Product #1 pack folder name:** `mvp-auth-stripe-billing`  
*(Do not invent alternate paths; when packs are on disk under the agency packs tree, Product #1 lives at `mvp-auth-stripe-billing`.)*

---

## One-sentence split

| Need | Use |
|------|-----|
| Lock what you’re selling from the sales call | **This kit ($35)** |
| Implement signed-in → pay → unlock in the client app | **Product #1 DevSpec ($49)** |

This close kit decides *whether* billing is In for v1. Product #1 tells the AI coder *how* to build the money path. Week 0 ops still belong to Product #2 after deposit.

---

## When to mark payments In (and compose Product #1)

Recommend Product #1 when **all** are true:

1. Locked brief includes **end-user paid unlock** or subscription (not “payments later maybe”).
2. Stack can follow Product #1’s lock: **Next.js App Router · Auth.js v5 · Stripe Checkout subscription · webhooks · entitlements**.
3. You would otherwise invent webhook/entitlement rules in chat.
4. Implementation will happen in a real app repo.

### Strong signals on the discovery call

- “Users must pay before they see X”
- “Stripe subscription” / “Pro plan”
- “Gate the dashboard”

### Weak signals (keep **Out** in this kit)

- “Maybe Stripe later”
- Client pays **you** via invoice (your fee)—price that in `PRICING-WORKSHEET.md`, not Product #1
- Marketing site with no accounts
- Native IAP as the core

---

## How to wire it in the scope brief

1. In `SCOPE-BRIEF.md` deliverables: add Auth + Stripe Checkout + entitlement gate **only if In**.
2. In exclusions: if still maybe → **Out** + note “compose Product #1 when moved In.”
3. In assumptions: test-mode keys available within N days of kickoff.
4. In `PRICING-WORKSHEET.md`: add integration hours or separate line—do not silently absorb.
5. After deposit: Product #2 onboarding assigns Stripe test key owners; coding agent follows Product #1 `DEVSPEC.md` / `SKILL.md`, not this close skill.

---

## What this scope-brief kit will not do

- Will not replace Product #1’s webhook idempotency or entitlements matrix.
- Will not include env samples for Stripe live keys.
- Will not teach multi-tenant seats, metering, or tax as a core path.

---

## Buyer / client messaging (optional, honest)

> If v1 needs paid signup, we’ll lock Auth → Checkout → Entitlement with a fixed DevSpec so we don’t invent webhooks under deadline. I use the MVP Auth + Stripe Billing pack from hacode.solutions for that build brief—different job from this discovery-to-scope pack.

Freelancer license note: commercial *use* on client projects is fine; do not redistribute either zip as your own product (see each pack’s `FAQ.md`).

---

## Quick decision tree

```text
Does v1 require end-user paid unlock?
  no  → keep payments Out in SCOPE-BRIEF; stay in this kit for close
  yes → Is Next.js App Router + Stripe Checkout subscription acceptable?
           no  → note alternate billing as custom scope (out of Product #1 v1)
           yes → mark In on brief; price the work; after deposit use Product #1 pack
```
