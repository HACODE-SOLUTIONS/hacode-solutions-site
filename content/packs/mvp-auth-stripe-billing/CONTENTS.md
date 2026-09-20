# CONTENTS — Exact files in the buyer zip

**Product:** MVP Auth + Stripe Billing DevSpec Pack  
**Buyer zip:** `mvp-auth-stripe-billing-v1.zip`  
**Checkout / delivery:** https://hacode.solutions  

This list is the **shipped buyer download**. Internal Keymaker notes (`DAY0.md`, `TEN-MINUTE-TEST.md`) are **not** in the zip.

---

## Root files

| File | Purpose |
|------|---------|
| `START-HERE.md` | Promise, who / not for, tools, explicit 10-minute path |
| `DEVSPEC.md` | Composed Auth + Stripe Billing system brief |
| `SKILL.md` | Claude Code / agent skill for this pack |
| `.cursorrules` | Cursor agent instructions for this pack |
| `MODULE-MAP.md` | How free HACODE starter + Auth + Stripe compose |
| `ENTITLEMENTS.md` | free → paid matrix; event → access gate |
| `WEBHOOK-IDEMPOTENCY-CHECKLIST.md` | Production webhook + idempotency checklist |
| `ENV-EXAMPLE.md` | `.env` patterns + secrets checklist |
| `SMOKE-TEST.md` | Signup → checkout → webhook → gated route |
| `HANDOFF-HUMAN-DEV.md` | One-pager if the AI stalls |
| `CHECKLIST.md` | Done means X (buyer + ship gate) |
| `FAQ.md` | Formats, license, updates, common footguns |
| `CONTENTS.md` | This file — exact zip listing |
| `SAMPLE.md` | Redacted ≤10-minute listing walkthrough |

## Samples folder

| File | Purpose |
|------|---------|
| `SAMPLES/before-after-01.md` | Vague prompt vs DevSpec-driven (annotated) |
| `SAMPLES/before-after-02.md` | Second annotated agent run |
| `SAMPLES/before-after-03.md` | Third annotated agent run |

---

## File count

**17 buyer-facing files** (14 at root including `.cursorrules` + `CONTENTS.md`, plus 3 under `SAMPLES/`).

## Not in the buyer zip (internal)

| File | Why excluded |
|------|----------------|
| `DAY0.md` | Keymaker Day-0 brief confirmation / Architect notes |
| `TEN-MINUTE-TEST.md` | Keymaker self-run of the stranger test |
| `PACK_READY.md` | Architect handoff (lives beside zip for Ops/Growth) |

---

## How to use after unzip

1. Open `START-HERE.md`.  
2. Skim `SAMPLE.md`.  
3. Point Cursor / Claude Code at `DEVSPEC.md` + `.cursorrules` / `SKILL.md` in **your app repo**.  
4. Fill env from `ENV-EXAMPLE.md`; prove the path with `SMOKE-TEST.md`.
